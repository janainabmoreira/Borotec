import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from "module";
import { componentTagger } from "lovable-tagger";

const require = createRequire(import.meta.url);

// Prerender routes — execute `npm install` before building if @prerenderer packages are missing
const prerenderRoutes = [
  "/",
  "/sobre",
  "/produtos",
  "/categorias",
  "/contato",
  "/blog",
  "/privacidade",
  // Blog posts
  "/blog/o-que-e-boroscopio-industrial",
  "/blog/importancia-inspecao-tubulacoes",
  "/blog/como-escolher-boroscopio",
  "/blog/tecnologia-3d-inspecao",
  "/blog/manutencao-preventiva-robos",
  "/blog/certificacoes-atex-iecex",
  "/blog/termografia-industrial",
  // Produtos — Linha T
  "/produtos/sk3208",
  "/produtos/sk3210",
  "/produtos/sk3328",
  "/produtos/sk3408",
  "/produtos/sk3608",
  "/produtos/sk3610",
  "/produtos/sk3808",
  "/produtos/sk3828",
  // Produtos — Linha E
  "/produtos/y-series",
  "/produtos/dz-series",
  "/produtos/k-series-3d",
  "/produtos/k-series-ex",
  "/produtos/k-series-ht",
  "/produtos/k-series-thermal",
  "/produtos/k-series-uv",
  "/produtos/trolley-73mm",
  // Produtos — Linha R
  "/produtos/fb20p-camera",
  "/produtos/fb20p-tablet",
  "/produtos/fb20p-system",
  // Produtos — Linha M
  "/produtos/p-series",
  "/produtos/k-series",
  "/produtos/la-series",
  "/produtos/hj-series",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  const plugins = [
    react(),
    mode === "development" && componentTagger(),
  ];

  if (isProd) {
    // vite-plugin-prerender requires @prerenderer/prerenderer and
    // @prerenderer/renderer-puppeteer — run `npm install` if build fails
    // with MODULE_NOT_FOUND.
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const vitePrerender = require("vite-plugin-prerender");
      plugins.push(
        vitePrerender({
          staticDir: path.join(__dirname, "dist"),
          routes: prerenderRoutes,
        })
      );
    } catch {
      console.warn("[prerender] vite-plugin-prerender not available — skipping prerender step.");
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean),
    build: {
      emptyOutDir: false,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/index.js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: ({ name }) => {
            if (/\.(webp|png|jpg|jpeg|gif|svg|ico|mp4|woff2|woff|ttf)$/i.test(name ?? '')) {
              return 'assets/[name][extname]';
            }
            return 'assets/[name][extname]';
          },
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
              return 'vendor';
            }
            if (id.includes('node_modules/@radix-ui/')) {
              return 'radix';
            }
            if (id.includes('node_modules/recharts/') || id.includes('node_modules/d3-')) {
              return 'charts';
            }
            if (id.includes('node_modules/@fontsource/')) {
              return 'fonts';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
