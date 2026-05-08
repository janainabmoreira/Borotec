import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog';
import { Search, Package, BookOpen, ArrowRight, X } from 'lucide-react';
import type { Product } from '@/contexts/QuoteCartContext';
import type { BlogPost } from '@/data/blog';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setQuery(q);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const q = (searchParams.get('q') ?? '').toLowerCase().trim();

  const matchedProducts: Product[] = q
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : [];

  const matchedPosts: BlogPost[] = q
    ? blogPosts.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : [];

  const totalResults = matchedProducts.length + matchedPosts.length;

  return (
    <>
      <Helmet>
        <title>{q ? `Busca: "${q}" | BOROTEC` : 'Busca | BOROTEC Industrial'}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-charcoal">
        <Header />

        <main className="pt-20">
          {/* Hero */}
          <section className="relative bg-charcoal py-16 md:py-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

            <div className="relative container-wide mx-auto px-4 md:px-8">
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
                <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
                <span>/</span>
                <span className="text-cyan">Busca</span>
              </nav>

              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground mb-6">
                {q ? (
                  <>Resultados para <span className="text-gradient">"{searchParams.get('q')}"</span></>
                ) : (
                  <>Buscar no <span className="text-gradient">Site</span></>
                )}
              </h1>

              {/* Search form */}
              <form onSubmit={handleSubmit} className="flex items-center max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40 pointer-events-none" />
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Buscar produtos, blog, categorias..."
                    className="w-full pl-12 pr-10 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-xl text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-cyan/50 transition-colors font-body text-sm"
                    autoFocus
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => { setQuery(''); setSearchParams({}); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 bg-cyan text-charcoal font-semibold rounded-r-xl hover:bg-cyan/90 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  Buscar
                </button>
              </form>

              {q && (
                <p className="mt-4 text-sm text-primary-foreground/50">
                  {totalResults === 0
                    ? 'Nenhum resultado encontrado.'
                    : `${totalResults} resultado${totalResults !== 1 ? 's' : ''} encontrado${totalResults !== 1 ? 's' : ''}`}
                </p>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
          </section>

          {/* Results */}
          {q && (
            <section className="section-padding bg-charcoal">
              <div className="container-wide mx-auto space-y-16">

                {/* Products */}
                {matchedProducts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Package className="w-5 h-5 text-cyan" />
                      <h2 className="font-heading text-xl font-bold text-primary-foreground">
                        Produtos
                        <span className="ml-2 text-sm font-normal text-primary-foreground/50">
                          ({matchedProducts.length})
                        </span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {matchedProducts.map(product => (
                        <Link
                          key={product.id}
                          to={`/produtos/${product.id}`}
                          className="group bg-navy-dark/50 backdrop-blur-sm border border-primary-foreground/10 rounded-xl overflow-hidden hover:border-cyan/40 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="aspect-square sm:aspect-[4/3] overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4">
                            <span className="inline-block px-2 py-0.5 bg-cyan/10 text-cyan text-xs font-body rounded-full border border-cyan/20 mb-2">
                              {product.category}
                            </span>
                            <h3 className="font-heading font-bold text-sm text-primary-foreground group-hover:text-cyan transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Link
                        to={`/produtos?busca=${encodeURIComponent(searchParams.get('q') ?? '')}`}
                        className="inline-flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all"
                      >
                        Ver todos os produtos <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Blog */}
                {matchedPosts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen className="w-5 h-5 text-accent" />
                      <h2 className="font-heading text-xl font-bold text-primary-foreground">
                        Blog
                        <span className="ml-2 text-sm font-normal text-primary-foreground/50">
                          ({matchedPosts.length})
                        </span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {matchedPosts.map(post => (
                        <Link
                          key={post.id}
                          to={`/blog/${post.id}`}
                          className="group bg-navy-dark/50 backdrop-blur-sm border border-primary-foreground/10 rounded-xl overflow-hidden hover:border-accent/40 hover:shadow-orange-glow hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="aspect-[4/3] md:aspect-video overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4">
                            <span className="inline-block px-2 py-0.5 bg-accent/10 text-accent text-xs font-body rounded-full border border-accent/20 mb-2">
                              {post.category}
                            </span>
                            <h3 className="font-heading font-bold text-sm text-primary-foreground group-hover:text-accent transition-colors line-clamp-2 mb-1">
                              {post.title}
                            </h3>
                            <p className="text-xs text-primary-foreground/50 line-clamp-2 font-body">
                              {post.excerpt}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {totalResults === 0 && (
                  <div className="text-center py-20">
                    <Search className="w-12 h-12 text-primary-foreground/20 mx-auto mb-4" />
                    <p className="font-heading text-xl font-bold text-primary-foreground/40 mb-2">
                      Nenhum resultado para "{searchParams.get('q')}"
                    </p>
                    <p className="font-body text-sm text-primary-foreground/30 mb-6">
                      Tente outros termos ou navegue pelas categorias.
                    </p>
                    <Link
                      to="/categorias"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan text-charcoal font-semibold rounded-lg hover:bg-cyan/90 transition-colors text-sm"
                    >
                      Ver Categorias <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Search;
