import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { products } from '@/data/products';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

const FeaturedProductsSection = () => {
  // Selecionar 1 produto de cada linha diferente para destaque
  const featuredProducts = [
    products.find(p => p.category === 'Linha T - Tubulações'),
    products.find(p => p.category === 'Linha R - Robôs'),
    products.find(p => p.category === 'Linha M - Máquinas'),
    products.find(p => p.category === 'Linha E - Especiais'),
  ].filter(Boolean).slice(0, 4);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/5 to-transparent" />

      <div className="relative container-wide mx-auto">
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent border border-accent/20 font-heading font-semibold text-sm rounded-full mb-4">
                Nossos Produtos
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-4">
                Produtos em <span className="text-gradient">Destaque</span>
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-xl">
                Conheça nossa linha completa de equipamentos para inspeção industrial de alta precisão.
              </p>
            </div>
            
            <Button variant="outline" className="mt-6 md:mt-0 group" asChild>
              <Link to="/produtos">
                Ver Todos os Produtos
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <AnimateOnScroll key={product.id} animation="fade-up" delay={index * 100}>
              <ProductCard product={product} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
