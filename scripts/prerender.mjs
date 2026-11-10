// Prerenders every route into a static dist/<route>/index.html.
//
// This runs as a SEPARATE process from `vite build` (chained in package.json's
// "build" script) rather than as a Vite plugin hook. It used to run inside the
// build via vite-plugin-prerender, but that wrapper would hang indefinitely
// (no error, no completion — `npm run build` had to be killed after 12+ hours)
// whenever a route's navigation timed out under load. Calling
// @prerenderer/prerenderer + @prerenderer/renderer-puppeteer directly, in a
// clean process, renders the exact same routes reliably and fails loudly
// instead of hanging — so that's what this script does. Renders routes one at
// a time, retries a route whose snapshot times out or comes out with the
// wrong <head>, and fails the build at the end if any route still failed.
//
// Routes are rendered strictly SEQUENTIALLY, not in parallel — calling
// renderRoutes() concurrently against the same Prerenderer/renderer instance
// caused intermittent cross-talk between routes (one route's page.content()
// occasionally captured another route's stale/default HTML instead of its
// own). One Prerenderer instance handling one navigation at a time avoids
// that entirely, and 28 routes still finishes in under a minute.
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { loadEnv } from "vite";
import { fetchBuildRoutes } from "./buildRoutes.mjs";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.join(__dirname, "..");
const distDir = path.join(projectDir, "dist");

const ROUTE_TIMEOUT_MS = 30000;
const MAX_ATTEMPTS = 3;
const SITE_URL = "https://borotec.com.br";

// Base de renderização: cópia intocada do index.html gerado pelo Vite (sem
// nenhuma tag de rota). Antes, o prerender da home sobrescrevia
// dist/index.html e as rotas seguintes partiam de um HTML que já tinha o
// <head> da home, que vazava para o snapshot quando o Helmet perdia a corrida.
// Arquivo temporário: apagado no fim.
const RENDER_SHELL_FILE = "prerender-shell.tmp.html"; // sem "." inicial: o express do prerenderer não serve dotfiles no fallback

// Publicado: a mesma base + <meta robots noindex>. É o ErrorDocument 404 do
// .htaccess (rotas sem pasta própria). NUNCA serve de base de renderização —
// o Helmet não remove tags estáticas, e toda página herdaria o noindex.
const SHELL_FILE = "app-shell.html";
const NOINDEX_META = '<meta name="robots" content="noindex, follow">';

// Única rota indexável que pode (e deve) sair com noindex.
const NOINDEX_ROUTES = new Set(["/privacidade"]);

function routeOutputPath(route) {
  const clean = route === "/" ? "" : route;
  return path.join(distDir, clean, "index.html");
}

function expectedCanonical(route) {
  return `${SITE_URL}${route.endsWith("/") ? route : `${route}/`}`;
}

// Retorna a lista de problemas do HTML renderizado (vazia = ok).
function validateHtml(route, html) {
  const problems = [];
  const canonicals = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)].map((m) => m[0]);
  if (canonicals.length !== 1) problems.push(`${canonicals.length} canonical tags`);
  const href = canonicals[0]?.match(/href="([^"]*)"/)?.[1];
  if (href !== expectedCanonical(route)) problems.push(`canonical=${href ?? "(none)"}`);
  const ogUrl = html.match(/<meta[^>]*property="og:url"[^>]*content="([^"]*)"/)?.[1];
  if (ogUrl !== expectedCanonical(route)) problems.push(`og:url=${ogUrl ?? "(none)"}`);
  const relative = relativeHrefs(html);
  if (relative.length) problems.push(`href relativo: ${relative.slice(0, 5).join(", ")}`);
  const noindex = /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html);
  if (noindex !== NOINDEX_ROUTES.has(route)) problems.push(noindex ? "noindex indevido" : "noindex ausente");
  return problems;
}

// Todo href precisa ser absoluto: "/…", "http(s)://…", "mailto:", "tel:" ou
// "#…". Um "detector-de-gas/" sem barra resolve contra a página atual e vira
// /linha-t/detector-de-gas/ (404) em qualquer página que não seja a home.
const ALLOWED_HREF = /^(\/|https?:|mailto:|tel:|#)/i;
function relativeHrefs(html) {
  const bad = new Set();
  for (const m of html.matchAll(/\shref=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
    const value = (m[1] ?? m[2] ?? m[3] ?? "").trim();
    if (!ALLOWED_HREF.test(value)) bad.add(value || "(vazio)");
  }
  return [...bad];
}

// O GTM roda durante o snapshot e injeta <script src="googletagmanager...">
// (gtm.js, gtag/js) no <head>. O snippet inline do GTM continua no HTML e
// injeta tudo de novo no navegador — as cópias salvas só duplicariam carga.
function stripInjectedTagScripts(html) {
  return html.replace(/<script\b[^>]*\bsrc="https:\/\/www\.googletagmanager\.com\/[^"]*"[^>]*><\/script>/g, "");
}

async function main() {
  let Prerenderer, PuppeteerRenderer;
  try {
    Prerenderer = require("@prerenderer/prerenderer");
    PuppeteerRenderer = require("@prerenderer/renderer-puppeteer");
  } catch (err) {
    console.warn("[prerender] @prerenderer packages not installed — run `npm install`. Skipping prerender step.", err.message);
    return;
  }

  if (!fs.existsSync(distDir)) {
    console.warn("[prerender] dist/ not found — run `vite build` first. Skipping.");
    return;
  }

  const env = loadEnv("production", projectDir, "");
  const { routes } = await fetchBuildRoutes({
    supabaseUrl: env.VITE_SUPABASE_URL,
    supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY,
  });

  const indexFile = path.join(distDir, "index.html");
  const shellFile = path.join(distDir, SHELL_FILE);
  const renderShellFile = path.join(distDir, RENDER_SHELL_FILE);
  const indexHtml = fs.readFileSync(indexFile, "utf8");
  let baseHtml;
  if (!indexHtml.includes("data-rh=")) {
    baseHtml = indexHtml;
  } else if (fs.existsSync(shellFile)) {
    // Prerender rodando de novo sobre um dist já pré-renderizado: a base é o
    // app-shell publicado, sem o noindex.
    baseHtml = fs.readFileSync(shellFile, "utf8").replace(NOINDEX_META, "");
  } else {
    throw new Error("dist/index.html já está pré-renderizado e não há app-shell.html — rode `npm run build` (vite build + prerender) do zero.");
  }
  fs.writeFileSync(renderShellFile, baseHtml);

  const renderer = new PuppeteerRenderer({
    headless: true,
    // Pages dispatch this once their data has loaded AND <Seo /> has seen
    // this route's title/canonical committed to document.head (see
    // src/seo/Seo.tsx and src/hooks/usePrerenderSignal.ts).
    renderAfterDocumentEvent: "app-rendered",
    timeout: ROUTE_TIMEOUT_MS,
  });

  const prerenderer = new Prerenderer({
    staticDir: distDir,
    indexPath: RENDER_SHELL_FILE,
    routes,
    renderer,
  });

  console.log(`[prerender] rendering ${routes.length} routes (sequential)...`);
  const start = Date.now();
  await prerenderer.initialize();

  let succeeded = 0;

  // One renderRoutes([route]) call at a time — see file header for why this
  // isn't parallelized.
  // Cada rota é validada (canonical único e igual à própria URL, og:url
  // idem) e renderizada de novo se o snapshot sair com o <head> errado.
  const failedRoutes = [];
  for (const route of routes) {
    let lastError = "";
    let ok = false;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS && !ok; attempt++) {
      try {
        const [rendered] = await prerenderer.renderRoutes([route]);
        const html = stripInjectedTagScripts(rendered.html.trim());
        const problems = validateHtml(route, html);
        if (problems.length) {
          lastError = problems.join(", ");
          console.warn(`[prerender] retry ${route} (tentativa ${attempt}): ${lastError}`);
          continue;
        }
        const outputPath = routeOutputPath(rendered.route);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, html);
        ok = true;
        console.log(`[prerender] ok   ${route} -> ${path.relative(projectDir, outputPath)} (${Date.now() - start}ms)`);
      } catch (err) {
        lastError = err.message ?? String(err);
        console.warn(`[prerender] retry ${route} (tentativa ${attempt}): ${lastError}`);
      }
    }
    if (ok) succeeded++;
    else failedRoutes.push(`${route}: ${lastError}`);
  }

  await prerenderer.destroy();

  // app-shell.html publicado = base + noindex (página de 404 do .htaccess).
  if (!baseHtml.includes("<head>")) throw new Error("base HTML sem <head> — não dá para inserir o noindex no app-shell.html");
  fs.writeFileSync(shellFile, baseHtml.replace("<head>", `<head>\n    ${NOINDEX_META}`));
  fs.rmSync(renderShellFile, { force: true });

  console.log(`[prerender] done: ${succeeded} ok, ${failedRoutes.length} failed, ${Date.now() - start}ms total`);
  if (failedRoutes.length > 0) {
    // Falha alta de propósito: uma rota sem HTML próprio cai no fallback do
    // .htaccess e o Google veria a página sem title/canonical dela.
    throw new Error(`${failedRoutes.length} rota(s) não pré-renderizadas:\n  ${failedRoutes.join("\n  ")}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[prerender] fatal error:", err);
    process.exit(1);
  });
