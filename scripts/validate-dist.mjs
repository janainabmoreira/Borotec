// Valida o dist/ pronto para publicar (roda depois do `npm run build`).
//   node scripts/validate-dist.mjs        (ou: npm run validate:dist)
//
// Toda URL do sitemap precisa ter o seu dist/<rota>/index.html, e todo
// index.html precisa sair com: 1 <title>, 1 canonical = a própria URL, og:url
// idem, 1 <h1>, o snippet do GTM, nenhum href relativo e noindex só em
// /privacidade. Também exige app-shell.html (com noindex), .htaccess,
// robots.txt e sitemap.xml. O prerender já recusa a maioria disso rota a rota;
// aqui é a conferência final do que vai subir.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SITE_URL = "https://borotec.com.br";
const GTM_ID = "GTM-PHZX6QBB";
const NOINDEX_ROUTES = new Set(["/privacidade/"]);
const ALLOWED_HREF = /^(\/|https?:|mailto:|tel:|#)/i;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

export function validateDist(distDir) {
  const problems = [];
  const warnings = [];
  for (const f of ["index.html", "app-shell.html", ".htaccess", "robots.txt", "sitemap.xml"]) {
    if (!fs.existsSync(path.join(distDir, f))) problems.push(`falta dist/${f}`);
  }
  if (problems.length) return { problems, warnings, routes: [], sitemap: [] };

  const files = walk(distDir);
  const routes = files
    .filter((f) => path.basename(f) === "index.html")
    .map((f) => {
      const rel = path.relative(distDir, path.dirname(f)).split(path.sep).join("/");
      return rel ? `/${rel}/` : "/";
    })
    .sort();
  const routeSet = new Set(routes);

  const sitemap = [...fs.readFileSync(path.join(distDir, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  for (const loc of sitemap) {
    if (!loc.startsWith(`${SITE_URL}/`)) { problems.push(`sitemap com URL fora do site: ${loc}`); continue; }
    const r = loc.slice(SITE_URL.length);
    if (!routeSet.has(r)) problems.push(`${r}: está no sitemap mas não foi pré-renderizada`);
  }

  for (const r of routes) {
    const html = fs.readFileSync(path.join(distDir, r, "index.html"), "utf8");
    const head = html.split("</head>")[0];
    const exp = SITE_URL + r;
    const p = [];
    const titles = (head.match(/<title[\s>]/g) || []).length;
    if (titles !== 1) p.push(`${titles} <title>`);
    const canon = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)].map((m) => m[0].match(/href="([^"]*)"/)?.[1]);
    if (canon.length !== 1) p.push(`${canon.length} canonical`);
    else if (canon[0] !== exp) p.push(`canonical=${canon[0]}`);
    const ogUrl = head.match(/property="og:url"[^>]*content="([^"]*)"/)?.[1];
    if (ogUrl !== exp) p.push(`og:url=${ogUrl ?? "(nenhum)"}`);
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) p.push(`${h1} <h1>`);
    if (!html.includes(`'${GTM_ID}'`) || !html.includes(`ns.html?id=${GTM_ID}`)) p.push("GTM ausente");
    const noindex = /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(head);
    if (noindex !== NOINDEX_ROUTES.has(r)) p.push(noindex ? "noindex indevido" : "noindex ausente");
    const relative = new Set();
    for (const m of html.matchAll(/\shref=(?:"([^"]*)"|'([^']*)')/gi)) {
      const v = (m[1] ?? m[2] ?? "").trim();
      if (!ALLOWED_HREF.test(v)) relative.add(v || "(vazio)");
      else if (v.startsWith("/") && !v.startsWith("//")) {
        // Link interno para rota/arquivo que não está no dist: só aviso
        // (rotas só do navegador, como /admin, não têm HTML próprio).
        const clean = decodeURIComponent(v.split(/[?#]/)[0]);
        const target = path.join(distDir, clean);
        const isFile = fs.existsSync(target) && fs.statSync(target).isFile();
        if (!routeSet.has(clean) && !isFile) warnings.push(`${r} → ${clean} (sem arquivo no dist)`);
      }
    }
    if (relative.size) p.push(`href relativo: ${[...relative].slice(0, 5).join(", ")}`);
    if (!noindex && !sitemap.includes(exp)) p.push("indexável mas fora do sitemap");
    if (p.length) problems.push(`${r}: ${p.join("; ")}`);
  }

  const shell = fs.readFileSync(path.join(distDir, "app-shell.html"), "utf8");
  if (!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(shell)) problems.push("app-shell.html sem noindex");
  if (/rel="canonical"/.test(shell)) problems.push("app-shell.html com canonical");

  return { problems, warnings: [...new Set(warnings)], routes, sitemap };
}

export function printValidation({ problems, warnings, routes, sitemap }) {
  console.log(`Validação do dist/: ${routes.length} páginas pré-renderizadas, ${sitemap.length} URLs no sitemap.`);
  if (warnings.length) {
    console.log(`  Avisos (não impedem a publicação): ${warnings.length}`);
    for (const w of warnings.slice(0, 10)) console.log(`    - ${w}`);
  }
  if (problems.length) {
    console.log(`  PROBLEMAS: ${problems.length}`);
    for (const p of problems) console.log(`    ✗ ${p}`);
    return false;
  }
  console.log("  OK: title, canonical, og:url, H1, GTM, links absolutos e noindex conferidos em todas as páginas.");
  return true;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const distDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
  process.exit(printValidation(validateDist(distDir)) ? 0 : 1);
}
