// Tabela de testes do site NO AR, com curl (só leitura).
//   node scripts/site-check.mjs           (ou: npm run check:site)
//
// Confere status E Location de cada URL (ok só se os dois baterem), o noindex
// do app-shell/404 e se toda URL do sitemap responde 200. Sai com código 1 se
// algo falhar.
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const CURL = process.platform === "win32" && fs.existsSync("C:\\Windows\\System32\\curl.exe")
  ? "C:\\Windows\\System32\\curl.exe"
  : "curl";
const NULL_DEVICE = process.platform === "win32" ? "NUL" : "/dev/null";

const S = "https://borotec.com.br";
const T = `${S}/termografia/linha-d/inspecao-eletrica/`;
const ROWS = [
  [200, "", `${S}/`],
  [200, "", `${S}/detector-de-gas/`],
  [200, "", `${S}/detector-de-gas/linha-multigas/detector-multigas-portatil/`],
  [200, "", `${S}/termografia/`],
  [301, `${S}/boroscopios/`, `${S}/categorias`],
  [301, `${S}/boroscopios/`, `${S}/categorias/`],
  [301, T, `${S}/camera-termografica-portatil`],
  [301, T, `${S}/camera-termografica-portatil/`],
  [301, T, `${S}/linha-d-camera-termografica-inspecao-eletrica`],
  [301, T, `${S}/linha-d-camera-termografica-inspecao-eletrica/`],
  [301, `${S}/boroscopios/`, "http://www.borotec.com.br/categorias/"],
  [301, `${S}/linha-t/`, "http://www.borotec.com.br/linha-t"],
  [410, "", `${S}/produtos`],
  [410, "", `${S}/produtos/sk3408`],
  [410, "", `${S}/produtos?categoria=Linha%20T`],
  [410, "", `${S}/tubulacoes/boroscopio-para-inspecao-em-tubulacao-10-a-120-metros-borotec-bt-1000`],
  [404, "", `${S}/pagina-que-nao-existe/`],
  [200, "", `${S}/app-shell.html`],
  [200, "", `${S}/sitemap.xml`],
  [200, "", `${S}/robots.txt`],
];

function curl(args, input) {
  return spawnSync(CURL, args, { encoding: "utf8", input, maxBuffer: 64 * 1024 * 1024 });
}

function head(url) {
  const h = curl(["-sI", "--max-time", "20", url]).stdout.replace(/\r/g, "");
  return {
    status: Number(h.split("\n")[0].split(" ")[1]) || 0,
    location: h.match(/^location:\s*(.*)$/im)?.[1].trim() ?? "",
  };
}

const body = (url) => curl(["-s", "--max-time", "20", url]).stdout;

export function runSiteCheck() {
  let failures = 0;
  console.log("| URL | esperado | obtido | Location |");
  console.log("|---|---|---|---|");
  for (const [expStatus, expLoc, url] of ROWS) {
    let r = head(url);
    let ok = r.status === expStatus && (!expLoc || r.location === expLoc);
    if (!ok) { r = head(url); ok = r.status === expStatus && (!expLoc || r.location === expLoc); } // 1 nova tentativa (falha de rede passageira)
    if (!ok) failures++;
    console.log(`| ${url} | ${expStatus}${expLoc ? ` → ${expLoc}` : ""} | ${r.status} ${ok ? "✅" : "❌"} | ${r.location || "-"} |`);
  }

  const noindex = /<meta[^>]*robots[^>]*noindex/i;
  const shellOk = noindex.test(body(`${S}/app-shell.html`));
  const page404 = body(`${S}/pagina-que-nao-existe/`);
  const ok404 = noindex.test(page404);
  console.log("");
  console.log(`app-shell.html com noindex: ${shellOk ? "✅" : "❌"}`);
  console.log(`404 com noindex: ${ok404 ? "✅" : "❌"} (title: ${page404.match(/<title>([^<]*)/)?.[1] ?? "-"})`);
  if (!shellOk) failures++;
  if (!ok404) failures++;

  // Sitemap: todas as URLs em uma só chamada do curl (uma conexão).
  const locs = [...body(`${S}/sitemap.xml`).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const cfg = locs.map((u) => `url = "${u}"\noutput = "${NULL_DEVICE}"\n`).join("");
  const out = curl(["-s", "--max-time", "30", "-w", "%{http_code} %{url}\\n", "-K", "-"], cfg).stdout;
  const results = out.trim().split("\n").filter(Boolean).map((l) => l.split(" "));
  const bad = results.filter(([code]) => code !== "200");
  const sitemapOk = locs.length > 0 && results.length === locs.length && bad.length === 0;
  console.log(`sitemap: ${results.length - bad.length}/${locs.length} com 200 ${sitemapOk ? "✅" : "❌"}`);
  for (const [code, u] of bad) console.log(`    ${code} ${u}`);
  if (!sitemapOk) failures++;

  console.log("");
  console.log(failures ? `RESULTADO: ${failures} teste(s) falharam ❌` : "RESULTADO: todos os testes passaram ✅");
  return failures === 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exit(runSiteCheck() ? 0 : 1);
}
