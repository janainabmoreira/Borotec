import { useUTMCapture } from '@/hooks/useUTMCapture';
import Seo from '@/seo/Seo';
import { STATIC_SEO } from '@/seo/routes';
import { useProductLines } from '@/hooks/useProductLines';
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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BOROTEC',
  url: 'https://borotec.com.br/',
  logo: 'https://borotec.com.br/assets/logo-borotec.webp',
  telephone: '+55-11-93287-6195',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Quinze de Novembro, 212',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01013-000',
    addressCountry: 'BR',
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
  // O snapshot do prerender espera as linhas chegarem do Supabase — os cards
  // de todas as abas de "O que você precisa inspecionar?" precisam estar no
  // HTML para o Google ver os links. (O <Seo /> espera o próprio <head>.)
  const { loading: loadingLines } = useProductLines();

  return (
    <>
      <Seo
        path="/"
        title={STATIC_SEO['/'].title}
        description={STATIC_SEO['/'].description}
        jsonLd={[websiteSchema, organizationSchema, localBusinessSchema]}
        ready={!loadingLines}
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <FeaturedProductsSection />
          <DifferentialsSection />
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
