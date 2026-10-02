import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';
import { useProductLines, groupLinesBySection, type ProductSection } from '@/hooks/useProductLines';
import { ICON_MAP } from '@/lib/iconMap';
import { getAccentClasses } from '@/lib/accentColors';
import type { DbProductLine } from '@/types/database';

/* ---------- helpers ---------- */

const SECTION_ID = 'solucoes';
const tabId = (slug: string) => `aba-${slug}`;
const panelId = (slug: string) => `painel-${slug}`;

// Aba pedida pela URL: /#solucoes-termografia ou ?categoria=termografia
function sectionFromUrl(sections: ProductSection[]): string | null {
  if (typeof window === 'undefined') return null;
  const fromQuery = new URLSearchParams(window.location.search).get('categoria');
  const hash = window.location.hash.replace(/^#/, '');
  const fromHash = hash.startsWith(`${SECTION_ID}-`) ? hash.slice(SECTION_ID.length + 1) : null;
  const wanted = fromHash ?? fromQuery;
  return wanted && sections.some((s) => s.slug === wanted) ? wanted : null;
}

// 3 colunas, ou 4 quando 3 deixaria um card sozinho na última linha (4, 7, 10…).
const gridCols = (count: number) =>
  count > 3 && count % 3 === 1 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

/* ---------- card ---------- */

const LineCard = ({ line, index }: { line: DbProductLine; index: number }) => {
  const Icon = ICON_MAP[line.icon_name] ?? Wrench;
  const bar = getAccentClasses(line.accent).barFrom;

  return (
    <AnimateOnScroll animation="fade-up" delay={index * 70}>
      <Link
        to={line.path}
        className="group relative flex flex-col h-full bg-card rounded-2xl border border-border hover:border-cyan/40 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(6,214,225,0.12)] transition-all duration-300 overflow-hidden shadow-sm"
      >
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${bar} to-transparent opacity-60 group-hover:opacity-100 transition-opacity`} />

        <div className="flex flex-col flex-1 p-6 pt-7">
          <div className="flex items-start justify-between mb-5">
            <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0 text-cyan group-hover:bg-cyan/20 transition-colors">
              <Icon className="w-7 h-7" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest font-body px-2.5 py-1 rounded-lg bg-cyan/10 text-cyan">
              {line.badge}
            </span>
          </div>

          <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-cyan transition-colors mb-2 leading-snug">
            {line.name}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
            {line.card_description}
          </p>

          <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
            <span className="text-sm font-semibold font-heading text-accent">Ver produtos</span>
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all">
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    </AnimateOnScroll>
  );
};

/* ---------- componente ---------- */

const FeaturedProductsSection = () => {
  const { lines } = useProductLines();
  // Abas = categorias (section_slug) das linhas ativas, na ordem do sort_order
  // das linhas — o mesmo critério do menu do cabeçalho. Categoria nova
  // cadastrada no /admin vira aba sozinha.
  const sections = groupLinesBySection(lines);

  const [active, setActive] = useState<string | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const current = sections.find((s) => s.slug === active) ?? sections[0];

  // Abre a aba pedida pela URL assim que as linhas chegam (e quando o hash muda).
  useEffect(() => {
    if (sections.length === 0) return;
    const apply = () => {
      const fromUrl = sectionFromUrl(sections);
      if (fromUrl) {
        setActive(fromUrl);
        // Espera o painel da aba renderizar antes de rolar até a seção.
        setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.length]);

  const select = (slug: string, focus = false) => {
    if (slug === current?.slug) return;
    setActive(slug);
    if (focus) tabRefs.current[slug]?.focus();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'home_tab_categoria', categoria: slug });
  };

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = sections.length - 1;
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(sections[next].slug, true);
  };

  return (
  <section id={SECTION_ID} ref={sectionRef} className="relative py-20 md:py-28 bg-background overflow-hidden scroll-mt-20">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-3xl" />
    </div>

    <div className="relative container-wide mx-auto px-4 md:px-8">
      <AnimateOnScroll animation="fade-up">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold font-body uppercase tracking-widest mb-5">
            O que você precisa inspecionar?
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-foreground mb-4 leading-tight">
            Encontre a <span className="text-gradient">solução certa</span>
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
            Selecione a aplicação para conhecer os equipamentos ideais para sua necessidade.
          </p>
        </div>
      </AnimateOnScroll>

      {sections.length > 1 && (
        <div className="-mx-4 px-4 mb-10 overflow-x-auto md:overflow-visible">
          <div role="tablist" aria-label="Categorias de equipamentos" className="flex w-max mx-auto gap-2 p-1.5 rounded-full bg-card border border-border">
            {sections.map((s, i) => {
              const selected = s.slug === current?.slug;
              return (
                <button
                  key={s.slug}
                  ref={(el) => { tabRefs.current[s.slug] = el; }}
                  id={tabId(s.slug)}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={panelId(s.slug)}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(s.slug)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold font-heading transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                    selected ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Todos os painéis ficam no HTML (SEO); os inativos só ficam ocultos. */}
      {sections.map((s) => {
        const selected = s.slug === current?.slug;
        return (
          <div
            key={s.slug}
            id={panelId(s.slug)}
            role="tabpanel"
            aria-labelledby={tabId(s.slug)}
            hidden={!selected}
            className={selected ? 'animate-fade-in' : undefined}
          >
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols(s.lines.length)} gap-6`}>
              {s.lines.map((line, i) => <LineCard key={line.path} line={line} index={i} />)}
            </div>
            <div className="mt-8 text-center">
              <Link to={`/${s.slug}`} className="text-sm text-cyan hover:text-cyan/70 font-body font-medium transition-colors">
                Ver todas as linhas de {s.name} →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  </section>
  );
};

export default FeaturedProductsSection;
