import { Helmet } from 'react-helmet-async';
import { usePrerenderSignal } from '@/hooks/usePrerenderSignal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Wrench, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProductLines } from '@/hooks/useProductLines';
import { ICON_MAP } from '@/lib/iconMap';
import { getAccentClasses } from '@/lib/accentColors';

// Página de índice de uma seção do menu (ex: /boroscopios, /termografia) —
// lista as linhas daquela seção em cards, no mesmo formato usado desde
// sempre em /boroscopios. Nova seção = automaticamente ganha essa mesma
// página, sem precisar de código novo.
const CategoryIndex = ({ sectionSlug }: { sectionSlug: string }) => {
  const { lines: allLines, loading } = useProductLines();
  const lines = allLines.filter((l) => l.section_slug === sectionSlug);
  usePrerenderSignal(!loading);

  const sectionName = lines[0]?.section_name ?? (sectionSlug === 'boroscopios' ? 'Boroscópios' : sectionSlug);
  const isBoroscopios = sectionSlug === 'boroscopios';

  const title = isBoroscopios ? 'Boroscópios Industriais | BOROTEC Industrial' : `${sectionName} | BOROTEC Industrial`;
  const description = isBoroscopios
    ? 'Explore as linhas de boroscópios BOROTEC: Tubulações, Máquinas, Robôs e Especiais (ATEX, 3D, Termografia, UV). Soluções para cada necessidade de inspeção industrial.'
    : `Explore as linhas de ${sectionName} da BOROTEC Industrial.`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://borotec.com.br/${sectionSlug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://borotec.com.br/${sectionSlug}`} />
        <meta property="og:type" content="website" />
        {isBoroscopios && (
          <>
            <meta property="og:image" content="https://borotec.com.br/og-borotec.jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="pt_BR" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="https://borotec.com.br/og-borotec.jpg" />
          </>
        )}
      </Helmet>

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
                  <span className="text-cyan">{sectionName}</span>
                </nav>

                {isBoroscopios ? (
                  <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground mb-6">
                    Nossas <span className="text-gradient">Linhas de Boroscópios</span>
                  </h1>
                ) : (
                  <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground mb-6">
                    Nossas Linhas de <span className="text-gradient">{sectionName}</span>
                  </h1>
                )}
                <p className="font-body text-lg text-primary-foreground/60">
                  {isBoroscopios
                    ? 'Explore nossas linhas de boroscópios e videoscópios industriais. Cada linha foi desenvolvida para atender necessidades específicas da indústria.'
                    : `Explore nossas linhas de ${sectionName.toLowerCase()}. Cada linha foi desenvolvida para atender necessidades específicas da indústria.`}
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
          </section>

          {/* Categories Grid */}
          <section className="section-padding bg-charcoal">
            <div className="container-wide mx-auto">
              {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-cyan animate-spin" /></div>
              ) : lines.length === 0 ? (
                <p className="text-center text-primary-foreground/40 font-body py-20">Nenhuma linha cadastrada nesta seção ainda.</p>
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {lines.map((line) => {
                  const IconComponent = ICON_MAP[line.icon_name] ?? Wrench;
                  const accent = getAccentClasses(line.accent);

                  return (
                    <Link
                      key={line.id}
                      to={line.path}
                      className="group"
                    >
                      <div className="h-full bg-navy-dark/50 backdrop-blur-sm border border-primary-foreground/10 rounded-xl overflow-hidden hover:border-cyan/40 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
                        {/* Image */}
                        <div className="aspect-[4/3] md:aspect-video overflow-hidden relative">
                          {line.image_url ? (
                            <>
                              <img
                                src={line.image_url}
                                alt={`${line.badge} — ${line.name}`}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-colors duration-300" />
                              <div className="absolute top-3 left-3">
                                <div className="bg-charcoal/60 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                                  <IconComponent className="w-5 h-5 text-cyan" />
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${accent.cardBgFrom} via-navy-dark to-charcoal`}>
                              <IconComponent className={`w-16 h-16 ${accent.iconTextMuted} transition-transform duration-500 group-hover:scale-110`} />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="font-heading text-xl font-bold text-primary-foreground group-hover:text-cyan transition-colors mb-1">
                            {line.badge}
                            <span className="text-base text-primary-foreground/50 font-normal ml-2">
                              {line.name}
                            </span>
                          </h3>

                          <p className="font-body text-sm text-primary-foreground/60 mb-4 leading-relaxed">
                            {line.card_description}
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
              )}
            </div>
          </section>

          {/* CTA */}
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
    </>
  );
};

export default CategoryIndex;
