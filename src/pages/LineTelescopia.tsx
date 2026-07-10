import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Plus, Check, Camera, Monitor, Droplets, Plug2,
  ChevronDown, ChevronUp, MessageCircle, SlidersHorizontal, X, Loader2,
} from 'lucide-react';
import { IconAltura } from '@/components/LineIcons';
import { useWhatsAppMessage } from '@/hooks/useWhatsAppMessage';
import { useLineProducts, type SpecLabels } from '@/hooks/useLineProducts';
import { usePrerenderSignal } from '@/hooks/usePrerenderSignal';
// ── Types ─────────────────────────────────────────────────────────────────────

type TelescopiaProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  probe: string;
  cable: string;
  camera: string;
  ip: string;
  specLabels?: SpecLabels;
};

type FilterKey = keyof Omit<TelescopiaProduct, 'id' | 'name' | 'description' | 'image' | 'specLabels'>;
type FilterState = Record<FilterKey, string[]>;

// ── Dados dos produtos ────────────────────────────────────────────────────────

// ── Configuração dos filtros ──────────────────────────────────────────────────

const filterConfig: { key: FilterKey; label: string; options: string[] }[] = [
  { key: 'cable',  label: 'Comprimento da haste', options: ['3m', '5m', '10m']    },
  { key: 'camera', label: 'Resolução',             options: ['HD', 'Full HD']       },
  { key: 'ip',     label: 'Proteção IP',           options: ['IP65', 'IP67']        },
];

const emptyFilters: FilterState = {
  probe: [], cable: [], camera: [], ip: [],
};

// ── Specs exibidos no card ────────────────────────────────────────────────────

const cardSpecs = [
  { icon: Camera,   key: 'probe'  as FilterKey, label: 'Câmera'  },
  { icon: Plug2,    key: 'cable'  as FilterKey, label: 'Haste'   },
  { icon: Monitor,  key: 'camera' as FilterKey, label: 'Resolução' },
  { icon: Droplets, key: 'ip'     as FilterKey, label: 'Proteção' },
];

// ── Card ──────────────────────────────────────────────────────────────────────

const ProductCard = ({ product }: { product: TelescopiaProduct }) => {

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
      <Link to={`/linha-tc/${product.id}`} className="block relative overflow-hidden aspect-[4/3] bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-500/90 backdrop-blur-sm text-white text-[10px] font-bold font-heading rounded-full uppercase tracking-wide">
            <IconAltura className="w-3 h-3" /> Linha TC
          </span>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/linha-tc/${product.id}`}>
          <h3 className="font-heading font-bold text-base text-foreground mb-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-xs text-foreground/55 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {cardSpecs.map(({ icon: Icon, key, label: defaultLabel }) => {
            const label = product.specLabels?.[key] || defaultLabel;
            const val = product[key];
            const display = Array.isArray(val) ? val[0] : val;
            return (
              <div key={key} className="flex items-center gap-1.5 bg-secondary/60 rounded-lg px-2.5 py-1.5">
                <Icon className="w-3 h-3 text-cyan shrink-0" />
                <div className="min-w-0">
                  <p className="text-[9px] text-foreground/40 font-body uppercase tracking-wide leading-none">{label}</p>
                  <p className="text-[11px] font-semibold font-body text-foreground truncate">{display}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Button variant="cta" size="sm" className="flex-1 text-xs" asChild>
            <Link to={`/linha-tc/${product.id}`}>
              Ver detalhes
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// ── Filter group ──────────────────────────────────────────────────────────────

const FilterGroup = ({
  label, options, selected, onChange,
}: {
  label: string; options: string[]; selected: string[]; onChange: (val: string) => void;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-border/40 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="font-heading font-semibold text-sm text-foreground">{label}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-foreground/40 group-hover:text-foreground transition-colors" />
          : <ChevronDown className="w-4 h-4 text-foreground/40 group-hover:text-foreground transition-colors" />}
      </button>
      {open && (
        <div className="flex flex-col gap-2">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group/check">
              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                selected.includes(opt)
                  ? 'bg-cyan border-cyan'
                  : 'border-border/60 group-hover/check:border-cyan/50'
              }`}>
                {selected.includes(opt) && (
                  <svg className="w-2.5 h-2.5 text-charcoal" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                )}
              </div>
              <input type="checkbox" className="sr-only" checked={selected.includes(opt)} onChange={() => onChange(opt)} />
              <span className={`font-body text-sm transition-colors ${
                selected.includes(opt) ? 'text-foreground font-medium' : 'text-foreground/60 group-hover/check:text-foreground'
              }`}>
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const LineTelescopia = () => {
  const { openWhatsApp } = useWhatsAppMessage();
  const { products, loading } = useLineProducts('Linha TC - Altura e Difícil Acesso');
  usePrerenderSignal(!loading);
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleFilter = (key: FilterKey, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }));
  };

  const clearFilters = () => setFilters(emptyFilters);

  const activeCount = Object.values(filters).flat().length;

  const dynamicFilterConfig = useMemo(() => filterConfig.map(fc => ({
    ...fc,
    options: Array.from(new Set(products.map(p => p[fc.key]).filter(Boolean))).sort(),
  })), [products]);

  const filtered = useMemo(() => products.filter(p => {
    return filterConfig.every(({ key }) => {
      const sel = filters[key];
      if (sel.length === 0) return true;
      const val = p[key];
      return sel.includes(val as string);
    });
  }), [products, filters]);

  return (
    <>
      <Helmet>
        <title>Câmeras Telescópicas para Altura e Difícil Acesso | Linha TC | BOROTEC Industrial</title>
        <meta name="description" content="Câmeras telescópicas com haste extensível de até 5m para inspeção em altura, telhados e estruturas elevadas. Pan-tilt 360°, câmera Full HD, IP65." />
        <link rel="canonical" href="https://borotec.com.br/linha-tc" />
        <meta property="og:title" content="Câmeras Telescópicas para Altura | BOROTEC Industrial" />
        <meta property="og:description" content="Inspeção em altura sem trabalho em altura com câmeras telescópicas de haste até 5m e pan-tilt 360°." />
        <meta property="og:url" content="https://borotec.com.br/linha-tc" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20">
          {/* Hero */}
          <section className="relative bg-charcoal py-12 md:py-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan/5 rounded-full blur-3xl" />

            <div className="relative container-wide mx-auto px-4 md:px-8">
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
                <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
                <span>/</span>
                <Link to="/boroscopios" className="hover:text-cyan transition-colors">Boroscópios</Link>
                <span>/</span>
                <span className="text-cyan">Altura e Difícil Acesso</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-cyan/20 rounded-xl flex items-center justify-center">
                      <IconAltura className="w-5 h-5 text-cyan" />
                    </div>
                    <span className="inline-flex items-center px-3 py-1 bg-orange-500/15 text-orange-400 text-xs font-semibold font-body rounded-full">
                      Linha TC
                    </span>
                  </div>
                  <h1 className="font-heading text-3xl md:text-5xl font-black text-primary-foreground mb-3">
                    Altura e{' '}
                    <span className="text-gradient">Difícil Acesso</span>
                  </h1>
                  <p className="font-body text-base text-primary-foreground/60 max-w-2xl">
                    Câmeras telescópicas com haste extensível para inspeção em altura, telhados, vigas e estruturas elevadas sem necessidade de andaimes ou trabalho em altura.
                  </p>
                </div>
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="shrink-0 whatsapp-btn"
                  onClick={() => { openWhatsApp('linha-tc'); window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'Botao_WhatsApp_TC' }); }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar com o Especialista
                </Button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
          </section>

          {/* Content */}
          <section className="container-wide mx-auto px-4 md:px-8 py-10">

            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <p className="font-body text-sm text-foreground/60">
                <span className="font-semibold text-foreground">{filtered.length}</span> produto{filtered.length !== 1 ? 's' : ''}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {activeCount > 0 && (
                  <span className="w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </Button>
            </div>

            <div className="flex gap-8">
              {/* Sidebar */}
              <aside className="hidden lg:block w-56 shrink-0">
                <div className="sticky top-24 bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-accent" />
                      Filtros
                    </h2>
                    {activeCount > 0 && (
                      <button onClick={clearFilters} className="text-xs text-accent hover:underline font-body">
                        Limpar ({activeCount})
                      </button>
                    )}
                  </div>
                  {dynamicFilterConfig.map(({ key, label, options }) => (
                    <FilterGroup
                      key={key}
                      label={label}
                      options={options}
                      selected={filters[key]}
                      onChange={(v) => toggleFilter(key, v)}
                    />
                  ))}
                </div>
              </aside>

              {/* Grid */}
              <div className="flex-1 min-w-0">
                <div className="hidden lg:flex items-center justify-between mb-6">
                  <p className="font-body text-sm text-foreground/60">
                    <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
                    {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                  </p>
                  {activeCount > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {filterConfig.map(({ key, label }) =>
                        filters[key].map(val => (
                          <button
                            key={`${key}-${val}`}
                            onClick={() => toggleFilter(key, val)}
                            className="flex items-center gap-1 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent/20 transition-colors font-body"
                          >
                            {val} <X className="w-3 h-3" />
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-cyan animate-spin" /></div>
                ) : filtered.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="font-heading font-bold text-lg text-foreground/50 mb-2">
                      Nenhum produto com esses filtros
                    </p>
                    <p className="font-body text-sm text-foreground/30 mb-6">
                      Tente remover algumas seleções.
                    </p>
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Limpar filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-card border-l border-border overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-accent" />
                Filtros
              </h2>
              <button onClick={() => setShowMobileFilters(false)} className="text-foreground/50 hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            {dynamicFilterConfig.map(({ key, label, options }) => (
              <FilterGroup
                key={key}
                label={label}
                options={options}
                selected={filters[key]}
                onChange={(v) => toggleFilter(key, v)}
              />
            ))}
            <div className="flex gap-3 mt-6">
              {activeCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="flex-1">
                  Limpar ({activeCount})
                </Button>
              )}
              <Button variant="cta" size="sm" onClick={() => setShowMobileFilters(false)} className="flex-1">
                Ver {filtered.length} produto{filtered.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LineTelescopia;



