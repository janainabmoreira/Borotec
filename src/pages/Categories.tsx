import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
    <div className="min-h-screen bg-charcoal">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-charcoal py-16 md:py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

          <div className="relative container-wide mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
                <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
                <span>/</span>
                <span className="text-cyan">Categorias</span>
              </nav>

              <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground mb-6">
                Nossas <span className="text-gradient">Linhas de Produto</span>
              </h1>
              <p className="font-body text-lg text-primary-foreground/60">
                Explore nossas categorias de equipamentos de inspeção visual. Cada linha foi desenvolvida para atender necessidades específicas da indústria.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
        </section>

        {/* Categories Grid */}
        <section className="section-padding bg-charcoal">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categoryInfo.map((category) => {
                const IconComponent = category.icon;
                const productCount = getProductCount(category.id);

                return (
                  <Link
                    key={category.id}
                    to={`/produtos?categoria=${encodeURIComponent(category.id)}`}
                    className="group"
                  >
                    <div className="h-full bg-navy-dark/50 border border-primary-foreground/10 rounded-xl overflow-hidden hover:border-cyan/40 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
                      {/* Image */}
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-60`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/30 backdrop-blur-sm rounded-full p-4 border border-white/20">
                            <IconComponent className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className="bg-cyan/10 text-cyan border-cyan/30 text-xs font-body">
                            {productCount} {productCount === 1 ? 'produto' : 'produtos'}
                          </Badge>
                        </div>

                        <h3 className="font-heading text-xl font-bold text-primary-foreground group-hover:text-cyan transition-colors mb-1">
                          {category.name}
                          <span className="text-base text-primary-foreground/50 font-normal ml-2">
                            {category.subtitle}
                          </span>
                        </h3>

                        <p className="font-body text-sm text-primary-foreground/60 mb-4 leading-relaxed">
                          {category.description}
                        </p>

                        <div className="flex items-center gap-2 text-cyan text-sm font-medium group-hover:gap-3 transition-all">
                          Ver produtos
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-navy-dark/30">
          <div className="container-wide mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Não encontrou o que procura?
              </h2>
              <p className="font-body text-primary-foreground/60 mb-6">
                Nossa equipe técnica pode ajudar você a encontrar a solução ideal para sua aplicação.
              </p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-orange-glow"
              >
                Falar com Especialista
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
