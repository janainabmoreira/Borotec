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
// a time and skips (not fails) any route that times out, so one broken page
// can't take down the whole build.
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

function routeOutputPath(route) {
  const clean = route === "/" ? "" : route;
  return path.join(distDir, clean, "index.html");
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

  const renderer = new PuppeteerRenderer({
    headless: true,
    // Pages dispatch this once their Supabase fetch resolves and <Helmet> has
    // committed its final tags (see src/hooks/usePrerenderSignal.ts). Without
    // this, Puppeteer snapshots the DOM before the async fetch completes and
    // every page bakes in the generic index.html title/canonical instead of
    // its own.
    renderAfterDocumentEvent: "app-rendered",
    timeout: ROUTE_TIMEOUT_MS,
  });

  const prerenderer = new Prerenderer({
    staticDir: distDir,
    routes,
    renderer,
  });

  console.log(`[prerender] rendering ${routes.length} routes (sequential)...`);
  const start = Date.now();
  await prerenderer.initialize();

  let succeeded = 0;
  let failed = 0;

  // One renderRoutes([route]) call at a time — see file header for why this
  // isn't parallelized.
  for (const route of routes) {
    try {
      const [rendered] = await prerenderer.renderRoutes([route]);
      const outputPath = routeOutputPath(rendered.route);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, rendered.html.trim());
      succeeded++;
      console.log(`[prerender] ok   ${route} -> ${path.relative(projectDir, outputPath)} (${Date.now() - start}ms)`);
    } catch (err) {
      failed++;
      console.warn(`[prerender] SKIP ${route}: ${err.message ?? err} (${Date.now() - start}ms)`);
    }
  }

  await prerenderer.destroy();

  console.log(`[prerender] done: ${succeeded} ok, ${failed} skipped, ${Date.now() - start}ms total`);
  if (failed > 0) {
    console.warn(`[prerender] ${failed} route(s) were skipped and will fall back to client-side rendering for that page.`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[prerender] fatal error:", err);
    process.exit(1);
  });
