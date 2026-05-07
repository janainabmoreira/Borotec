import { Cpu, Package, Headphones, Award } from 'lucide-react';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

const differentials = [
  {
    icon: Cpu,
    title: 'Alta Tecnologia 100% Nacional',
    description: 'Desenvolvemos e fabricamos equipamentos de ponta no Brasil, garantindo qualidade e suporte local.',
  },
  {
    icon: Package,
    title: 'Produtos à Pronta Entrega',
    description: 'Estoque completo para atender suas demandas com agilidade, sem longos prazos de importação.',
  },
  {
    icon: Headphones,
    title: 'Suporte Técnico Especializado',
    description: 'Equipe altamente qualificada disponível para treinamento, manutenção e assistência técnica.',
  },
  {
    icon: Award,
    title: '+20 Anos de Experiência',
    description: 'Duas décadas de atuação no mercado industrial brasileiro, construindo relações de confiança.',
  },
];

const DifferentialsSection = () => {
  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative container-wide mx-auto">
        <AnimateOnScroll animation="fade-up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan/10 text-cyan border border-cyan/20 font-heading font-semibold text-sm rounded-full mb-4">
            Por que escolher a BOROTEC?
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground mb-4">
            Nossos <span className="text-gradient">Diferenciais</span>
          </h2>
          <p className="font-body text-lg text-primary-foreground/60 max-w-2xl mx-auto">
            Excelência em cada detalhe para garantir a melhor solução em metrologia óptica industrial.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((item, index) => (
            <AnimateOnScroll key={index} animation="fade-up" delay={index * 100}>
              <div className="group relative p-8 bg-gradient-to-b from-primary/10 to-transparent rounded-2xl border border-primary-foreground/10 hover:border-cyan/30 transition-all duration-500 h-full">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                    <item.icon className="w-8 h-8 text-cyan" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-primary-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
