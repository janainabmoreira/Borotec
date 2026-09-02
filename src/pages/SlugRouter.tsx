import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useProductLines, groupLinesBySection } from '@/hooks/useProductLines';
import CategoryIndex from '@/pages/CategoryIndex';
import LineProducts from '@/pages/LineProducts';
import ProductDetail from '@/pages/ProductDetail';
import NotFound from '@/pages/NotFound';

// Catch-all para qualquer caminho não coberto pelas rotas estáticas.
// Linhas de Boroscópios são "soltas" (/linha-t, /linha-t/:produto) por
// compatibilidade com URLs que já existiam antes do sistema de seções;
// linhas de seções novas (Termografia em diante) nascem aninhadas e podem
// ter qualquer profundidade (/termografia/linha-d/inspecao-eletrica,
// .../inspecao-eletrica/:produto). Em vez de tratar cada profundidade à
// parte, decide por correspondência exata contra o `path` salvo em cada
// linha — funciona pra qualquer formato sem precisar prever quantos
// segmentos uma linha vai ter.
const SlugRouter = () => {
  const { pathname } = useLocation();
  const { lines, loading } = useProductLines();

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan animate-spin" />
      </div>
    );
  }

  const clean = pathname.replace(/\/$/, '');
  const segments = clean.split('/').filter(Boolean);

  // Path bate exatamente com a URL de alguma linha → página de listagem dela
  if (lines.some((l) => l.path === clean)) {
    return <LineProducts />;
  }

  // Path menos o último segmento bate com a URL de alguma linha → é um produto dela
  if (segments.length >= 2) {
    const parentPath = `/${segments.slice(0, -1).join('/')}`;
    if (lines.some((l) => l.path === parentPath)) {
      return <ProductDetail />;
    }
  }

  // Um único segmento batendo com uma seção → índice da seção
  if (segments.length === 1) {
    const section = groupLinesBySection(lines).find((s) => s.slug === segments[0]);
    if (section) return <CategoryIndex sectionSlug={section.slug} />;
  }

  return <NotFound />;
};

export default SlugRouter;
