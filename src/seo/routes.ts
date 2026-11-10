// Configuração central de SEO das páginas fixas e dos índices de seção.
//
// Linhas, produtos e posts do blog NÃO estão aqui: o title/description deles
// vem do Supabase (campos seo_title/seo_description, editáveis em /admin) e é
// passado direto para o <Seo /> pelas páginas LineProducts, ProductDetail e
// BlogPost. Duplicar esses textos aqui faria o código e o banco divergirem.
//
// Limites: title até ~60 caracteres, description até ~155.

export const DEFAULT_OG_IMAGE = 'https://borotec.com.br/og-borotec.jpg';

export interface SeoEntry {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  /** Nome curto usado no BreadcrumbList (JSON-LD). */
  breadcrumb?: string;
}

export const STATIC_SEO: Record<string, SeoEntry> = {
  '/': {
    title: 'Boroscópios, Videoscópios e Robôs de Inspeção | BOROTEC',
    description:
      'Boroscópios, videoscópios e robôs para inspeção industrial sem desmontagem: tubulações, dutos, motores e poços. Atendimento em todo o Brasil.',
  },
  '/boroscopios': {
    title: 'Boroscópios Industriais: Linhas e Modelos | BOROTEC',
    description:
      'Linhas de boroscópios BOROTEC para tubulações, máquinas e motores, poços, robôs, altura e aplicações especiais. Encontre o modelo para sua inspeção.',
    breadcrumb: 'Boroscópios',
  },
  '/termografia': {
    title: 'Câmeras Termográficas e Câmera Acústica | BOROTEC',
    description:
      'Câmeras termográficas para inspeção elétrica, industrial, avançada e de precisão, e câmera acústica com termografia. Conheça as linhas da BOROTEC.',
    breadcrumb: 'Termografia',
  },
  '/detector-de-gas': {
    title: 'Detector de Gás Monogás, Multigás e Fixo | BOROTEC',
    description:
      'Detectores de gás portáteis e fixos para O2, CO, H2S e gases inflamáveis. Ideal para espaço confinado (NR-33). Orçamento rápido pelo WhatsApp.',
    breadcrumb: 'Detector de Gás',
  },
  '/sobre': {
    title: 'Sobre a BOROTEC | +20 Anos em Metrologia Óptica Industrial',
    description:
      'Conheça a BOROTEC, empresa brasileira de boroscópios e videoscópios industriais. Desde 2003 atendendo a indústria com suporte técnico em todo o Brasil.',
    breadcrumb: 'Sobre',
  },
  '/contato': {
    title: 'Fale Conosco | BOROTEC Industrial',
    description:
      'Entre em contato com a BOROTEC Industrial. Solicite orçamento de equipamentos de inspeção industrial por formulário, e-mail ou WhatsApp.',
    breadcrumb: 'Contato',
  },
  '/privacidade': {
    title: 'Política de Privacidade | BOROTEC Industrial',
    description:
      'Política de Privacidade da BOROTEC Industrial. Saiba como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD.',
    noindex: true,
    breadcrumb: 'Política de Privacidade',
  },
  '/blog': {
    title: 'Blog de Inspeção Industrial | BOROTEC',
    description:
      'Artigos, guias e novidades sobre boroscopia, inspeção visual remota, metrologia óptica e manutenção industrial. Conteúdo técnico da BOROTEC.',
    breadcrumb: 'Blog',
  },
};

// Title automático (linha/produto sem seo_title no admin, posts do blog):
// "Base | BOROTEC" quando cabe em 60 caracteres; senão só a base, para o
// Google não cortar o texto que importa.
export function withBrand(base: string): string {
  const branded = `${base} | BOROTEC`;
  return branded.length <= 60 ? branded : base;
}

// Seção cadastrada no admin que ainda não tem entrada em STATIC_SEO.
export function sectionSeoFallback(sectionName: string): SeoEntry {
  return {
    title: `${sectionName} | BOROTEC Industrial`,
    description: `Explore as linhas de ${sectionName.toLowerCase()} da BOROTEC Industrial e solicite orçamento pelo WhatsApp.`,
    breadcrumb: sectionName,
  };
}

// Complemento da mensagem do WhatsApp por página:
// "[Origem] Olá! Vim pelo site e quero um orçamento <complemento>."
// Linhas/seções novas sem entrada aqui caem no fallback de
// useWhatsAppMessage (nome da linha ou da seção).
export const WHATSAPP_INTEREST: Record<string, string> = {
  '/boroscopios': 'de boroscópio',
  '/linha-t': 'de boroscópio para tubulações e dutos (Linha T)',
  '/linha-m': 'de boroscópio para máquinas e motores (Linha M)',
  '/linha-p': 'de câmera de inspeção para poços (Linha P)',
  '/linha-r': 'de robô de inspeção de dutos (Linha R)',
  '/linha-e': 'de videoscópio para aplicações especiais (Linha E)',
  '/linha-h': 'de boroscópio hospitalar (Linha H)',
  '/linha-tc': 'de câmera telescópica para altura e difícil acesso (Linha TC)',
  '/termografia': 'de câmera termográfica',
  '/termografia/linha-at/inspecao-acustica': 'de câmera acústica (Linha AT)',
  '/termografia/linha-d/inspecao-eletrica': 'de câmera termográfica para inspeção elétrica (Linha D)',
  '/termografia/linha-sc-a/inspecao-avancada': 'de câmera termográfica para inspeção avançada (Linha SC-A)',
  '/termografia/linha-sc-b/inspecao-de-precisao': 'de câmera termográfica para inspeção de precisão (Linha SC-B)',
  '/termografia/linha-x/inspecao-industrial': 'de câmera termográfica industrial (Linha X)',
  '/detector-de-gas': 'de detector de gás',
  '/detector-de-gas/linha-multigas/detector-multigas-portatil': 'de detector multigás',
  '/detector-de-gas/linha-monogas/detector-monogas-portatil': 'de detector monogás',
  '/detector-de-gas/linha-fixa/detector-de-gas-fixo': 'de detector de gás fixo',
};
