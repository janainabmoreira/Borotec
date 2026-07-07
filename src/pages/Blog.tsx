import { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, X, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { DbBlogPost } from '@/types/database';
import { blogPosts as staticPosts } from '@/data/blog';

const staticAsDb: DbBlogPost[] = staticPosts.map((p) => ({
  id: p.id,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  author: 'Equipe BOROTEC',
  date: p.date,
  read_time: p.readTime,
  image: p.image,
  content: p.content,
  faqs: p.faqs ?? [],
  active: true,
  created_at: p.date,
  updated_at: p.date,
}));

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('categoria');
  const [blogPosts, setBlogPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('active', true)
      .order('date', { ascending: false })
      .then(({ data }) => {
        const fromDb = data ?? [];
        const dbIds = new Set(fromDb.map((p) => p.id));
        const merged = [
          ...fromDb,
          ...staticAsDb.filter((p) => !dbIds.has(p.id)),
        ].sort((a, b) => b.date.localeCompare(a.date));
        setBlogPosts(merged);
        setLoading(false);
      });
  }, []);

  const allCategories = useMemo(() =>
    Array.from(new Set(blogPosts.map((p) => p.category))), [blogPosts]);

  const filteredPosts = useMemo(() =>
    selectedCategory
      ? blogPosts.filter((p) => p.category === selectedCategory)
      : blogPosts,
    [blogPosts, selectedCategory]
  );

  const handleClearCategory = () => setSearchParams({}, { replace: true });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric',
    });

  return (
    <>
      <Helmet>
        <title>Blog de Inspeção Industrial | BOROTEC</title>
        <meta name="description" content="Artigos, guias e novidades sobre boroscopia, inspeção visual remota, metrologia óptica e manutenção industrial. Conteúdo técnico da BOROTEC." />
        <link rel="canonical" href="https://borotec.com.br/blog" />
        <meta property="og:title" content="Blog de Inspeção Industrial | BOROTEC" />
        <meta property="og:description" content="Artigos técnicos sobre boroscopia, inspeção visual remota e manutenção industrial." />
        <meta property="og:url" content="https://borotec.com.br/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://borotec.com.br/og-borotec.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog de Inspeção Industrial | BOROTEC" />
        <meta name="twitter:description" content="Artigos técnicos sobre boroscopia, inspeção visual remota e manutenção industrial." />
        <meta name="twitter:image" content="https://borotec.com.br/og-borotec.jpg" />
      </Helmet>
      <div className="min-h-screen bg-charcoal">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-charcoal relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          <div className="relative container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-4 text-cyan border-cyan">
                Blog BOROTEC
              </Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-primary-foreground mb-6">
                Conhecimento em <span className="text-gradient">Inspeção Industrial</span>
              </h1>
              <p className="text-lg text-primary-foreground/70">
                Artigos, guias e novidades sobre boroscopia, inspeção visual remota e manutenção industrial.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
        </section>

        {/* Category filter chips */}
        <section className="py-6 bg-charcoal border-b border-primary-foreground/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={handleClearCategory}
                className={`px-4 py-1.5 rounded-full text-sm font-body transition-colors ${
                  !selectedCategory
                    ? 'bg-cyan text-charcoal font-semibold'
                    : 'bg-primary-foreground/10 text-primary-foreground/60 hover:bg-primary-foreground/20 hover:text-primary-foreground'
                }`}
              >
                Todos
              </button>
              {allCategories.map((cat) => (
                <Link
                  key={cat}
                  to={`/blog?categoria=${encodeURIComponent(cat)}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-body transition-colors ${
                    selectedCategory === cat
                      ? 'bg-cyan text-charcoal font-semibold'
                      : 'bg-primary-foreground/10 text-primary-foreground/60 hover:bg-primary-foreground/20 hover:text-primary-foreground'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4">
            {loading && (
              <div className="flex justify-center py-24">
                <Loader2 className="w-8 h-8 text-cyan animate-spin" />
              </div>
            )}

            {/* Active filter label */}
            {!loading && selectedCategory && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-primary-foreground/50 text-sm font-body">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} em
                </span>
                <span className="px-3 py-1 bg-cyan/10 text-cyan text-sm rounded-full border border-cyan/20 font-body flex items-center gap-1.5">
                  {selectedCategory}
                  <button onClick={handleClearCategory} className="hover:opacity-70 transition-opacity">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {!loading && filteredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                  <Card className="h-full bg-navy-dark/50 border-primary-foreground/10 hover:border-cyan/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-cyan/5">
                    <div className="aspect-[4/3] md:aspect-[19/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-2 py-0.5 bg-cyan/10 text-cyan font-body text-xs font-medium rounded-full border border-cyan/20">
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl text-primary-foreground group-hover:text-cyan transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-primary-foreground/60 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-primary-foreground/40 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.read_time}
                        </span>
                      </div>
                      <span className="flex items-center gap-2 text-cyan font-medium group-hover:gap-3 transition-all">
                        Ler mais
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {!loading && filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="font-body text-lg text-primary-foreground/50 mb-4">
                  Nenhum post encontrado nesta categoria.
                </p>
                <button
                  onClick={handleClearCategory}
                  className="text-cyan hover:underline font-body text-sm"
                >
                  Ver todos os posts
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-navy-dark/30 border-t border-primary-foreground/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Receba Novidades
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Inscreva-se para receber artigos exclusivos sobre inspeção industrial e lançamentos de produtos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="px-4 py-3 rounded-lg bg-charcoal border border-primary-foreground/20 focus:border-cyan focus:outline-none text-primary-foreground placeholder:text-primary-foreground/30 w-full sm:w-80"
                />
                <button className="px-6 py-3 bg-cyan text-charcoal font-semibold rounded-lg hover:bg-cyan/90 transition-colors">
                  Inscrever-se
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
