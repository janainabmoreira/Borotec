import { supabase } from '@/lib/supabase';
import { getCachedLines } from '@/hooks/useProductLines';
import { stripSlash } from '@/lib/urls';
import { WHATSAPP_INTEREST } from '@/seo/routes';

const WHATSAPP_NUMBER = '5511932876195';
const STORAGE_KEY = 'borotec_utms';
const SESSION_KEY = 'brt_sid';

// Tipos conhecidos continuam com autocomplete; `string & {}` permite também
// qualquer slug de linha (ex: 'termografia') sem perder isso — uma linha
// criada pelo admin não existe como literal no código, então o tipo não
// pode ser um union fechado.
export type WhatsAppType =
  | 'flutuante' | 'hero' | 'contato' | 'geral' | 'produto' | 'carrinho'
  | 'rodape' | 'privacidade'
  | (string & {});

// Link de fallback (sem JS / clique do meio) dos <a> de WhatsApp.
export const WHATSAPP_FALLBACK_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`;

// button_type do evento whatsapp_click. Os botões das linhas passam o id da
// linha como `tipo` (vai assim para o painel do /admin); no dataLayer viram
// "linha", com o id em line_id.
const KNOWN_BUTTON_TYPE: Record<string, string> = {
  flutuante: 'flutuante',
  hero: 'hero',
  geral: 'cta',
  produto: 'produto',
  contato: 'contato',
  carrinho: 'carrinho',
  rodape: 'rodape',
  privacidade: 'privacidade',
};

// SKU (id) do produto quando a página atual é a de um produto.
function getProductSku(): string | undefined {
  const path = stripSlash(window.location.pathname);
  const parentPath = path.split('/').slice(0, -1).join('/');
  if (parentPath && getCachedLines().some((l) => l.path === parentPath)) {
    return path.split('/').pop();
  }
  return undefined;
}

// Complemento de "quero um orçamento ___" conforme a página atual:
// config fixa (src/seo/routes.ts) → linha/seção do admin → produto → nada.
function getPageInterest(productName?: string): string | null {
  if (productName) return `do produto ${productName}`;

  const path = stripSlash(window.location.pathname);
  if (WHATSAPP_INTEREST[path]) return WHATSAPP_INTEREST[path];

  const lines = getCachedLines();
  const line = lines.find((l) => l.path === path);
  if (line) return `da ${line.badge} (${line.name})`;

  const parentPath = path.split('/').slice(0, -1).join('/');
  if (parentPath && lines.some((l) => l.path === parentPath)) {
    const h1 = document.querySelector('h1')?.textContent?.trim();
    if (h1) return `do produto ${h1}`;
  }

  const section = lines.find((l) => `/${l.section_slug}` === path);
  if (section) return `de ${section.section_name.toLowerCase()}`;

  return null;
}

function toFriendlySource(source: string, medium: string): string {
  const src = source.toLowerCase();
  const med = medium.toLowerCase();
  if (src === 'google' && med === 'cpc') return 'Google Ads';
  if (src === 'google') return 'Orgânico';
  if (src === 'googlemynegocio') return 'GMN';
  if (src === 'facebook' && med === 'cpc') return 'Facebook Ads';
  if (src === 'facebook') return 'Facebook';
  if (src === 'instagram' && med === 'cpc') return 'Instagram Ads';
  if (src === 'instagram') return 'Instagram';
  if (src === 'linkedin' && med === 'cpc') return 'LinkedIn Ads';
  if (src === 'linkedin') return 'LinkedIn';
  if (src === 'email') return 'Email';
  if (src === 'direto') return 'Direto';
  return source.charAt(0).toUpperCase() + source.slice(1);
}

function getUtms() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function getSource(): string {
  const params = new URLSearchParams(window.location.search);
  const utms = getUtms();

  if (utms.utm_source && utms.utm_source !== 'direto')
    return toFriendlySource(utms.utm_source, utms.utm_medium ?? '');

  const utmSource = params.get('utm_source');
  if (utmSource) return toFriendlySource(utmSource, params.get('utm_medium') ?? '');

  if (params.get('gclid')) return 'Google Ads';

  return 'Direto';
}

function getSessionId(): string {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

function pathToTitle(path: string): string {
  const map: Record<string, string> = {
    '/': 'Home',
    '/contato': 'Contato',
    '/boroscopios': 'Categorias',
    '/categorias': 'Categorias',
    '/blog': 'Blog',
    '/sobre': 'Sobre',
    '/busca': 'Busca',
  };
  if (map[path]) return map[path];
  if (path.startsWith('/produtos/')) return `Produto: ${path.split('/')[2]}`;

  const segments = path.split('/').filter(Boolean);
  if (segments.length >= 1) {
    const line = getCachedLines().find(l => l.path === `/${segments[0]}`);
    if (line) return segments.length >= 2 ? `Produto: ${segments[1]}` : line.name;
  }

  if (path.startsWith('/blog/')) return `Blog: ${path.split('/')[2].replace(/-/g, ' ')}`;
  return path;
}

function trackClick(tipo: WhatsAppType) {
  // GTM — evento único para todos os botões, disparado antes de abrir o
  // WhatsApp. (A conversão do GA4 hoje vem do acionador de clique em
  // .whatsapp-btn; este evento existe para o GTM poder migrar para ele.)
  const buttonType = KNOWN_BUTTON_TYPE[tipo] ?? 'linha';
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_click',
    button_type: buttonType,
    page_path: window.location.pathname,
    product_sku: getProductSku(),
    ...(buttonType === 'linha' && { line_id: tipo }),
  });

  // Supabase
  const utms = getUtms();
  const path = stripSlash(window.location.pathname);
  supabase.from('whatsapp_clicks').insert({
    path,
    page_title: pathToTitle(path),
    button_type: tipo,
    utm_source: utms.utm_source || null,
    utm_medium: utms.utm_medium || null,
    utm_campaign: utms.utm_campaign || null,
    session_id: getSessionId(),
  }).then(({ error }) => {
    if (error) console.error('[WA track]', error.message);
  });
}

export function useWhatsAppMessage() {
  const openWhatsApp = (tipo: WhatsAppType, extra?: string) => {
    trackClick(tipo);

    const origem = getSource();

    let body: string;

    if (tipo === 'carrinho') {
      body = `Olá! Vim pelo site e quero um orçamento dos seguintes itens:\n${extra ?? ''}`;
    } else {
      const produto = tipo === 'produto'
        ? extra || document.querySelector('h1')?.textContent?.trim()
        : undefined;
      const interesse = getPageInterest(produto);
      body = interesse
        ? `Olá! Vim pelo site e quero um orçamento ${interesse}.`
        : 'Olá! Vim pelo site e quero um orçamento.';
    }

    const msg = `[${origem}] ${body}`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  return { openWhatsApp };
}
