// Padrão de URL do site: SEMPRE com barra final (/boroscopios/, /linha-t/bt-1000/).
// Cada rota pré-renderizada é uma pasta real no servidor (dist/<rota>/index.html),
// e o Apache dessa hospedagem responde /rota com 301 → /rota/ antes de qualquer
// regra do .htaccess (ver nota em public/.htaccess). Por isso links internos,
// canonical, og:url, JSON-LD e sitemap usam a versão com barra — a URL final,
// sem redirecionamento no meio.
export const SITE_URL = 'https://borotec.com.br';

// "/linha-t" → "/linha-t/"; preserva ?query e #hash; não mexe em arquivos (.pdf, .jpg…).
export function withSlash(path: string): string {
  const match = path.match(/^([^?#]*)(.*)$/);
  const [pathname, rest] = match ? [match[1], match[2]] : [path, ''];
  if (pathname.endsWith('/') || /\.[a-z0-9]+$/i.test(pathname)) return path;
  return `${pathname}/${rest}`;
}

// "/linha-t" → "https://borotec.com.br/linha-t/"
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${withSlash(path)}`;
}

// "/linha-t/" → "/linha-t" — para comparar rotas e registrar analytics sem
// duplicar a mesma página em duas versões.
export function stripSlash(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}
