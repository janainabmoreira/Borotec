// Fetches the current catalog (active products + published blog posts) from
// Supabase at build time, so the prerender route list and the sitemap always
// reflect what's actually live in the DB — including anything added via /admin
// since the last deploy. Falls back to just the static routes if Supabase is
// unreachable, so a build never hard-fails because of it.
import { CATEGORY_TO_LINE, STATIC_ROUTES } from './lineMap.mjs';
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
  const lineListingRoutes = Object.values(CATEGORY_TO_LINE);
  const routes = new Set([...STATIC_ROUTES, ...lineListingRoutes]);
  const products = [];
  const blogPosts = [];

  // path -> { lastmod, changefreq, priority }
  const sitemapMeta = new Map();
  for (const path of STATIC_ROUTES) {
    sitemapMeta.set(path, { lastmod: TODAY, ...(STATIC_META[path] ?? { changefreq: 'monthly', priority: '0.5' }) });
  }
  for (const path of lineListingRoutes) {
    sitemapMeta.set(path, { lastmod: TODAY, changefreq: 'weekly', priority: '0.8' });
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
    const productsRes = await fetch(`${supabaseUrl}/rest/v1/products?select=id,category,updated_at&active=eq.true`, { headers });
    if (productsRes.ok) {
      const data = await productsRes.json();
      for (const p of data) {
        const line = CATEGORY_TO_LINE[p.category];
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
