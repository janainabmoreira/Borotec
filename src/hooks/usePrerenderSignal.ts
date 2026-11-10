import { useEffect } from 'react';

/**
 * Tells the build-time prerenderer (scripts/prerender.mjs / Puppeteer) that
 * the page is ready to be snapshotted.
 *
 * Pages with a public URL don't call this directly: <Seo /> (src/seo/Seo.tsx)
 * calls it once BOTH the page's data is loaded (its `ready` prop) AND
 * react-helmet-async has actually written this route's title and canonical
 * to document.head. Firing on data alone raced Helmet's async commit and
 * produced HTML with the previous/home <head> (seen on /termografia/).
 *
 * Pages call it directly only for the not-found branch, where there is no
 * <Seo /> to do it.
 */
export function usePrerenderSignal(ready: boolean) {
  useEffect(() => {
    if (ready) {
      document.dispatchEvent(new Event('app-rendered'));
    }
  }, [ready]);
}
