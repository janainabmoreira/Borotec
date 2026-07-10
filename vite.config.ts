import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { fetchBuildRoutes } from "./scripts/buildRoutes.mjs";
import { buildSitemapXml } from "./scripts/generateSitemap.mjs";

// Writes dist/sitemap.xml from the routes resolved at build time.
//
// The actual page prerendering (Puppeteer) does NOT run here — it used to,
// via vite-plugin-prerender, but that wrapper would hang indefinitely inside
// the Vite build process whenever a route's navigation timed out under load
// (confirmed: killed after 12+ hours with no error, no completion). It's now
// a separate step chained after `vite build` in package.json's "build"
// script (see scripts/prerender.mjs), which renders reliably in a clean
// process and fails loudly instead of hanging.
function sitemapPlugin(sitemapEntries) {
  return {
    name: "borotec:sitemap",
    apply: "build",
    enforce: "post",
    closeBundle() {
      const outDir = path.join(__dirname, "dist");
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemapXml(sitemapEntries));
      console.log(`[sitemap] wrote dist/sitemap.xml with ${sitemapEntries.length} URLs`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const isProd = mode === "production";
  const env = loadEnv(mode, process.cwd(), "");

  const plugins = [
    react(),
    mode === "development" && componentTagger(),
  ];

  if (isProd) {
    const { sitemapEntries } = await fetchBuildRoutes({
      supabaseUrl: env.VITE_SUPABASE_URL,
      supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY,
    });

    plugins.push(sitemapPlugin(sitemapEntries));
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean),
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
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
