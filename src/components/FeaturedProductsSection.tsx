import { Link } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';
import { useProductLines } from '@/hooks/useProductLines';
import { ICON_MAP } from '@/lib/iconMap';
import { getAccentClasses } from '@/lib/accentColors';

/* ---------- componente ---------- */

const FeaturedProductsSection = () => {
  const { lines } = useProductLines();
  // Só a seção "Boroscópios" aparece na Home por enquanto — seções novas
  // (Termografia, etc.) ganham seu próprio destaque quando fizer sentido.
  const applications = lines.filter((l) => l.section_slug === 'boroscopios').map((l) => ({
    label: l.name,
    badge: l.badge,
    description: l.card_description,
    path: l.path,
    Icon: ICON_MAP[l.icon_name] ?? Wrench,
    bar: getAccentClasses(l.accent).barFrom,
  }));

  return (
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
};

export default FeaturedProductsSection;
