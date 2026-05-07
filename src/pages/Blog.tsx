import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'importancia-inspecao-tubulacoes',
    title: 'A Importância da Inspeção de Tubulações na Indústria',
    excerpt: 'Descubra como a inspeção regular de tubulações pode prevenir acidentes, reduzir custos de manutenção e aumentar a vida útil dos equipamentos industriais.',
    category: 'Manutenção',
    date: '2024-01-15',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop'
  },
  {
    id: 'como-escolher-boroscopio',
    title: 'Como Escolher o Boroscópio Ideal para sua Aplicação',
    excerpt: 'Guia completo para ajudar você a selecionar o equipamento de inspeção visual correto, considerando diâmetro, comprimento e recursos necessários.',
    category: 'Guia de Compra',
    date: '2024-01-10',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a2aa?w=600&h=400&fit=crop'
  },
  {
    id: 'tecnologia-3d-inspecao',
    title: 'Tecnologia de Medição 3D em Inspeções Industriais',
    excerpt: 'Conheça os avanços da tecnologia de medição tridimensional e como ela está revolucionando a análise de defeitos em componentes industriais.',
    category: 'Tecnologia',
    date: '2024-01-05',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop'
  },
  {
    id: 'manutencao-preventiva-robos',
    title: 'Robôs de Inspeção: O Futuro da Manutenção Preventiva',
    excerpt: 'Como os robôs de inspeção estão transformando a manutenção de tubulações de grande porte e ambientes de difícil acesso.',
    category: 'Inovação',
    date: '2023-12-28',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop'
  },
  {
    id: 'certificacoes-atex-iecex',
    title: 'Certificações ATEX e IECEx: Segurança em Áreas Classificadas',
    excerpt: 'Entenda a importância das certificações de segurança para equipamentos de inspeção em ambientes com risco de explosão.',
    category: 'Segurança',
    date: '2023-12-20',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop'
  },
  {
    id: 'termografia-industrial',
    title: 'Termografia Industrial: Detectando Problemas Invisíveis',
    excerpt: 'Aprenda como a tecnologia de imagem térmica pode identificar falhas elétricas, mecânicas e estruturais antes que causem danos.',
    category: 'Tecnologia',
    date: '2023-12-15',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop'
  }
];

const Blog = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
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
              <Card 
                key={post.id} 
                className="group bg-card border-border/50 hover:border-cyan/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-cyan/5"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
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
                  <button className="mt-4 flex items-center gap-2 text-cyan font-medium group-hover:gap-3 transition-all">
                    Ler mais
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
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
  );
};

export default Blog;
