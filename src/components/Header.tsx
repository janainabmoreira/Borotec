import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuoteCart } from '@/contexts/QuoteCartContext';
import QuoteCartSheet from './QuoteCartSheet';
import logo from '@/assets/logo-borotec.webp';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog';

const navCategories = [
  { label: 'Linha T - Tubulações', path: '/produtos?categoria=Linha%20T%20-%20Tubula%C3%A7%C3%B5es' },
  { label: 'Linha R - Robôs', path: '/produtos?categoria=Linha%20R%20-%20Rob%C3%B4s' },
  { label: 'Linha M - Máquinas', path: '/produtos?categoria=Linha%20M%20-%20M%C3%A1quinas' },
  { label: 'Linha E - Especiais', path: '/produtos?categoria=Linha%20E%20-%20Especiais' },
  { label: 'Linha P - Poços', path: '/produtos?categoria=Linha%20P%20-%20Po%C3%A7os' },
  { label: 'Linha TC - Telescópicos', path: '/produtos?categoria=Linha%20TC%20-%20Telesc%C3%B3picos' },
  { label: 'Ver Todas', path: '/categorias' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useQuoteCart();

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return { products: [], posts: [] };
    return {
      products: products.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 4),
      posts: blogPosts.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 3),
    };
  }, [searchQuery]);

  const hasResults = searchResults.products.length > 0 || searchResults.posts.length > 0;
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
    { label: 'Produtos', path: '/produtos' },
    { label: 'Blog', path: '/blog' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
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

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className={`font-body text-sm font-medium transition-all duration-300 hover:text-accent flex items-center gap-1 ${
                  location.pathname === '/categorias' || location.search.includes('categoria')
                    ? 'text-accent' : 'text-primary-foreground/90'
                }`}>
                  Categorias
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50">
                    <div className="bg-charcoal border border-border/50 rounded-lg shadow-xl overflow-hidden">
                      {navCategories.map((cat, index) => (
                        <Link
                          key={cat.path}
                          to={cat.path}
                          className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-cyan/10 hover:text-cyan ${
                            index === navCategories.length - 1
                              ? 'border-t border-border/50 text-cyan'
                              : 'text-primary-foreground/90'
                          }`}
                        >
                          {cat.label}
                        </Link>
                      ))}
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
              {/* Desktop Search com dropdown */}
              <div className="hidden md:flex items-center relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar produtos ou blog..."
                    className="w-44 focus:w-64 px-3 py-1.5 text-sm bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-lg text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-cyan/50 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-cyan text-charcoal rounded-r-lg hover:bg-cyan/90 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {/* Dropdown de resultados */}
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-charcoal border border-primary-foreground/20 rounded-xl shadow-2xl overflow-hidden z-50">
                    {!hasResults ? (
                      <p className="px-4 py-4 text-xs text-primary-foreground/50 text-center font-body">
                        Nenhum resultado para <span className="text-primary-foreground/80 font-medium">"{searchQuery}"</span>
                      </p>
                    ) : (
                      <>
                        {searchResults.products.length > 0 && (
                          <div>
                            <p className="px-4 py-2 text-[10px] text-primary-foreground/40 uppercase tracking-wide bg-primary-foreground/5 font-body">
                              Produtos
                            </p>
                            {searchResults.products.map((p) => (
                              <Link
                                key={p.id}
                                to={`/produtos/${p.id}`}
                                onClick={handleResultClick}
                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-foreground/10 transition-colors group"
                              >
                                <img src={p.image} alt={p.name} className="w-9 h-9 object-cover rounded flex-shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs font-heading font-semibold text-primary-foreground group-hover:text-cyan transition-colors line-clamp-1">
                                    {p.name}
                                  </p>
                                  <p className="text-[10px] text-primary-foreground/40 font-body">{p.category}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        {searchResults.posts.length > 0 && (
                          <div className={searchResults.products.length > 0 ? 'border-t border-primary-foreground/10' : ''}>
                            <p className="px-4 py-2 text-[10px] text-primary-foreground/40 uppercase tracking-wide bg-primary-foreground/5 font-body">
                              Blog
                            </p>
                            {searchResults.posts.map((p) => (
                              <Link
                                key={p.id}
                                to={`/blog/${p.id}`}
                                onClick={handleResultClick}
                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-foreground/10 transition-colors group"
                              >
                                <img src={p.image} alt={p.title} className="w-9 h-9 object-cover rounded flex-shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs font-heading font-semibold text-primary-foreground group-hover:text-cyan transition-colors line-clamp-1">
                                    {p.title}
                                  </p>
                                  <p className="text-[10px] text-cyan/70 font-body">{p.category}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        <div className="border-t border-primary-foreground/10 px-4 py-2.5">
                          <button
                            onClick={handleSearchSubmit as unknown as React.MouseEventHandler}
                            className="text-xs text-cyan hover:underline font-body"
                          >
                            Ver todos os resultados para "{searchQuery}" →
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-primary-foreground/90 hover:text-cyan transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

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
                    Categorias
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileCategoriesOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-2 border-l-2 border-cyan/30 pl-4">
                      {navCategories.map((cat) => (
                        <Link
                          key={cat.path}
                          to={cat.path}
                          onClick={() => { setIsMenuOpen(false); setIsMobileCategoriesOpen(false); }}
                          className="text-sm text-primary-foreground/80 hover:text-cyan transition-colors py-1"
                        >
                          {cat.label}
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
                          {searchResults.products.length > 0 && (
                            <div>
                              <p className="px-4 py-1.5 text-[10px] text-primary-foreground/40 uppercase tracking-wide bg-primary-foreground/5 font-body">Produtos</p>
                              {searchResults.products.map((p) => (
                                <Link
                                  key={p.id}
                                  to={`/produtos/${p.id}`}
                                  onClick={handleResultClick}
                                  className="flex items-center gap-3 px-4 py-2 hover:bg-primary-foreground/10 transition-colors"
                                >
                                  <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded flex-shrink-0" />
                                  <p className="text-xs font-heading font-semibold text-primary-foreground line-clamp-1">{p.name}</p>
                                </Link>
                              ))}
                            </div>
                          )}
                          {searchResults.posts.length > 0 && (
                            <div className={searchResults.products.length > 0 ? 'border-t border-primary-foreground/10' : ''}>
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

      <QuoteCartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
};

export default Header;
