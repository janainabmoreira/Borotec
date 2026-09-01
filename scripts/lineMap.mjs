// Mirrors the category → line-route mapping used across the app
// (see categoryBreadcrumb in src/pages/ProductDetail.tsx and the
// useLineProducts(category) calls in each src/pages/Line*.tsx).
// Keep these two in sync — this file has no way to import the .tsx one.
export const CATEGORY_TO_LINE = {
  'Linha T - Tubulações': '/linha-t',
  'Linha R - Acesso Autônomo': '/linha-r',
  'Linha M - Máquinas e Motores': '/linha-m',
  'Linha E - Aplicações Especiais': '/linha-e',
  'Linha P - Poços e Subaquático': '/linha-p',
  'Linha TC - Altura e Difícil Acesso': '/linha-tc',
  'Linha H - Hospitalar': '/linha-h',
};

export const STATIC_ROUTES = ['/', '/boroscopios', '/sobre', '/contato', '/privacidade', '/blog'];
