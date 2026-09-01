import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { IconTubulacao, IconRobo, IconMaquina, IconEspecial, IconPoco, IconAltura, IconHospital } from '@/components/LineIcons';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo-borotec.webp';
import { blogPosts } from '@/data/blog';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CATEGORY_TO_LINE, getProductPath } from '@/lib/productLines';

const categoryToPath = CATEGORY_TO_LINE;

type DbProduct = { id: string; name: string; category: string; image_url: string | null };

const navApplications = [
  { label: 'Tubulações e dutos',       badge: 'Linha T',  description: 'Boroscópios e endoscópios para tubulações industriais de todos os diâmetros', path: '/linha-t',  icon: IconTubulacao },
  { label: 'Acesso autônomo em dutos', badge: 'Linha R',  description: 'Robôs de inspeção para tubulações de grande porte e difícil acesso',           path: '/linha-r',  icon: IconRobo      },
  { label: 'Máquinas e motores',       badge: 'Linha M',  description: 'Endoscópios industriais para motores, compressores e equipamentos mecânicos',    path: '/linha-m',  icon: IconMaquina   },
  { label: 'Aplicações especiais',     badge: 'Linha E',  description: 'Medição 3D, termografia, UV, área classificada e alta temperatura',              path: '/linha-e',  icon: IconEspecial  },
  { label: 'Poços e subaquático',      badge: 'Linha P',  description: 'Inspeção em poços artesianos, poços de petróleo e aplicações subaquáticas',      path: '/linha-p',  icon: IconPoco      },
  { label: 'Altura e difícil alcance', badge: 'Linha TC', description: 'Câmeras telescópicas para inspeção em altura e locais de difícil alcance',       path: '/linha-tc', icon: IconAltura    },
  { label: 'Vias aéreas e equipamentos médicos', badge: 'Linha H', description: 'Videolaringoscópios, boroscópios e câmeras flexíveis para intubação de vias aéreas, procedimentos clínicos e inspeção de equipamentos hospitalares.', path: '/linha-h', icon: IconHospital },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Busca produtos no Supabase quando o usuário digita
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2 || !isSupabaseConfigured) { setDbProducts([]); return; }
    supabase
      .from('products')
      .select('id, name, category, image_url')
      .eq('active', true)
      .ilike('name', `%${q}%`)
      .limit(4)
      .then(({ data }) => setDbProducts(data ?? []));
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return { posts: [] };
    return {
      posts: blogPosts.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 3),
    };
  }, [searchQuery]);

  const hasResults = dbProducts.length > 0 || searchResults.posts.length > 0;
  const showDropdown = searchQuery.trim().length >= 2;

  const clearSearch = () => setSearchQuery('');

  const handleResultClick = () => {
    clearSearch();
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      clearSearch();
      setIsMenuOpen(false);
    }
  };

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        clearSearch();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', path: '/' },
    { label: 'Boroscópios', path: '/boroscopios' },
    { label: 'Blog', path: '/blog' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/'
          ? 'bg-charcoal/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="container-wide mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="BOROTEC Industrial" className="h-16 md:h-20 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-body text-sm font-medium transition-all duration-300 hover:text-accent ${
                    isActive(link.path) ? 'text-accent' : 'text-primary-foreground/90'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Applications Mega-menu */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className={`font-body text-sm font-medium transition-all duration-300 hover:text-accent flex items-center gap-1 ${
                  location.pathname.startsWith('/linha') || location.pathname === '/boroscopios'
                    ? 'text-accent' : 'text-primary-foreground/90'
                }`}>
                  Aplicações
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 pt-2 w-[440px] z-50">
                    <div className="bg-charcoal border border-border/50 rounded-xl shadow-2xl overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-border/30">
                        <p className="text-xs uppercase tracking-widest text-cyan font-semibold font-body">O que você precisa inspecionar?</p>
                      </div>
                      <div className="py-1">
                        {navApplications.map((app) => {
                          const Icon = app.icon;
                          return (
                          <Link
                            key={app.path}
                            to={app.path}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-cyan/5 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center shrink-0 text-cyan group-hover:bg-cyan/20 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-sm font-semibold text-primary-foreground group-hover:text-cyan transition-colors font-heading leading-tight">
                                  {app.label}
                                </span>
                                <span className="text-[10px] font-medium px-1.5 py-0.5 bg-accent/20 text-accent rounded font-body whitespace-nowrap">
                                  {app.badge}
                                </span>
                              </div>
                              <p className="text-xs text-primary-foreground/50 font-body leading-relaxed">
                                {app.description}
                              </p>
                            </div>
                          </Link>
                          );
                        })}
                      </div>
                      <div className="border-t border-border/30 px-4 py-2.5">
                        <Link to="/boroscopios" className="text-xs text-cyan hover:text-cyan/70 font-body font-medium transition-colors">
                          Ver todas as aplicações →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-body text-sm font-medium transition-all duration-300 hover:text-accent ${
                    isActive(link.path) ? 'text-accent' : 'text-primary-foreground/90'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA & Cart */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <div className="hidden md:block relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit}>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-2 w-52 focus-within:w-64 focus-within:border-cyan/50 focus-within:bg-white/15 transition-all duration-300 backdrop-blur-sm">
                    <Search className="w-4 h-4 text-cyan shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar no site..."
                      className="bg-transparent text-sm text-primary-foreground placeholder:text-white/50 focus:outline-none font-body w-full"
                    />
                    {searchQuery && (
                      <button type="button" onClick={clearSearch} className="text-white/40 hover:text-white/70 transition-colors shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </form>

                {/* Dropdown de resultados */}
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-charcoal border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-50">
                    {/* Header do dropdown */}
                    <div className="px-4 py-2.5 border-b border-border/30 flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-widest text-cyan font-semibold font-body">Resultados</p>
                      <button onClick={clearSearch} className="text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {!hasResults ? (
                      <div className="px-4 py-6 text-center">
                        <Search className="w-8 h-8 text-primary-foreground/20 mx-auto mb-2" />
                        <p className="text-xs text-primary-foreground/50 font-body">
                          Nenhum resultado para <span className="text-primary-foreground/80 font-medium">"{searchQuery}"</span>
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Produtos do Supabase */}
                        {dbProducts.length > 0 && (
                          <div>
                            <p className="px-4 py-2 text-[10px] text-primary-foreground/40 uppercase tracking-wide font-body border-b border-border/20">Produtos</p>
                            {dbProducts.map((p) => {
                              const base = categoryToPath[p.category] ?? '/boroscopios';
                              return (
                                <Link
                                  key={p.id}
                                  to={`${base}/${p.id}`}
                                  onClick={handleResultClick}
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary-foreground/8 transition-colors group"
                                >
                                  {p.image_url ? (
                                    <img src={p.image_url} alt={p.name} className="w-9 h-9 object-cover rounded-lg flex-shrink-0" />
                                  ) : (
                                    <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex-shrink-0" />
                                  )}
                                  <div className="min-w-0">
                                    <p className="text-xs font-heading font-semibold text-primary-foreground group-hover:text-cyan transition-colors line-clamp-1">{p.name}</p>
                                    <p className="text-[10px] text-accent/70 font-body mt-0.5">{p.category}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                        {/* Posts do blog */}
                        {searchResults.posts.length > 0 && (
                          <div className={dbProducts.length > 0 ? 'border-t border-border/20' : ''}>
                            <p className="px-4 py-2 text-[10px] text-primary-foreground/40 uppercase tracking-wide font-body border-b border-border/20">Blog</p>
                            {searchResults.posts.map((p) => (
                              <Link
                                key={p.id}
                                to={`/blog/${p.id}`}
                                onClick={handleResultClick}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-primary-foreground/8 transition-colors group"
                              >
                                <img src={p.image} alt={p.title} className="w-9 h-9 object-cover rounded-lg flex-shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs font-heading font-semibold text-primary-foreground group-hover:text-cyan transition-colors line-clamp-1">{p.title}</p>
                                  <p className="text-[10px] text-cyan/60 font-body mt-0.5">{p.category}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        <div className="border-t border-border/30 px-4 py-2.5">
                          <button onClick={handleSearchSubmit as unknown as React.MouseEventHandler} className="text-xs text-cyan hover:text-cyan/80 font-body font-medium transition-colors">
                            Ver todos os resultados →
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Button variant="cta" className="hidden md:flex" asChild>
                <Link to="/contato">Solicite um Orçamento</Link>
              </Button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-primary-foreground"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden pb-6 animate-fade-in bg-charcoal/95 backdrop-blur-md -mx-4 px-4 rounded-b-2xl">
              <div className="flex flex-col gap-4 pt-4">
                {navLinks.slice(0, 2).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-body text-lg font-medium transition-colors hover:text-accent ${
                      isActive(link.path) ? 'text-accent' : 'text-primary-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Categories */}
                <div>
                  <button
                    onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                    className="font-body text-lg font-medium transition-colors hover:text-accent text-primary-foreground flex items-center gap-2 w-full"
                  >
                    Aplicações
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileCategoriesOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-2 border-l-2 border-cyan/30 pl-4">
                      {navApplications.map((app) => (
                        <Link
                          key={app.path}
                          to={app.path}
                          onClick={() => { setIsMenuOpen(false); setIsMobileCategoriesOpen(false); }}
                          className="text-sm text-primary-foreground/80 hover:text-cyan transition-colors py-1"
                        >
                          {app.label}
                          <span className="ml-1.5 text-[10px] text-accent font-medium">{app.badge}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {navLinks.slice(2).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-body text-lg font-medium transition-colors hover:text-accent ${
                      isActive(link.path) ? 'text-accent' : 'text-primary-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Search */}
                <div>
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar produtos ou blog..."
                      className="flex-1 px-4 py-2.5 text-sm bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-cyan/50 transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-cyan text-charcoal rounded-lg hover:bg-cyan/90 transition-colors"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Resultados mobile */}
                  {showDropdown && (
                    <div className="mt-2 bg-charcoal/80 border border-primary-foreground/20 rounded-xl overflow-hidden">
                      {!hasResults ? (
                        <p className="px-4 py-3 text-xs text-primary-foreground/50 text-center font-body">
                          Nenhum resultado para <span className="text-primary-foreground/80 font-medium">"{searchQuery}"</span>
                        </p>
                      ) : (
                        <>
                          {dbProducts.length > 0 && (
                            <div>
                              <p className="px-4 py-1.5 text-[10px] text-primary-foreground/40 uppercase tracking-wide bg-primary-foreground/5 font-body">Produtos</p>
                              {dbProducts.map((p) => (
                                <Link
                                  key={p.id}
                                  to={getProductPath(p.category, p.id)}
                                  onClick={handleResultClick}
                                  className="flex items-center gap-3 px-4 py-2 hover:bg-primary-foreground/10 transition-colors"
                                >
                                  {p.image_url ? (
                                    <img src={p.image_url} alt={p.name} className="w-8 h-8 object-cover rounded flex-shrink-0" />
                                  ) : (
                                    <div className="w-8 h-8 rounded bg-primary-foreground/10 flex-shrink-0" />
                                  )}
                                  <p className="text-xs font-heading font-semibold text-primary-foreground line-clamp-1">{p.name}</p>
                                </Link>
                              ))}
                            </div>
                          )}
                          {searchResults.posts.length > 0 && (
                            <div className={dbProducts.length > 0 ? 'border-t border-primary-foreground/10' : ''}>
                              <p className="px-4 py-1.5 text-[10px] text-primary-foreground/40 uppercase tracking-wide bg-primary-foreground/5 font-body">Blog</p>
                              {searchResults.posts.map((p) => (
                                <Link
                                  key={p.id}
                                  to={`/blog/${p.id}`}
                                  onClick={handleResultClick}
                                  className="flex items-center gap-3 px-4 py-2 hover:bg-primary-foreground/10 transition-colors"
                                >
                                  <img src={p.image} alt={p.title} className="w-8 h-8 object-cover rounded flex-shrink-0" />
                                  <p className="text-xs font-heading font-semibold text-primary-foreground line-clamp-1">{p.title}</p>
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                <Button variant="cta" className="mt-2" asChild>
                  <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                    Solicite um Orçamento
                  </Link>
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

    </>
  );
};

export default Header;
