import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const getSessionId = () => {
  const key = 'brt_sid';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, sid);
  }
  return sid;
};

const pathToTitle = (path: string): string => {
  const map: Record<string, string> = {
    '/': 'Home',
    '/contato': 'Contato',
    '/boroscopios': 'Categorias',
    '/categorias': 'Categorias',
    '/blog': 'Blog',
    '/sobre': 'Sobre',
    '/busca': 'Busca',
    '/linha-t': 'Linha T - Tubulações',
    '/linha-r': 'Linha R - Robôs',
    '/linha-m': 'Linha M - Máquinas',
    '/linha-e': 'Linha E - Especiais',
    '/linha-p': 'Linha P - Poços',
    '/linha-tc': 'Linha TC - Telescopia',
  };
  if (map[path]) return map[path];
  if (path.startsWith('/produtos/')) return `Produto: ${path.split('/')[2]}`;
  if (path.startsWith('/blog/')) return `Blog: ${path.split('/')[2].replace(/-/g, ' ')}`;
  return path;
};

type GeoData = { city: string | null; region: string | null; country: string | null };

const getGeo = async (): Promise<GeoData> => {
  const cacheKey = 'brt_geo';
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try { return JSON.parse(cached); } catch { /* continue */ }
  }
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(t);
    const data = await res.json();
    const geo: GeoData = {
      city: data.city ?? null,
      region: data.region ?? null,
      country: data.country_name ?? null,
    };
    sessionStorage.setItem(cacheKey, JSON.stringify(geo));
    return geo;
  } catch {
    return { city: null, region: null, country: null };
  }
};

export const usePageView = () => {
  const location = useLocation();
  const lastPath = useRef<string>('');

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/admin') || path === lastPath.current) return;
    lastPath.current = path;

    const utms = (() => {
      try { return JSON.parse(localStorage.getItem('borotec_utms') ?? '{}'); }
      catch { return {}; }
    })();

    getGeo().then(geo => {
      supabase.from('page_views').insert({
        path,
        page_title: pathToTitle(path),
        referrer: document.referrer || null,
        utm_source: utms.utm_source || null,
        utm_medium: utms.utm_medium || null,
        utm_campaign: utms.utm_campaign || null,
        session_id: getSessionId(),
        city: geo.city,
        region: geo.region,
        country: geo.country,
      }).then(() => {});
    });
  }, [location.pathname]);
};

