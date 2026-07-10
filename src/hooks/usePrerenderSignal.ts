import { useEffect } from 'react';

/**
 * Tells the build-time prerenderer (vite-plugin-prerender / Puppeteer) that this
 * page has finished loading its data and committed its final <Helmet> tags, so it's
 * safe to snapshot the HTML. Pages with no async data should pass `true` immediately;
 * pages that fetch from Supabase should pass their `!loading` flag.
 */
export function usePrerenderSignal(ready: boolean) {
  useEffect(() => {
    if (ready) {
      document.dispatchEvent(new Event('app-rendered'));
    }
  }, [ready]);
}
