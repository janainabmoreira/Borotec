import { useEffect } from 'react';

/**
 * Tells the build-time prerenderer (scripts/prerender.mjs / Puppeteer) that
 * this page's <Helmet> has actually committed its tags to the real DOM, so
 * it's safe to snapshot the HTML.
 *
 * Two ways to use it, pick based on whether the page's <Helmet> content
 * depends on async data:
 *
 * 1. usePrerenderReady() — for pages whose <Helmet> renders immediately with
 *    static content (About, Contact, Categories, Index, PrivacyPolicy). Pass
 *    the returned handler to <Helmet onChangeClientState={...}>. That
 *    callback (unlike a plain useEffect) only fires once react-helmet-async
 *    has actually finished writing to document.head — it schedules that
 *    write slightly asynchronously, so a sibling useEffect firing "ready" on
 *    mount raced ahead of it here and produced HTML missing some
 *    Helmet-managed tags (title updated fine, since that's a special
 *    singleton node, but canonical/description/some OG tags weren't written
 *    yet).
 *
 * 2. usePrerenderSignal(ready) — for pages that fetch from Supabase before
 *    they have anything real to show (ProductDetail, BlogPost: no <Helmet>
 *    at all until loaded) or where the visible content — not just <Helmet> —
 *    depends on the fetch (Blog, LineTubulacoes, etc.: <Helmet> is static,
 *    but the list of posts/products isn't). Pass `!loading`. The fetch delay
 *    is long enough relative to Helmet's own commit that the same race
 *    doesn't apply here.
 */
export function usePrerenderReady() {
  return () => {
    document.dispatchEvent(new Event('app-rendered'));
  };
}

export function usePrerenderSignal(ready: boolean) {
  useEffect(() => {
    if (ready) {
      document.dispatchEvent(new Event('app-rendered'));
    }
  }, [ready]);
}
