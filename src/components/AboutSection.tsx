import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';
import aboutImage from '@/assets/about-company.webp';

const AboutSection = () => {
  const highlights = [
    'Suporte técnico em todo o Brasil',
    'Equipe técnica altamente especializada',
    'Atendimento personalizado para cada cliente',
    'Parcerias com as maiores indústrias do Brasil',
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan/5 to-transparent" />

      <div className="relative container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <AnimateOnScroll animation="slide-right">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border">
                <img
                  src={aboutImage}
                  alt="BOROTEC Industrial - Instalações"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-charcoal text-primary-foreground p-6 rounded-xl shadow-lg hidden md:block border border-cyan/20">
                <span className="block font-heading text-4xl font-black text-gradient">+20</span>
                <span className="font-body text-sm text-primary-foreground/70">Anos de Experiência</span>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-cyan/30 rounded-2xl" />
            </div>
          </AnimateOnScroll>

          {/* Content */}
          <AnimateOnScroll animation="slide-left" delay={100}>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent border border-accent/20 font-heading font-semibold text-sm rounded-full mb-4">
                Sobre Nós
              </span>
              
              <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-6">
                Referência em Soluções de <span className="text-gradient">Inspeção Visual</span> Industrial
              </h2>
              
              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
                A BOROTEC Industrial é referência nacional em equipamentos de inspeção visual 
                e metrologia óptica. Desde nossa fundação, nos dedicamos a fornecer as melhores 
                soluções para indústrias que exigem precisão e qualidade.
              </p>
              
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Nossos endoscópios, videoscópios e boroscópios são selecionados com os mais altos
                padrões de tecnologia, garantindo durabilidade, precisão e resultados confiáveis para
                manutenção preventiva e controle de qualidade.
              </p>

              <ul className="space-y-4 mb-8">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 bg-cyan/10 rounded-full flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                      <CheckCircle className="w-4 h-4 text-cyan" />
                    </div>
                    <span className="font-body text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Button variant="default" size="lg" className="group" asChild>
                <Link to="/sobre">
                  Conheça Nossa História
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
