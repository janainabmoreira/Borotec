import { forwardRef } from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';
import { withSlash } from '@/lib/urls';

// <Link> do react-router que aplica o padrão de barra final do site (ver
// src/lib/urls.ts) a todo destino interno em string — assim o href no HTML
// pré-renderizado já é a URL final, sem 301.
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => (
  <RouterLink ref={ref} to={typeof to === 'string' && to.startsWith('/') ? withSlash(to) : to} {...props} />
));
Link.displayName = 'Link';
