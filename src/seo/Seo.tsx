import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePrerenderSignal } from '@/hooks/usePrerenderSignal';
import { absoluteUrl } from '@/lib/urls';
import { DEFAULT_OG_IMAGE } from '@/seo/routes';

export interface Crumb {
  name: string;
  path: string;
}

interface SeoProps {
  /** Rota da página ("/linha-t"); vira canonical e og:url absolutos com barra final. */
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article' | 'product';
  noindex?: boolean;
  /** Trilha SEM o "Início" (adicionado automaticamente). Gera o BreadcrumbList. */
  breadcrumbs?: Crumb[];
  jsonLd?: object[];
  /** Metas extras com property (ex.: article:published_time). */
  extraMeta?: { property: string; content: string }[];
  /**
   * Quando o conteúdo visível da página depende de dados assíncronos, passe
   * `false` até eles chegarem — o prerender só tira o snapshot quando isto é
   * true E o Helmet já gravou no <head> o title e o canonical desta página.
   */
  ready?: boolean;
}

/**
 * Único ponto onde as páginas públicas definem <head>: title, description,
 * canonical (sempre um só), Open Graph, Twitter e JSON-LD.
 *
 * Também resolve a corrida que fazia o HTML pré-renderizado sair com o
 * <head> da home: o evento `app-rendered` só é disparado depois que o title
 * e o canonical desta rota estão de fato no document.head.
 */
const Seo = ({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  ogType = 'website',
  noindex = false,
  breadcrumbs,
  jsonLd = [],
  extraMeta = [],
  ready = true,
}: SeoProps) => {
  const canonical = absoluteUrl(path);
  const key = `${title}|${canonical}`;
  const [committedKey, setCommittedKey] = useState<string | null>(null);
  usePrerenderSignal(ready && committedKey === key);

  const handleCommit = () => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (document.title === title && link?.href === canonical) setCommittedKey(key);
  };

  const breadcrumbSchema = breadcrumbs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ name: 'Início', path: '/' }, ...breadcrumbs].map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: absoluteUrl(c.path),
        })),
      }
    : null;

  const schemas = breadcrumbSchema ? [...jsonLd, breadcrumbSchema] : jsonLd;
  const finalOgTitle = ogTitle ?? title;
  const finalOgDescription = ogDescription ?? description;

  return (
    <Helmet onChangeClientState={handleCommit}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:site_name" content="BOROTEC Industrial" />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      {ogImage === DEFAULT_OG_IMAGE && <meta property="og:image:width" content="1200" />}
      {ogImage === DEFAULT_OG_IMAGE && <meta property="og:image:height" content="630" />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:locale" content="pt_BR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage} />
      {extraMeta.map((m) => (
        <meta key={m.property} property={m.property} content={m.content} />
      ))}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
};

export default Seo;
