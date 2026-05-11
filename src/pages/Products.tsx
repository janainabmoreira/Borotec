import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Filter, Search, X } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    const busca = searchParams.get('busca');
    if (categoria) setSelectedCategory(categoria);
    if (busca) setSearchQuery(busca);
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    const params = new URLSearchParams(searchParams);
    if (category !== 'Todos') {
      params.set('categoria', category);
    } else {
      params.delete('categoria');
    }
    params.delete('busca');
    setSearchParams(params, { replace: true });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCategory('Todos');
    const params = new URLSearchParams(searchParams);
    params.delete('categoria');
    if (searchQuery.trim()) {
      params.set('busca', searchQuery.trim());
    } else {
      params.delete('busca');
    }
    setSearchParams(params, { replace: true });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams);
    params.delete('busca');
    setSearchParams(params, { replace: true });
  };

  const filteredProducts = useMemo(() => products.filter(p => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [selectedCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Produtos de Metrologia Óptica | BOROTEC Industrial</title>
        <meta name="description" content="Linha completa de boroscópios, videoscópios e endoscópios industriais. Equipamentos para inspeção de tubulações, máquinas e áreas classificadas ATEX." />
        <link rel="canonical" href="https://borotec.com.br/produtos" />
        <meta property="og:title" content="Produtos de Metrologia Óptica | BOROTEC Industrial" />
        <meta property="og:description" content="Linha completa de boroscópios, videoscópios e endoscópios industriais. Equipamentos para inspeção de tubulações, máquinas e áreas classificadas ATEX." />
        <meta property="og:url" content="https://borotec.com.br/produtos" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://borotec.com.br/og-borotec.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Produtos de Metrologia Óptica | BOROTEC Industrial" />
        <meta name="twitter:description" content="Linha completa de boroscópios, videoscópios e endoscópios industriais." />
        <meta name="twitter:image" content="https://borotec.com.br/og-borotec.jpg" />
      </Helmet>
    <div className="min-h-screen bg-charcoal">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-charcoal py-16 md:py-24 overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="relative container-wide mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
                <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
                <span>/</span>
                <span className="text-cyan">Produtos</span>
              </nav>
              
              <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground mb-6">
                Nossos <span className="text-gradient">Produtos</span>
              </h1>
              <p className="font-body text-lg text-primary-foreground/60 mb-8">
                Linha completa de boroscópios industriais para inspeção de poços,
                tubulações e sistemas robotizados.
              </p>

              {/* Search bar */}
              <form onSubmit={handleSearchSubmit} className="relative max-w-lg flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nome, categoria..."
                    className="w-full pl-12 pr-10 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-cyan/50 transition-colors font-body text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-3 bg-cyan text-charcoal rounded-xl hover:bg-cyan/90 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
          
          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-charcoal">
          <div className="container-wide mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Desktop */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 bg-navy-dark/50 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10">
                  <h3 className="font-heading font-bold text-lg text-primary-foreground mb-6">
                    Categorias
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => handleCategoryChange(category)}
                          className={`w-full text-left px-4 py-3 rounded-lg font-body text-sm transition-all ${
                            selectedCategory === category && !searchQuery
                              ? 'bg-accent text-accent-foreground font-medium'
                              : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full justify-between bg-navy-dark/50 border-primary-foreground/20 text-primary-foreground hover:bg-navy-dark"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtrar por categoria
                  </span>
                  <span className="text-cyan">{selectedCategory}</span>
                </Button>
                
                {showFilters && (
                  <div className="mt-4 bg-navy-dark/50 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                    <ul className="grid grid-cols-1 gap-2">
                      {categories.map((category) => (
                        <li key={category}>
                          <button
                            onClick={() => {
                              handleCategoryChange(category);
                              setShowFilters(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg font-body text-sm transition-all ${
                              selectedCategory === category && !searchQuery
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-primary-foreground/70 hover:bg-primary-foreground/10'
                            }`}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Products */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <p className="font-body text-primary-foreground/50">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                    {searchQuery && <span className="text-cyan ml-1">para "{searchQuery}"</span>}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="text-sm text-primary-foreground/50 hover:text-cyan transition-colors flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Limpar busca
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="font-body text-lg text-primary-foreground/50">
                      Nenhum produto encontrado nesta categoria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default Products;
