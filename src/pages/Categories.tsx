import { Helmet } from 'react-helmet-async';
import { usePrerenderSignal } from '@/hooks/usePrerenderSignal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Pipette, Bot, Cpu, Sparkles, Telescope, Drill } from 'lucide-react';
import { Link } from 'react-router-dom';
import categoryTubulacoes from '@/assets/category-tubulacoes.webp';
import categoryRobos from '@/assets/category-robos.webp';
import categoryMaquinas from '@/assets/category-maquinas.webp';
import categoryEspeciais from '@/assets/category-especiais.webp';
import categoryPocos from '@/assets/category-pocos.webp';
import categoryTelescopicos from '@/assets/category-telescopicos.webp';

const categoryInfo = [
  {
    id: 'Linha T - Tubulações',
    name: 'Linha T',
    subtitle: 'Tubulações e Dutos',
    description: 'Boroscópios e endoscópios especializados para inspeção de tubulações industriais de diversos diâmetros.',
    icon: Pipette,
    image: categoryTubulacoes,
    path: '/tubulacoes',
  },
  {
    id: 'Linha R - Robôs',
    name: 'Linha R',
    subtitle: 'Acesso Autônomo em Dutos',
    description: 'Robôs de inspeção autônomos para tubulações de grande porte e ambientes de difícil acesso.',
    icon: Bot,
    image: categoryRobos,
    path: '/linha-r',
  },
  {
    id: 'Linha M - Máquinas',
    name: 'Linha M',
    subtitle: 'Máquinas e Motores',
    description: 'Endoscópios industriais para inspeção de máquinas, motores e equipamentos mecânicos.',
    icon: Cpu,
    image: categoryMaquinas,
    path: '/linha-m',
  },
  {
    id: 'Linha E - Especiais',
    name: 'Linha E',
    subtitle: 'Aplicações Especiais',
    description: 'Equipamentos com funções especiais: medição 3D, termografia, UV, área classificada e alta temperatura.',
    icon: Sparkles,
    image: categoryEspeciais,
    path: '/linha-e',
  },
  {
    id: 'Linha P - Poços',
    name: 'Linha P',
    subtitle: 'Poços e Subaquático',
    description: 'Sistemas de inspeção para poços artesianos, poços de petróleo e aplicações subaquáticas.',
    icon: Drill,
    image: categoryPocos,
    path: '/linha-p',
  },
  {
    id: 'Linha TC - Telescópicos',
    name: 'Linha TC',
    subtitle: 'Altura e Difícil Alcance',
    description: 'Câmeras telescópicas para inspeção em altura e locais de difícil alcance.',
    icon: Telescope,
    image: categoryTelescopicos,
    path: '/linha-tc',
  },
];

const Categories = () => {
  usePrerenderSignal(true);
  return (
    <>
      <Helmet>
        <title>Boroscópios Industriais | BOROTEC Industrial</title>
        <meta name="description" content="Explore as linhas de boroscópios BOROTEC: Tubulações, Máquinas, Robôs e Especiais (ATEX, 3D, Termografia, UV). Soluções para cada necessidade de inspeção industrial." />
        <link rel="canonical" href="https://borotec.com.br/boroscopios" />
        <meta property="og:title" content="Boroscópios Industriais | BOROTEC Industrial" />
        <meta property="og:description" content="Explore as linhas de boroscópios BOROTEC: Tubulações, Máquinas, Robôs e Especiais (ATEX, 3D, Termografia, UV)." />
        <meta property="og:url" content="https://borotec.com.br/boroscopios" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://borotec.com.br/og-borotec.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Boroscópios Industriais | BOROTEC Industrial" />
        <meta name="twitter:description" content="Explore as linhas de boroscópios BOROTEC: Tubulações, Máquinas, Robôs e Especiais (ATEX, 3D, Termografia, UV)." />
        <meta name="twitter:image" content="https://borotec.com.br/og-borotec.jpg" />
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
                  <span className="text-cyan">Boroscópios</span>
                </nav>

                <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground mb-6">
                  Nossas <span className="text-gradient">Linhas de Boroscópios</span>
                </h1>
                <p className="font-body text-lg text-primary-foreground/60">
                  Explore nossas linhas de boroscópios e videoscópios industriais. Cada linha foi
                  desenvolvida para atender necessidades específicas da indústria.
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

                  return (
                    <Link
                      key={category.id}
                      to={category.path}
                      className="group"
                    >
                      <div className="h-full bg-navy-dark/50 backdrop-blur-sm border border-primary-foreground/10 rounded-xl overflow-hidden hover:border-cyan/40 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
                        {/* Image */}
                        <div className="aspect-[4/3] md:aspect-video overflow-hidden relative">
                          <img
                            src={category.image}
                            alt={`${category.name} — ${category.subtitle}`}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-colors duration-300" />
                          <div className="absolute top-3 left-3">
                            <div className="bg-charcoal/60 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                              <IconComponent className="w-5 h-5 text-cyan" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
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

export default Categories;
