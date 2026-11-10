import { forwardRef } from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';
import { withSlash } from '@/lib/urls';

// <Link> do react-router que aplica o padrão de barra final do site (ver
// src/lib/urls.ts) a todo destino interno em string — assim o href no HTML
// pré-renderizado já é a URL final, sem 301.
//
// Destino sem "/" inicial (ex.: um path mal gravado no admin) é tratado como
// absoluto: o site nunca usa rota relativa de propósito, e o react-router
// resolveria "linha-t" contra a página atual (/detector-de-gas/linha-t/).
function toAbsolute(to: string): string {
  if (/^([a-z][a-z0-9+.-]*:|#|\?)/i.test(to) || to.startsWith('/')) return to;
  return `/${to}`;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const target = typeof to === 'string' ? toAbsolute(to) : to;
  return (
    <RouterLink ref={ref} to={typeof target === 'string' && target.startsWith('/') ? withSlash(target) : target} {...props} />
  );
});
Link.displayName = 'Link';
