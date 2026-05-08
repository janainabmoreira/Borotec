/**
 * Post-build prerender script.
 * Serves the dist folder, visits each route with puppeteer,
 * and saves the fully-rendered HTML — so Googlebot gets
 * complete content on the first crawl without needing JS.
 *
 * Usage: node prerender.cjs  (run after vite build)
 */

const puppeteer = require('./node_modules/puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 3777;

const ROUTES = [
  '/',
  '/produtos',
  '/categorias',
  '/sobre',
  '/contato',
  '/blog',
  '/privacidade',
  // Blog posts
  '/blog/o-que-e-boroscopio-industrial',
  '/blog/importancia-inspecao-tubulacoes',
  '/blog/como-escolher-boroscopio',
  '/blog/tecnologia-3d-inspecao',
  '/blog/manutencao-preventiva-robos',
  '/blog/certificacoes-atex-iecex',
  '/blog/termografia-industrial',
  // Produtos - Linha T
  '/produtos/sk3208',
  '/produtos/sk3210',
  '/produtos/sk3328',
  '/produtos/sk3408',
  '/produtos/sk3608',
  '/produtos/sk3610',
  '/produtos/sk3808',
  '/produtos/sk3828',
  // Produtos - Linha E
  '/produtos/trolley-73mm',
  '/produtos/y-series',
  '/produtos/dz-series',
  '/produtos/k-series-3d',
  '/produtos/k-series-ex',
  '/produtos/k-series-ht',
  '/produtos/k-series-thermal',
  '/produtos/k-series-uv',
  // Produtos - Linha R
  '/produtos/fb20p-camera',
  '/produtos/fb20p-tablet',
  '/produtos/fb20p-system',
  // Produtos - Linha M
  '/produtos/p-series',
  '/produtos/k-series',
  '/produtos/la-series',
  '/produtos/hj-series',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.css':  'text/css',
  '.webp': 'image/webp',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.mp4':  'video/mp4',
  '.json': 'application/json',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
};

function createStaticServer() {
  return http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    let filePath = path.join(DIST_DIR, urlPath);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');

    try {
      fs.createReadStream(filePath).pipe(res);
    } catch {
      res.statusCode = 404;
      res.end('Not found');
    }
  });
}

async function prerender() {
  console.log('\n🚀 Iniciando pré-renderização...\n');

  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`📡 Servidor local em http://localhost:${PORT}\n`);

  // Use system Chrome (supports modern JS) instead of the bundled old Chromium
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    headless: true,
  });

  let ok = 0;
  let failed = 0;

  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Give React a moment to finish any deferred renders
      await page.waitFor(800);

      const html = await page.content();

      const routePath = route === '/' ? '/index.html' : `${route}/index.html`;
      const outputPath = path.join(DIST_DIR, routePath);
      const outputDir  = path.dirname(outputPath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`  ✓  ${route}`);
      ok++;
    } catch (err) {
      console.error(`  ✗  ${route}  →  ${err.message}`);
      failed++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n✅ Pré-renderização concluída: ${ok} OK, ${failed} falhas.\n`);
}

prerender().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
