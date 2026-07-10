import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { usePrerenderReady } from '@/hooks/usePrerenderSignal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { CheckCircle, Target, Eye, Award } from 'lucide-react';
import BoroscopeIllustration from '@/components/BoroscopeIllustration';

const About = () => {
  const onPrerenderReady = usePrerenderReady();
  const values = [
    {
      icon: Target,
      title: 'Missão',
      description: 'Fornecer soluções de excelência em metrologia óptica industrial, contribuindo para a eficiência e qualidade dos processos de nossos clientes.'
    },
    {
      icon: Eye,
      title: 'Visão',
      description: 'Ser reconhecida como referência em equipamentos de inspeção industrial no Brasil, destacando-se pela tecnologia e qualidade no atendimento.'
    },
    {
      icon: Award,
      title: 'Valores',
      description: 'Qualidade, inovação, integridade, compromisso com o cliente e responsabilidade socioambiental em tudo o que fazemos.'
    }
  ];

  const timeline = [
    { year: '2003', title: 'Fundação', description: 'Início das atividades com foco em equipamentos ópticos.' },
    { year: '2008', title: 'Expansão', description: 'Ampliação da linha de produtos e abertura de filiais.' },
    { year: '2013', title: 'Certificação', description: 'Conquista de certificações ISO 9001 e ISO 14001.' },
    { year: '2018', title: 'Inovação', description: 'Ampliação do portfólio com videoscópios de alta tecnologia.' },
    { year: '2023', title: 'Consolidação', description: 'Consolidação como referência nacional em inspeção visual remota.' },
  ];

  return (
    <>
      <Helmet onChangeClientState={onPrerenderReady}>
        <title>Sobre a BOROTEC | +20 Anos em Metrologia Óptica Industrial</title>
        <meta name="description" content="Conheça a BOROTEC: empresa brasileira especializada em boroscópios e videoscópios industriais. Mais de 20 anos atendendo a indústria nacional com suporte técnico e soluções em inspeção visual remota." />
        <link rel="canonical" href="https://borotec.com.br/sobre" />
        <meta property="og:title" content="Sobre a BOROTEC | +20 Anos em Inspeção Visual Industrial" />
        <meta property="og:description" content="Empresa brasileira especializada em boroscópios e videoscópios industriais para inspeção visual remota. Fundada em 2003, com atendimento em todo o Brasil." />
        <meta property="og:url" content="https://borotec.com.br/sobre" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://borotec.com.br/og-borotec.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre a BOROTEC | +20 Anos em Inspeção Visual Industrial" />
        <meta name="twitter:description" content="Empresa brasileira especializada em boroscópios e videoscópios industriais para inspeção visual remota." />
        <meta name="twitter:image" content="https://borotec.com.br/og-borotec.jpg" />
      </Helmet>
    <div className="min-h-screen bg-charcoal">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-charcoal py-16 md:py-24 overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="relative container-wide mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
                <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
                <span>/</span>
                <span className="text-cyan">Sobre</span>
              </nav>
              
              <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground mb-6">
                Sobre a <span className="text-gradient">BOROTEC Industrial</span>
              </h1>
              <p className="font-body text-lg text-primary-foreground/60">
                Mais de duas décadas dedicadas à excelência em metrologia óptica industrial, 
                construindo parcerias sólidas e impulsionando a indústria brasileira.
              </p>
            </div>
          </div>
          
          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
        </section>

        {/* History */}
        <section className="section-padding bg-charcoal">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent border border-accent/20 font-heading font-semibold text-sm rounded-full mb-4">
                  Nossa História
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground mb-6">
                  Referência em <span className="text-gradient">inspeção industrial</span> no Brasil
                </h2>
                <p className="font-body text-lg text-primary-foreground/60 leading-relaxed mb-6">
                  Desde 2003, a BOROTEC Industrial fornece <strong className="text-primary-foreground/80">boroscópios, videoscópios e robôs de inspeção</strong> para indústrias de petróleo e gás, energia, saneamento, mineração e manufatura em todo o Brasil.
                </p>
                <p className="font-body text-primary-foreground/50 leading-relaxed mb-6">
                  Nossas soluções de <strong className="text-primary-foreground/60">inspeção sem desmontagem</strong> reduzem o tempo de parada, aumentam a segurança operacional e otimizam a <strong className="text-primary-foreground/60">manutenção preditiva</strong> — com equipamentos que inspecionam tubulações, dutos, motores, poços e estruturas de difícil acesso.
                </p>
                
                <ul className="space-y-3">
                  {['Assistência técnica e suporte pós-venda', 'Equipe técnica especializada', 'Representante oficial de marcas líderes mundiais', 'Consultoria técnica personalizada'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-cyan/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-cyan" />
                      </div>
                      <span className="font-body text-primary-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-primary-foreground/10 bg-[#07101E]">
                  <BoroscopeIllustration />
                </div>
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-cyan/30 rounded-2xl" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border border-accent/30 rounded-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="section-padding bg-navy-dark/30">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <div key={index} className="bg-charcoal/50 p-8 rounded-xl border border-primary-foreground/10 hover:border-cyan/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan/20 to-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-cyan" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-primary-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="font-body text-primary-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-charcoal">
          <div className="container-wide mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan/10 text-cyan border border-cyan/20 font-heading font-semibold text-sm rounded-full mb-4">
                Nossa Trajetória
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground">
                Marcos <span className="text-gradient">Importantes</span>
              </h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan via-accent to-cyan hidden md:block" />
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="font-heading font-black text-3xl text-gradient">{item.year}</span>
                      <h3 className="font-heading font-bold text-xl text-primary-foreground mt-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-primary-foreground/60">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="w-4 h-4 bg-cyan rounded-full border-4 border-charcoal shadow-glow z-10" />
                    
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-navy-dark/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px glow-line" />
          <div className="container-wide mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <span className="block font-heading text-4xl md:text-5xl font-black text-gradient">+20</span>
                <span className="font-body text-primary-foreground/50">Anos de Experiência</span>
              </div>
              <div>
                <span className="block font-heading text-4xl md:text-5xl font-black text-gradient">+500</span>
                <span className="font-body text-primary-foreground/50">Clientes Atendidos</span>
              </div>
              <div>
                <span className="block font-heading text-4xl md:text-5xl font-black text-gradient">+2000</span>
                <span className="font-body text-primary-foreground/50">Equipamentos Vendidos</span>
              </div>
              <div>
                <span className="block font-heading text-4xl md:text-5xl font-black text-gradient-cyan">98%</span>
                <span className="font-body text-primary-foreground/50">Satisfação dos Clientes</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
    </>
  );
};

export default About;
