import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Youtube } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';

const quickLinks = [
  { label: 'Início',    to: '/' },
  { label: 'Produtos',  to: '/produtos' },
  { label: 'Sobre Nós', to: '/sobre' },
  { label: 'Blog',      to: '/blog' },
  { label: 'Contato',   to: '/contato' },
];

const productLines = [
  { label: 'Linha T — Tubulações', to: '/categorias?linha=T' },
  { label: 'Linha M — Máquinas',   to: '/categorias?linha=M' },
  { label: 'Linha R — Robôs',      to: '/categorias?linha=R' },
  { label: 'Linha E — Especiais',  to: '/categorias?linha=E' },
];

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

      <div className="relative container-wide mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & Description */}
          <div className="lg:col-span-1 flex flex-col">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/assets/logo_borotec_b.png"
                alt="BOROTEC Industrial"
                className="h-32 w-auto object-contain"
              />
            </Link>
            <p className="font-body text-sm text-primary-foreground/55 leading-relaxed mb-6">
              Soluções completas em metrologia óptica industrial. Mais de 20 anos de experiência
              fornecendo equipamentos de alta tecnologia para inspeção industrial.
            </p>
            <div className="flex gap-3 mt-auto">
              <a
                href="#"
                aria-label="LinkedIn BOROTEC"
                className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary-foreground/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube BOROTEC"
                className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary-foreground/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-5 text-accent">
              Links Rápidos
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="font-body text-sm text-primary-foreground/55 hover:text-cyan transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan/40 rounded-full group-hover:bg-cyan transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-5 text-accent">
              Produtos
            </h4>
            <ul className="space-y-2.5">
              {productLines.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="font-body text-sm text-primary-foreground/55 hover:text-cyan transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan/40 rounded-full group-hover:bg-cyan transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-5 text-accent">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 bg-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-cyan" />
                </div>
                <span className="font-body text-sm text-primary-foreground/55 leading-relaxed">
                  Rua Quinze de Novembro, 212<br />
                  São Paulo/SP — 01013-000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 bg-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-cyan" />
                </div>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contato pelo WhatsApp"
                  className="font-body text-sm text-primary-foreground/55 hover:text-cyan transition-colors"
                >
                  (11) 93287-6195
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 bg-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-cyan" />
                </div>
                <a
                  href="mailto:vendas@borotec.com.br"
                  className="font-body text-sm text-primary-foreground/55 hover:text-cyan transition-colors"
                >
                  vendas@borotec.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Left — copyright + CNPJ */}
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p className="font-body text-xs text-primary-foreground/40">
                © {currentYear} BOROTEC Industrial. Todos os direitos reservados.
              </p>
              <p className="font-body text-xs text-primary-foreground/25">
                BOROTEC COMERCIO DE EQUIPAMENTOS LTDA - ME &nbsp;·&nbsp; CNPJ 64.768.532/0001-56
              </p>
            </div>

            {/* Center — Google rating badge */}
            <a
              href="https://www.google.com/search?q=BOROTEC+Industrial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Avaliações no Google"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 hover:border-primary-foreground/20 transition-colors"
            >
              {/* Google "G" colorido */}
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-body text-[10px] text-primary-foreground/50 mb-0.5">Avaliado no Google</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </a>

            {/* Right — links */}
            <div className="flex items-center gap-4">
              <Link
                to="/privacidade"
                className="font-body text-xs text-primary-foreground/40 hover:text-cyan transition-colors"
              >
                Política de Privacidade
              </Link>
              <span className="text-primary-foreground/20">·</span>
              <a
                href="https://transparencyreport.google.com/safe-browsing/search?url=borotec.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-primary-foreground/40 hover:text-cyan transition-colors"
              >
                Site Seguro
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
