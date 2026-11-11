// Deploy do site a partir do PC (a KingHost não libera os arquivos do FTP
// para os servidores do GitHub Actions: lá o login entra, mas PWD dá 550 e a
// /www "não existe" — visto em 10/11/2026).
//
//   npm run deploy                  build + validação + envio + testes
//   npm run deploy -- --skip-build  usa o dist/ que já existe (ainda valida)
//   npm run deploy -- --dry-run     conecta e confere a pasta, mas NÃO envia
//
// Passo a passo:
//  1. pede a senha do FTP (digitada na hora; não fica em arquivo nem na linha
//     de comando — vai para o curl pela entrada padrão, com -K -);
//  2. npm run build (vite + prerender) e scripts/validate-dist.mjs;
//  3. conecta com TLS explícito, validando o certificado da KingHost
//     (*.kinghost.net) — nunca FTP sem criptografia;
//  4. confere que a pasta de login é a raiz do site: index.html, robots.txt e
//     sitemap.xml precisam existir lá (SIZE);
//  5. envia em modo binário (TYPE I, padrão do curl): app-shell.html primeiro,
//     depois o resto do dist/, .htaccess por último (o .htaccess usa o
//     app-shell.html como página de 404). Só cria/substitui, nunca apaga;
//  6. confere o tamanho no servidor do .htaccess, robots.txt, sitemap.xml e
//     de todo .html (modo ASCII mudaria o tamanho);
//  7. roda a tabela de testes no site no ar (scripts/site-check.mjs).
//
// FTP_HOST e FTP_USER podem ser trocados por variável de ambiente.
import { spawn, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { validateDist, printValidation } from "./validate-dist.mjs";
import { CURL, runSiteCheck } from "./site-check.mjs";

const projectDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(projectDir, "dist");

const FTP_HOST = process.env.FTP_HOST || "ftp.borotec.com.br";
const FTP_USER = process.env.FTP_USER || "borotec";
// O certificado do FTP é o genérico da KingHost (*.kinghost.net), não
// ftp.borotec.com.br. A conexão vai para FTP_HOST, mas o certificado é
// validado contra um nome coberto por ele (--connect-to).
const TLS_NAME = "ftp-borotec.kinghost.net";
const BASE = `ftp://${TLS_NAME}/`; // pasta de login = /www

const args = new Set(process.argv.slice(2));
const SKIP_BUILD = args.has("--skip-build");
const DRY_RUN = args.has("--dry-run");

const step = (n, msg) => console.log(`\n=== ${n}. ${msg}`);
const fail = (msg) => { console.error(`\n✗ ${msg}`); process.exit(1); };

function askHidden(question) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    if (!stdin.isTTY) return reject(new Error("rode no terminal (PowerShell) para digitar a senha"));
    process.stdout.write(question);
    stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    stdin.resume();
    let value = "";
    const done = (err) => {
      stdin.off("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      process.stdout.write("\n");
      err ? reject(err) : resolve(value);
    };
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") return done();
        if (ch === "\u0003") return done(new Error("cancelado (Ctrl+C)"));
        if (ch === "\b" || ch === "\u007f") {
          if (value) { value = value.slice(0, -1); process.stdout.write("\b \b"); }
        } else if (ch >= " ") {
          value += ch;
          process.stdout.write("*");
        }
      }
    };
    stdin.on("data", onData);
  });
}

const q = (s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
const encodePath = (rel) => rel.split("/").map(encodeURIComponent).join("/");

// Opções comuns, em formato de config do curl (vai pela entrada padrão).
function baseConfig(password) {
  return [
    `user = ${q(`${FTP_USER}:${password}`)}`,
    "ipv4",
    "ftp-pasv",
    "ssl-reqd",
    `connect-to = ${q(`${TLS_NAME}:21:${FTP_HOST}:21`)}`,
    "connect-timeout = 20",
    "silent",
    "show-error",
    "",
  ].join("\n");
}

// Roda o curl em modo verbose e separa o diálogo FTP (comandos "> " e
// respostas "< ") por transferência. Um marcador sai no stderr ao fim de cada
// transferência (write-out com %{stderr}), na mesma ordem do diálogo.
// ATENÇÃO: write-out no config é GLOBAL (vale o último) — por isso o marcador
// usa %{url}, e não um nome fixo por arquivo. USER/PASS nunca são guardados.
const MARK = "@@FIM ";
function ftpRun(password, extraConfig, urls) {
  const cfg = baseConfig(password) + "verbose\n" + extraConfig +
    `write-out = ${q(`%{stderr}${MARK}%{exitcode} %{url}\\n`)}\n` +
    urls.map((u) => `url = ${q(u)}\n`).join("");
  const r = spawnSync(CURL, ["-K", "-"], { input: cfg, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const transfers = [];
  let lines = [];
  for (const raw of r.stderr.replace(/\r/g, "").split("\n")) {
    if (raw.startsWith(MARK)) {
      const [exitcode, url] = raw.slice(MARK.length).split(" ");
      transfers.push({ url, exitcode: Number(exitcode), lines });
      lines = [];
    } else if (/^[<>] /.test(raw) && !/^> (USER|PASS)\b/i.test(raw) && !raw.includes(password)) {
      lines.push(raw.trim());
    }
  }
  // Uma conexão FTP nova = um "220" de boas-vindas do servidor.
  const connections = transfers.filter((t) => t.lines.some((l) => l.startsWith("< 220"))).length;
  return { transfers, stdout: r.stdout, status: r.status, connections };
}

// Resposta do servidor ao comando `cmd` (ex.: "SIZE") dentro de uma transferência.
const replyTo = (lines, cmd) => {
  const i = lines.findIndex((l) => l.startsWith(`> ${cmd}`));
  return i >= 0 ? lines.slice(i + 1).find((l) => l.startsWith("< ")) ?? null : null;
};

// SIZE de vários arquivos, numa conexão só. Retorna, por arquivo, o tamanho
// (ou null) e o diálogo FTP daquela transferência.
function remoteSizes(password, files) {
  const urlOf = new Map(files.map((f) => [BASE + encodePath(f), f]));
  const run = ftpRun(password, "head\n", [...urlOf.keys()]);
  const result = new Map(files.map((f) => [f, { size: null, exitcode: null, lines: [] }]));
  for (const t of run.transfers) {
    const f = urlOf.get(t.url);
    if (!f) continue;
    const size = replyTo(t.lines, "SIZE")?.match(/^< 213 (\d+)/)?.[1];
    result.set(f, { size: size != null ? Number(size) : null, exitcode: t.exitcode, lines: t.lines });
  }
  const pwd = run.transfers[0] ? replyTo(run.transfers[0].lines, "PWD") : null;
  return { result, pwd, connections: run.connections, login: run.transfers[0]?.lines ?? [] };
}

// Alternativa à trava por SIZE: NLST da pasta de login.
function remoteList(password) {
  const run = ftpRun(password, "list-only\n", [BASE]);
  const names = run.stdout.replace(/\r/g, "").split("\n").map((s) => s.trim().replace(/^\.\//, "")).filter(Boolean);
  return { names, exitcode: run.transfers[0]?.exitcode, lines: run.transfers[0]?.lines ?? [] };
}

// Diálogo FTP como o servidor respondeu (sem USER/PASS).
const showDialog = (lines, indent = "      ") => {
  for (const l of lines) console.log(`${indent}${l}`);
};

function listDist() {
  const out = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else out.push(path.relative(distDir, p).split(path.sep).join("/"));
    }
  })(distDir);
  const rest = out.filter((f) => f !== "app-shell.html" && f !== ".htaccess").sort();
  return ["app-shell.html", ...rest, ".htaccess"];
}

async function upload(password, files) {
  const cfg = baseConfig(password) +
    "verbose\nftp-create-dirs\nfail-early\nretry = 3\n" +
    `write-out = ${q("%{exitcode} %{url}\\n")}\n` +
    files.map((f) => `upload-file = ${q(path.join(distDir, f).split(path.sep).join("/"))}\nurl = ${q(BASE + encodePath(f))}\n`).join("");
  return new Promise((resolve) => {
    const child = spawn(CURL, ["-K", "-"], { stdio: ["pipe", "pipe", "pipe"] });
    let sent = 0;
    let buf = "";
    // Diálogo FTP (sem USER/PASS): guarda os últimos comandos/respostas para
    // mostrar exatamente onde o servidor recusou, se o envio parar.
    const dialog = [];
    let errBuf = "";
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => {
      errBuf += chunk;
      let i;
      while ((i = errBuf.indexOf("\n")) >= 0) {
        const line = errBuf.slice(0, i).replace(/\r$/, "");
        errBuf = errBuf.slice(i + 1);
        if (/^curl: /.test(line)) console.log(`  ${line}`);
        else if (/^[<>] /.test(line) && !/^> (USER|PASS)\b/i.test(line) && !line.includes(password) && !/^< (Content-Length|Accept-ranges|Last-Modified)/i.test(line)) {
          dialog.push(line);
          if (dialog.length > 40) dialog.shift();
        }
      }
    });
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      buf += chunk;
      let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const [exitcode, url] = buf.slice(0, i).trim().split(" ");
        buf = buf.slice(i + 1);
        // write-out sai também para a transferência que falhou: só conta as ok.
        if (!url || exitcode !== "0") continue;
        sent++;
        const name = decodeURIComponent(url.replace(BASE, ""));
        if (sent === 1 || sent === files.length || name.endsWith(".html") || name === ".htaccess" || sent % 50 === 0) {
          console.log(`  [${sent}/${files.length}] ${name}`);
        }
      }
    });
    child.on("close", (code) => {
      if (code !== 0) {
        console.log("\n  Últimos comandos e respostas do servidor FTP antes da falha:");
        for (const l of dialog.slice(-25)) console.log(`      ${l}`);
      }
      resolve({ code, sent });
    });
    child.stdin.end(cfg);
  });
}

async function main() {
  console.log(`Deploy local → ${FTP_USER}@${FTP_HOST} (TLS, certificado *.kinghost.net)${DRY_RUN ? " — SIMULAÇÃO, nada será enviado" : ""}`);

  step(1, "Senha do FTP");
  const password = await askHidden(`Senha do FTP (${FTP_USER}): `);
  if (!password) fail("senha vazia");

  if (SKIP_BUILD) {
    step(2, "Build pulado (--skip-build): usando o dist/ atual");
  } else {
    step(2, "Build (vite build + prerender)");
    const b = spawnSync("npm run build", { cwd: projectDir, stdio: "inherit", shell: true });
    if (b.status !== 0) fail("o build falhou — nada foi enviado.");
  }

  step(3, "Validação do dist/");
  if (!printValidation(validateDist(distDir))) fail("validação falhou — nada foi enviado.");

  step(4, "Conexão TLS e conferência da raiz do site (/www)");
  const rootFiles = ["index.html", "robots.txt", "sitemap.xml"];
  const root = remoteSizes(password, rootFiles);
  console.log(`  Pasta de login (PWD): ${root.pwd ?? "sem resposta"} · conexões abertas: ${root.connections}`);
  for (const f of rootFiles) {
    const r = root.result.get(f);
    console.log(`  ${f}: ${r.size != null ? `${r.size} bytes` : "NÃO confirmado"} (curl=${r.exitcode ?? "?"})`);
    showDialog(r.lines);
  }
  if (rootFiles.every((f) => root.result.get(f).size != null)) {
    console.log("  OK: conectado com TLS (certificado validado) na raiz do site (SIZE dos 3 arquivos).");
  } else {
    // Alternativa: a listagem (NLST) da pasta de login.
    console.log("\n  SIZE não confirmou os 3 arquivos; conferindo pela listagem (NLST) da pasta de login...");
    const list = remoteList(password);
    showDialog(list.lines);
    const need = ["index.html", "robots.txt", "assets"];
    const missing = need.filter((n) => !list.names.includes(n));
    console.log(`  NLST: ${list.names.length} itens; ${need.map((n) => `${n} ${missing.includes(n) ? "✗" : "✓"}`).join(", ")}`);
    if (missing.length) fail("a pasta de login não parece ser a raiz do site (ou senha/conexão falhou) — nada foi enviado.");
    console.log("  OK: conectado com TLS (certificado validado) na raiz do site (pela listagem).");
  }

  const files = listDist();
  if (DRY_RUN) {
    console.log(`\nSimulação: seriam enviados ${files.length} arquivos (app-shell.html primeiro, .htaccess por último). Nada foi enviado.`);
    return;
  }

  step(5, `Envio de ${files.length} arquivos (binário; app-shell.html primeiro, .htaccess por último; nada é apagado)`);
  const up = await upload(password, files);
  if (up.code !== 0) fail(`o envio parou no arquivo ${up.sent + 1} de ${files.length} (curl=${up.code}). O .htaccess só sobe no fim, então o site segue funcionando; rode de novo.`);
  console.log(`  Enviados ${up.sent}/${files.length}.`);

  step(6, "Conferência no servidor (tamanho = build → transferência binária)");
  const check = [".htaccess", "robots.txt", "sitemap.xml", ...files.filter((f) => f.endsWith(".html"))];
  const remote = remoteSizes(password, check);
  const diff = check.filter((f) => remote.result.get(f).size !== fs.statSync(path.join(distDir, f)).size);
  for (const f of diff) {
    console.log(`  DIFERENTE: ${f} local=${fs.statSync(path.join(distDir, f)).size} servidor=${remote.result.get(f).size ?? "?"}`);
    showDialog(remote.result.get(f).lines.slice(-6));
  }
  if (diff.length) fail(`${diff.length} arquivo(s) com tamanho diferente no servidor.`);
  console.log(`  OK: ${check.length} arquivos (.htaccess, robots.txt, sitemap.xml e todos os .html) com o mesmo tamanho do build.`);

  step(7, "Testes no site no ar");
  if (!runSiteCheck()) fail("o deploy subiu, mas há testes falhando — veja a tabela acima.");
  console.log("\n✓ Deploy concluído.");
}

main().catch((err) => fail(err.message ?? String(err)));
