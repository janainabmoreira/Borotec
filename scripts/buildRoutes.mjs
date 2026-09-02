// Fetches the current catalog (active products + published blog posts +
// active product lines) from Supabase at build time, so the prerender route
// list and the sitemap always reflect what's actually live in the DB —
// including anything added via /admin since the last deploy. Falls back to
// just the static routes if Supabase is unreachable, so a build never
// hard-fails because of it.
import { STATIC_ROUTES } from './lineMap.mjs';
import { blogPosts as staticBlogPosts } from '../src/data/blog.ts';

const TODAY = new Date().toISOString().slice(0, 10);

const STATIC_META = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/boroscopios': { changefreq: 'weekly', priority: '0.9' },
  '/sobre': { changefreq: 'monthly', priority: '0.7' },
  '/contato': { changefreq: 'monthly', priority: '0.7' },
  '/privacidade': { changefreq: 'yearly', priority: '0.3' },
  '/blog': { changefreq: 'weekly', priority: '0.8' },
};

export async function fetchBuildRoutes({ supabaseUrl, supabaseAnonKey }) {
  const routes = new Set(STATIC_ROUTES);
  const products = [];
  const blogPosts = [];
  // category -> path, populated from product_lines below; used to resolve
  // each product's canonical route the same way src/lib/productLines.ts does.
  const categoryToLine = {};

  // path -> { lastmod, changefreq, priority }
  const sitemapMeta = new Map();
  for (const path of STATIC_ROUTES) {
    sitemapMeta.set(path, { lastmod: TODAY, ...(STATIC_META[path] ?? { changefreq: 'monthly', priority: '0.5' }) });
  }

  // Static fallback posts are shown at runtime for any slug not overridden by
  // the DB (see src/pages/Blog.tsx / BlogPost.tsx) — mirror that here.
  for (const post of staticBlogPosts) {
    const path = `/blog/${post.id}`;
    routes.add(path);
    blogPosts.push(post.id);
    sitemapMeta.set(path, { lastmod: post.date ?? TODAY, changefreq: 'yearly', priority: '0.6' });
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[build-routes] VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY not set — prerendering static routes only.');
    return buildResult(routes, products, blogPosts, sitemapMeta);
  }

  const headers = { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` };

  try {
    const linesRes = await fetch(`${supabaseUrl}/rest/v1/product_lines?select=id,path,category,section_slug,updated_at&active=eq.true`, { headers });
    if (linesRes.ok) {
      const data = await linesRes.json();
      // Uma rota de índice por seção distinta (/boroscopios, /termografia, ...)
      // além da já garantida em STATIC_ROUTES para /boroscopios — uma seção
      // nova (criada ao cadastrar uma linha com "seção do menu" inédita)
      // ganha sua própria rota de índice automaticamente.
      const sectionSlugs = new Set(data.map((l) => l.section_slug).filter(Boolean));
      for (const slug of sectionSlugs) {
        const path = `/${slug}`;
        routes.add(path);
        if (!sitemapMeta.has(path)) {
          sitemapMeta.set(path, { lastmod: TODAY, changefreq: 'weekly', priority: '0.8' });
        }
      }
      for (const line of data) {
        categoryToLine[line.category] = line.path;
        routes.add(line.path);
        sitemapMeta.set(line.path, {
          lastmod: (line.updated_at ?? TODAY).slice(0, 10),
          changefreq: 'weekly',
          priority: '0.8',
        });
      }
    } else {
      console.warn(`[build-routes] Supabase product_lines fetch failed: HTTP ${linesRes.status}`);
    }
  } catch (err) {
    console.warn('[build-routes] Supabase product_lines fetch threw — continuing without DB lines.', err);
  }

  try {
    const productsRes = await fetch(`${supabaseUrl}/rest/v1/products?select=id,category,updated_at&active=eq.true`, { headers });
    if (productsRes.ok) {
      const data = await productsRes.json();
      for (const p of data) {
        const line = categoryToLine[p.category];
        if (!line) {
          console.warn(`[build-routes] product "${p.id}" has unknown category "${p.category}" — skipped.`);
          continue;
        }
        const path = `${line}/${p.id}`;
        routes.add(path);
        products.push({ id: p.id, category: p.category, line });
        sitemapMeta.set(path, {
          lastmod: (p.updated_at ?? TODAY).slice(0, 10),
          changefreq: 'monthly',
          priority: '0.8',
        });
      }
    } else {
      console.warn(`[build-routes] Supabase products fetch failed: HTTP ${productsRes.status}`);
    }
  } catch (err) {
    console.warn('[build-routes] Supabase products fetch threw — continuing without DB products.', err);
  }

  try {
    const blogRes = await fetch(`${supabaseUrl}/rest/v1/blog_posts?select=id,updated_at&active=eq.true`, { headers });
    if (blogRes.ok) {
      const data = await blogRes.json();
      for (const post of data) {
        const path = `/blog/${post.id}`;
        routes.add(path);
        blogPosts.push(post.id);
        sitemapMeta.set(path, {
          lastmod: (post.updated_at ?? TODAY).slice(0, 10),
          changefreq: 'yearly',
          priority: '0.6',
        });
      }
    } else {
      console.warn(`[build-routes] Supabase blog_posts fetch failed: HTTP ${blogRes.status}`);
    }
  } catch (err) {
    console.warn('[build-routes] Supabase blog_posts fetch threw — continuing without DB posts.', err);
  }

  return buildResult(routes, products, blogPosts, sitemapMeta);
}

function buildResult(routes, products, blogPosts, sitemapMeta) {
  const sitemapEntries = Array.from(routes).map((path) => ({
    loc: `https://borotec.com.br${path}`,
    ...(sitemapMeta.get(path) ?? { lastmod: TODAY, changefreq: 'monthly', priority: '0.5' }),
  }));
  return { routes: Array.from(routes), products, blogPosts, sitemapEntries };
}
