import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Youtube } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-primary-foreground relative overflow-hidden">
      {/* Tech pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2306D6E1' fill-opacity='1'%3E%3Cpath d='M20 20h-4v-4h4v4zm0-8h-4V8h4v4zm8 8h-4v-4h4v4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container-wide mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/assets/logo_borotec_b.png"
                alt="BOROTEC Industrial"
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed mb-6">
              Soluções completas em metrologia óptica industrial. Mais de 20 anos de experiência
              fornecendo equipamentos de alta tecnologia para inspeção industrial.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-accent">Links Rápidos</h4>
            <ul className="space-y-3">
              {['Início', 'Produtos', 'Sobre Nós', 'Contato'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item === 'Início' ? '' : item === 'Sobre Nós' ? 'sobre' : item.toLowerCase()}`} 
                    className="font-body text-sm text-primary-foreground/60 hover:text-cyan transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-cyan/50 rounded-full group-hover:bg-cyan transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-accent">Produtos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Linha T — Tubulações', path: '/categorias?linha=T' },
                { label: 'Linha M — Máquinas',  path: '/categorias?linha=M' },
                { label: 'Linha R — Robôs',     path: '/categorias?linha=R' },
                { label: 'Linha E — Especiais', path: '/categorias?linha=E' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="font-body text-sm text-primary-foreground/60 hover:text-cyan transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-cyan/50 rounded-full group-hover:bg-cyan transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-accent">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-cyan" />
                </div>
                <span className="font-body text-sm text-primary-foreground/60">
                  Rua Quinze de Novembro, 212<br />
                  São Paulo/SP - 01013-000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-cyan" />
                </div>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contato pelo WhatsApp"
                  className="whatsapp-btn whatsapp-contato font-body text-sm text-primary-foreground/60 hover:text-cyan transition-colors"
                >
                  (11) 93287-6195
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-cyan" />
                </div>
                <a href="mailto:vendas@borotec.com.br" className="font-body text-sm text-primary-foreground/60 hover:text-cyan transition-colors">
                  vendas@borotec.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-body text-sm text-primary-foreground/40">
                © {currentYear} BOROTEC Industrial. Todos os direitos reservados.
              </p>
              <p className="font-body text-xs text-primary-foreground/25">
                BOROTEC COMERCIO DE EQUIPAMENTOS LTDA - ME &nbsp;·&nbsp; CNPJ 64.768.532/0001-56
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a
                href="https://transparencyreport.google.com/safe-browsing/search?url=borotec.com.br"
                target="_blank"
                rel="noopener noreferrer"
                title="Verificar status de segurança no Google Safe Browsing"
                aria-label="Selo Site Seguro — Google Safe Browsing"
              >
                <img
                  src="/assets/site-seguro.svg"
                  alt="Site Seguro — Google Safe Browsing"
                  className="h-11 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </a>
              <Link to="/privacidade" className="font-body text-sm text-primary-foreground/40 hover:text-cyan transition-colors">
                Política de Privacidade
              </Link>
              <a href="mailto:contato@borotec.com.br" className="font-body text-sm text-primary-foreground/40 hover:text-cyan transition-colors">
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />
    </footer>
  );
};

export default Footer;
