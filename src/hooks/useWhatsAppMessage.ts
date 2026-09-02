import { supabase } from '@/lib/supabase';
import { getCachedLines } from '@/hooks/useProductLines';

const WHATSAPP_NUMBER = '5511932876195';
const STORAGE_KEY = 'borotec_utms';
const SESSION_KEY = 'brt_sid';

// Tipos conhecidos continuam com autocomplete; `string & {}` permite também
// qualquer slug de linha (ex: 'termografia') sem perder isso — uma linha
// criada pelo admin não existe como literal no código, então o tipo não
// pode ser um union fechado.
export type WhatsAppType =
  | 'flutuante' | 'hero' | 'contato' | 'geral' | 'produto' | 'carrinho'
  | (string & {});

const KNOWN_GTM_EVENT: Record<string, string> = {
  flutuante: 'Botao_Whatsapp_flutuante',
  hero:      'Botao_Whatsapp_hero',
  geral:     'Botao_Whatsapp_cta',
  produto:   'Botao_Whatsapp_produto',
  contato:   'Botao_Whatsapp_contato',
  carrinho:  'Botao_Whatsapp_carrinho',
};

function gtmEventFor(tipo: string): string {
  if (KNOWN_GTM_EVENT[tipo]) return KNOWN_GTM_EVENT[tipo];
  const slug = tipo.replace(/^linha-/, '').replace(/-/g, '_');
  return `Botao_Whatsapp_linha_${slug}`;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Bom dia';
  if (hour >= 12 && hour < 18) return 'Boa tarde';
  return 'Boa noite';
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
  // GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: gtmEventFor(tipo), whatsapp_button: tipo });

  // Supabase
  const utms = getUtms();
  const path = window.location.pathname;
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

    const saudacao = getGreeting();
    const origem = getSource();

    let body: string;

    switch (tipo) {
      case 'produto': {
        const nome = extra || document.querySelector('h1')?.textContent?.trim() || 'produto';
        body = `Olá, ${saudacao}! Gostaria de solicitar informações sobre o produto: ${nome}`;
        break;
      }
      case 'carrinho':
        body = `Olá, ${saudacao}! Gostaria de solicitar um orçamento para os seguintes itens:\n${extra ?? ''}`;
        break;
      default:
        body = `Olá, ${saudacao}! Gostaria de falar com um especialista Borotec.`;
    }

    const msg = `[${origem}] ${body}`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  return { openWhatsApp };
}
