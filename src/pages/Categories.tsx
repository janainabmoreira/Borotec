import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Pipette, Bot, Cpu, Sparkles, Telescope, Drill } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';

const categoryInfo = [
  {
    id: 'Linha T - Tubulações',
    name: 'Linha T',
    subtitle: 'Tubulações',
    description: 'Boroscópios e endoscópios especializados para inspeção de tubulações industriais de diversos diâmetros.',
    icon: Pipette,
    color: 'from-cyan to-blue-500',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop'
  },
  {
    id: 'Linha R - Robôs',
    name: 'Linha R',
    subtitle: 'Robôs',
    description: 'Robôs de inspeção autônomos para tubulações de grande porte e ambientes de difícil acesso.',
    icon: Bot,
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop'
  },
  {
    id: 'Linha M - Máquinas',
    name: 'Linha M',
    subtitle: 'Máquinas',
    description: 'Endoscópios industriais para inspeção de máquinas, motores e equipamentos mecânicos.',
    icon: Cpu,
    color: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a2aa?w=600&h=400&fit=crop'
  },
  {
    id: 'Linha E - Especiais',
    name: 'Linha E',
    subtitle: 'Especiais',
    description: 'Equipamentos com funções especiais: medição 3D, termografia, UV, área classificada e alta temperatura.',
    icon: Sparkles,
    color: 'from-yellow-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop'
  },
  {
    id: 'Linha P - Poços',
    name: 'Linha P',
    subtitle: 'Poços',
    description: 'Sistemas de inspeção para poços artesianos, poços de petróleo e aplicações subaquáticas.',
    icon: Drill,
    color: 'from-teal-500 to-cyan',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop'
  },
  {
    id: 'Linha TC - Telescópicos',
    name: 'Linha TC',
    subtitle: 'Telescópicos',
    description: 'Câmeras telescópicas para inspeção em altura e locais de difícil alcance.',
    icon: Telescope,
    color: 'from-indigo-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop'
  }
];

const Categories = () => {
  const getProductCount = (categoryId: string) => {
    return products.filter(p => p.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-charcoal to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 text-cyan border-cyan">
              Catálogo BOROTEC
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Nossas Linhas de Produtos
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore nossas categorias de equipamentos de inspeção visual. Cada linha foi desenvolvida para atender necessidades específicas da indústria.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryInfo.map((category) => {
              const IconComponent = category.icon;
              const productCount = getProductCount(category.id);
              
              return (
                <Link 
                  key={category.id} 
                  to={`/produtos?categoria=${encodeURIComponent(category.id)}`}
                >
                  <Card className="group h-full bg-card border-border/50 hover:border-cyan/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-cyan/5 cursor-pointer">
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-60`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <IconComponent className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {productCount} {productCount === 1 ? 'produto' : 'produtos'}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl text-primary-foreground group-hover:text-cyan transition-colors">
                        {category.name}
                        <span className="text-lg text-muted-foreground ml-2">
                          {category.subtitle}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4">
                        {category.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 text-cyan font-medium group-hover:gap-3 transition-all">
                        Ver produtos
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-charcoal/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
              Não encontrou o que procura?
            </h2>
            <p className="text-muted-foreground mb-6">
              Nossa equipe técnica pode ajudar você a encontrar a solução ideal para sua aplicação.
            </p>
            <Link 
              to="/contato"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan text-charcoal font-semibold rounded-lg hover:bg-cyan/90 transition-colors"
            >
              Falar com Especialista
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
