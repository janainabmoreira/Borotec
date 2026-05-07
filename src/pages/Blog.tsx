import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';

const Blog = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog de Inspeção Industrial | BOROTEC</title>
        <meta name="description" content="Artigos, guias e novidades sobre boroscopia, inspeção visual remota, metrologia óptica e manutenção industrial. Conteúdo técnico da BOROTEC." />
        <link rel="canonical" href="https://borotec.com.br/blog" />
        <meta property="og:title" content="Blog de Inspeção Industrial | BOROTEC" />
        <meta property="og:description" content="Artigos técnicos sobre boroscopia, inspeção visual remota e manutenção industrial." />
        <meta property="og:url" content="https://borotec.com.br/blog" />
      </Helmet>
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-charcoal to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 text-cyan border-cyan">
              Blog BOROTEC
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Conhecimento em Inspeção Industrial
            </h1>
            <p className="text-lg text-muted-foreground">
              Artigos, guias e novidades sobre boroscopia, inspeção visual remota e manutenção industrial.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                <Card className="h-full bg-card border-border/50 hover:border-cyan/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-cyan/5">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-primary-foreground group-hover:text-cyan transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <span className="mt-4 flex items-center gap-2 text-cyan font-medium group-hover:gap-3 transition-all">
                      Ler mais
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-charcoal/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
              Receba Novidades
            </h2>
            <p className="text-muted-foreground mb-6">
              Inscreva-se para receber artigos exclusivos sobre inspeção industrial e lançamentos de produtos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="px-4 py-3 rounded-lg bg-background border border-border focus:border-cyan focus:outline-none text-primary-foreground w-full sm:w-80"
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
