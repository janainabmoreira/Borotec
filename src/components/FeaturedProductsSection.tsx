import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';
import { IconTubulacao, IconRobo, IconMaquina, IconEspecial, IconPoco, IconAltura, IconHospital } from '@/components/LineIcons';

/* ---------- dados das linhas ---------- */

const applications = [
  { label: 'Tubulações e Dutos',       badge: 'Linha T',  description: 'Boroscópios e endoscópios para tubulações industriais de todos os diâmetros, da inspeção de esgoto a oleodutos.',         path: '/linha-t',  Icon: IconTubulacao, bar: 'from-cyan/60'        },
  { label: 'Acesso Autônomo em Dutos', badge: 'Linha R',  description: 'Robôs de inspeção autopropelidos para grandes tubulações e ambientes de difícil acesso.',                                 path: '/linha-r',  Icon: IconRobo,      bar: 'from-blue-400/60'  },
  { label: 'Máquinas e Motores',       badge: 'Linha M',  description: 'Endoscópios industriais para inspeção interna de motores, turbinas, compressores e válvulas.',                            path: '/linha-m',  Icon: IconMaquina,   bar: 'from-accent/60'    },
  { label: 'Aplicações Especiais',     badge: 'Linha E',  description: 'Medição 3D, termografia, UV, ATEX para área classificada e operação em alta temperatura.',                                path: '/linha-e',  Icon: IconEspecial,  bar: 'from-violet-400/60'},
  { label: 'Poços e Subaquático',      badge: 'Linha P',  description: 'Sistemas de câmera para inspeção em poços artesianos, poços de petróleo e ambientes subaquáticos.',                      path: '/linha-p',  Icon: IconPoco,      bar: 'from-emerald-400/60'},
  { label: 'Altura e Difícil Alcance', badge: 'Linha TC', description: 'Câmeras telescópicas para inspeção de estruturas em altura, coberturas e locais inacessíveis.',                          path: '/linha-tc', Icon: IconAltura,    bar: 'from-orange-400/60'},
  { label: 'Vias aéreas e equipamentos médicos', badge: 'Linha H', description: 'Videolaringoscópios, boroscópios e câmeras flexíveis para procedimentos clínicos, intubação de vias aéreas, inspeção de equipamentos hospitalares e manutenção médica.', path: '/linha-h', Icon: IconHospital, bar: 'from-emerald-400/60'},
];

/* ---------- componente ---------- */

const FeaturedProductsSection = () => (
  <section className="relative py-20 md:py-28 bg-background overflow-hidden">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-3xl" />
    </div>

    <div className="relative container-wide mx-auto px-4 md:px-8">
      <AnimateOnScroll animation="fade-up">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold font-body uppercase tracking-widest mb-5">
            O que você precisa inspecionar?
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-foreground mb-4 leading-tight">
            Encontre a <span className="text-gradient">solução certa</span>
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
            Selecione a aplicação para conhecer os equipamentos ideais para sua necessidade.
          </p>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app, i) => (
          <AnimateOnScroll key={app.path} animation="fade-up" delay={i * 70}>
            <Link
              to={app.path}
              className="group relative flex flex-col h-full bg-card rounded-2xl border border-border hover:border-cyan/40 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(6,214,225,0.12)] transition-all duration-300 overflow-hidden shadow-sm"
            >
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${app.bar} to-transparent opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div className="flex flex-col flex-1 p-6 pt-7">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0 text-cyan group-hover:bg-cyan/20 transition-colors">
                    <app.Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest font-body px-2.5 py-1 rounded-lg bg-cyan/10 text-cyan">
                    {app.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-cyan transition-colors mb-2 leading-snug">
                  {app.label}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                  {app.description}
                </p>

                <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-sm font-semibold font-heading text-accent">Ver produtos</span>
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                    <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProductsSection;
