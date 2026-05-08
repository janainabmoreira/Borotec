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

      {/* Blog Posts Grid */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                <Card className="h-full bg-navy-dark/50 border-primary-foreground/10 hover:border-cyan/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-cyan/5">
                  <div className="aspect-[19/10] overflow-hidden">
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
                        {post.readTime}
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
