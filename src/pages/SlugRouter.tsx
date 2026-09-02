import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useProductLines, groupLinesBySection } from '@/hooks/useProductLines';
import CategoryIndex from '@/pages/CategoryIndex';
import LineProducts from '@/pages/LineProducts';

// Único segmento dinâmico (/:lineSlug) pode ser tanto uma seção de menu
// (ex: /termografia, quando ela tem pelo menos uma linha) quanto uma linha
// em si (ex: /linha-h) — decide qual delas renderizar antes de delegar.
const SlugRouter = () => {
  const { lineSlug } = useParams<{ lineSlug: string }>();
  const { lines, loading } = useProductLines();

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan animate-spin" />
      </div>
    );
  }

  const sections = groupLinesBySection(lines);
  const section = sections.find((s) => s.slug === lineSlug);
  if (section) {
    return <CategoryIndex sectionSlug={section.slug} />;
  }

  return <LineProducts />;
};

export default SlugRouter;
