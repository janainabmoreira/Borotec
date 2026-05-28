import { Helmet } from 'react-helmet-async';
import { useUTMCapture } from '@/hooks/useUTMCapture';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DifferentialsSection from '@/components/DifferentialsSection';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import AboutSection from '@/components/AboutSection';
import ClientsSection from '@/components/ClientsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Borotec',
  url: 'https://borotec.com.br',
  inLanguage: 'pt-BR',
  description: 'Boroscópios e videoscópios industriais para inspeção visual remota.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://borotec.com.br/busca?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Borotec',
  description: 'Empresa brasileira especializada em boroscópios e videoscópios industriais para inspeção visual remota de tubulações e componentes.',
  url: 'https://borotec.com.br',
  telephone: '+55-11-93287-6195',
  email: 'contato@borotec.com.br',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Quinze de Novembro, 212',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01013-000',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -23.5505556,
    longitude: -46.6388888,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  sameAs: [
    'https://www.linkedin.com/company/borotec',
    'https://www.instagram.com/borotec',
  ],
};

const Index = () => {
  useUTMCapture();

  return (
    <>
      <Helmet>
        <title>BOROTEC | Boroscópios, Videoscópios e Robôs de Inspeção Industrial</title>
        <meta name="description" content="Boroscópios, videoscópios e robôs para inspeção industrial sem desmontagem. Sondas até 130m, câmera HD, gravação em vídeo, tela LCD, IP68 à prova d'água. Inspeção de tubulações, dutos, motores e poços. +20 anos. Todo o Brasil." />
        <link rel="canonical" href="https://borotec.com.br/" />
        <meta property="og:title" content="BOROTEC | Boroscópios, Videoscópios e Robôs de Inspeção Industrial" />
        <meta property="og:description" content="Boroscópios, videoscópios e robôs para inspeção industrial sem desmontagem. Sondas até 130m, câmera HD, gravação em vídeo, tela LCD, IP68 à prova d'água. Inspeção de tubulações, dutos, motores e poços. +20 anos. Todo o Brasil." />
        <meta property="og:url" content="https://borotec.com.br/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://borotec.com.br/og-borotec.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BOROTEC | Boroscópios, Videoscópios e Robôs de Inspeção Industrial" />
        <meta name="twitter:description" content="Boroscópios, videoscópios e robôs para inspeção industrial sem desmontagem. Sondas até 130m, câmera HD, gravação em vídeo, tela LCD, IP68 à prova d'água. Inspeção de tubulações, dutos, motores e poços. +20 anos. Todo o Brasil." />
        <meta name="twitter:image" content="https://borotec.com.br/og-borotec.jpg" />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <DifferentialsSection />
          <FeaturedProductsSection />
          <AboutSection />
          <ClientsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
