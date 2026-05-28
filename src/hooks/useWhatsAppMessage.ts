const WHATSAPP_NUMBER = '5511932876195';
const STORAGE_KEY = 'borotec_utms';

export type WhatsAppType = 'flutuante' | 'hero' | 'contato' | 'geral' | 'produto' | 'carrinho';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Bom dia';
  if (hour >= 12 && hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function getSource(): string {
  const params = new URLSearchParams(window.location.search);

  // 1. utm_source do localStorage (ignora fallback 'direto' gravado pelo useUTMCapture)
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as { utm_source?: string };
      if (stored.utm_source && stored.utm_source !== 'direto') {
        return stored.utm_source;
      }
    }
  } catch {}

  // 2. utm_source na URL atual
  const utmSource = params.get('utm_source');
  if (utmSource) return utmSource;

  // 3. gclid → google
  if (params.get('gclid')) return 'google';

  return 'Direto';
}

export function useWhatsAppMessage() {
  const openWhatsApp = (tipo: WhatsAppType, extra?: string) => {
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
