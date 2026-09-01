// Canonical URL for each product line. This is the single source of truth for
// where a product "lives" on the site — product cards, search results, and
// ProductDetail's own canonical tag should all resolve to the same URL.
// Mirrors scripts/lineMap.mjs (build-time script, kept separate since it can't
// import from src/) — keep both in sync.
export const CATEGORY_TO_LINE: Record<string, string> = {
  'Linha T - Tubulações': '/linha-t',
  'Linha R - Acesso Autônomo': '/linha-r',
  'Linha M - Máquinas e Motores': '/linha-m',
  'Linha E - Aplicações Especiais': '/linha-e',
  'Linha P - Poços e Subaquático': '/linha-p',
  'Linha TC - Altura e Difícil Acesso': '/linha-tc',
  'Linha H - Hospitalar': '/linha-h',
};

export function getProductPath(category: string, id: string): string {
  const line = CATEGORY_TO_LINE[category];
  return line ? `${line}/${id}` : `/produtos/${id}`;
}
