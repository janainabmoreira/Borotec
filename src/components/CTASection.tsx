import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-navy-dark to-charcoal" />
      
      {/* Glowing elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Tech pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container-wide mx-auto px-4 md:px-8 text-center">
        <AnimateOnScroll animation="fade-up">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-6">
            Pronto para Elevar o Nível da sua{' '}
            <span className="text-gradient">Inspeção?</span>
          </h2>
        </AnimateOnScroll>
        
        <AnimateOnScroll animation="fade-up" delay={100}>
          <p className="font-body text-lg text-primary-foreground/60 max-w-2xl mx-auto mb-10">
            Entre em contato com nossa equipe de especialistas e descubra a solução 
            ideal para suas necessidades de metrologia óptica industrial.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/produtos">
                Ver Catálogo Completo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Top and bottom glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
};

export default CTASection;
