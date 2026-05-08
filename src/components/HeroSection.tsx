import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroVideo from '@/assets/hero-video.mp4';

const WHATSAPP_NUMBER = '5511932876195';
const WHATSAPP_MESSAGE = 'Olá! Gostaria de mais informações sobre os produtos da BOROTEC.';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?busca=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Multi-layer gradient overlay - mais sutil para mostrar o vídeo */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/30" />
      </div>

      {/* Tech pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306D6E1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative container-wide mx-auto px-4 md:px-8 pt-24 md:pt-20">
        <div className="max-w-4xl">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan/10 text-cyan border border-cyan/30 font-heading font-semibold text-xs md:text-sm rounded-full mb-4 md:mb-6">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              + 20 Anos de Excelência
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-7xl font-black text-primary-foreground leading-tight mb-4 md:mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Tecnologia de Ponta para{' '}
            <span className="text-gradient">Inspeção Industrial</span>
          </h1>

          <p className="font-body text-base md:text-xl text-primary-foreground/70 leading-relaxed mb-6 md:mb-10 max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Soluções completas em endoscopia e metrologia óptica para otimizar 
            seus processos de manutenção e controle de qualidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="cta" size="lg" className="btn-glow group" asChild>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({ event: 'whatsapp_hero_click' });
                }}
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                Fale no WhatsApp
              </a>
            </Button>
            
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/produtos">
                Ver Produtos
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center max-w-xl mt-8 md:mt-10 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos, categorias..."
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-l-xl text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-cyan/60 transition-colors font-body text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3.5 bg-cyan text-charcoal font-semibold rounded-r-xl hover:bg-cyan/90 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 pt-6 md:pt-8 border-t border-primary-foreground/10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <span className="block font-heading text-2xl md:text-5xl font-black text-gradient">+500</span>
              <span className="font-body text-[10px] md:text-sm text-primary-foreground/50">Clientes</span>
            </div>
            <div className="text-center">
              <span className="block font-heading text-2xl md:text-5xl font-black text-gradient">+2000</span>
              <span className="font-body text-[10px] md:text-sm text-primary-foreground/50">Equipamentos</span>
            </div>
            <div className="text-center">
              <span className="block font-heading text-2xl md:text-5xl font-black text-gradient-cyan">24/7</span>
              <span className="font-body text-[10px] md:text-sm text-primary-foreground/50">Suporte</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-cyan/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-cyan rounded-full" />
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
};

export default HeroSection;
