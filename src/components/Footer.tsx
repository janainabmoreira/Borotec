import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';

const quickLinks = [
  { label: 'Início',    to: '/' },
  { label: 'Sobre Nós', to: '/sobre' },
  { label: 'Blog',      to: '/blog' },
  { label: 'Produtos',  to: '/produtos' },
];

const productLines = [
  { label: 'Linha T — Tubulações', to: '/categorias?linha=T' },
  { label: 'Linha M — Máquinas',   to: '/categorias?linha=M' },
  { label: 'Linha R — Robôs',      to: '/categorias?linha=R' },
  { label: 'Linha E — Especiais',  to: '/categorias?linha=E' },
];

const navLink = "font-body text-xs text-primary-foreground/60 hover:text-cyan transition-colors inline-flex items-center gap-1.5 group";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" fill="#25D366" opacity="0.2" stroke="#25D366" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="w-7 h-7 rounded-full bg-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
    {children}
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2306D6E1' fill-opacity='1'%3E%3Cpath d='M20 20h-4v-4h4v4zm0-8h-4V8h4v4zm8 8h-4v-4h4v4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container-wide mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — logo+ícones à esquerda, texto à direita */}
          <div className="flex gap-5">
            {/* Esquerda: logo em cima, ícones sociais em baixo */}
            <div className="flex flex-col justify-between shrink-0">
              <Link to="/">
                <img
                  src="/assets/logo_borotec_b.png"
                  alt="BOROTEC Industrial"
                  className="h-20 w-auto object-contain"
                />
              </Link>
              <div className="flex gap-2 mt-4">
                <a href="#" aria-label="LinkedIn BOROTEC"
                  className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary-foreground/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a href="#" aria-label="YouTube BOROTEC"
                  className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary-foreground/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            {/* Direita: só o texto */}
            <p className="font-body text-xs text-primary-foreground/55 leading-relaxed pt-1">
              Especialistas em boroscópios e videoscópios industriais há mais de 20 anos.
              Atendimento personalizado para inspeção de tubulações, motores e dutos em todo o Brasil.
            </p>
          </div>

          {/* Col 2 — Links Rápidos */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-4 text-accent">
              Links Rápidos
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className={navLink}>
                    <span className="w-1 h-1 bg-cyan/40 rounded-full group-hover:bg-cyan transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Produtos */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-4 text-accent">
              Produtos
            </h4>
            <ul className="space-y-2.5">
              {productLines.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className={navLink}>
                    <span className="w-1 h-1 bg-cyan/40 rounded-full group-hover:bg-cyan transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Atendimento com ícones em círculo */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-4 text-accent">
              Atendimento
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <IconBadge><Clock className="w-3.5 h-3.5 text-cyan" /></IconBadge>
                <span className="font-body text-xs text-primary-foreground/60 leading-relaxed">
                  Segunda a Quinta: 8h às 18h<br />Sexta: 8h às 17h
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconBadge><MapPin className="w-3.5 h-3.5 text-cyan" /></IconBadge>
                <span className="font-body text-xs text-primary-foreground/60 leading-relaxed">
                  Rua Quinze de Novembro, 212<br />São Paulo/SP — 01013-000
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconBadge><Phone className="w-3.5 h-3.5 text-cyan" /></IconBadge>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
                  aria-label="Contato pelo WhatsApp"
                  className="font-body text-xs text-primary-foreground/60 hover:text-cyan transition-colors">
                  (11) 93287-6195
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <IconBadge><Mail className="w-3.5 h-3.5 text-cyan" /></IconBadge>
                <a href="mailto:vendas@borotec.com.br"
                  className="font-body text-xs text-primary-foreground/60 hover:text-cyan transition-colors">
                  vendas@borotec.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Left — copyright + CNPJ */}
            <div className="flex flex-col gap-0.5 text-center md:text-left">
              <p className="font-body text-xs text-primary-foreground/40">
                © {currentYear} BOROTEC Industrial. Todos os direitos reservados.
              </p>
              <p className="font-body text-[10px] text-primary-foreground/25">
                BOROTEC COMERCIO DE EQUIPAMENTOS LTDA - ME · CNPJ 64.768.532/0001-56
              </p>
            </div>

            {/* Center — selos */}
            <div className="flex items-center gap-3">
              <a href="https://www.google.com/search?q=BOROTEC+Industrial"
                target="_blank" rel="noopener noreferrer" aria-label="Avaliações no Google"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 hover:border-primary-foreground/25 transition-colors">
                <GoogleIcon />
                <div className="flex flex-col leading-none gap-1">
                  <span className="font-body text-[10px] text-primary-foreground/50">Avaliado no Google</span>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <StarIcon key={s} />)}</div>
                </div>
              </a>
              <a href="https://transparencyreport.google.com/safe-browsing/search?url=borotec.com.br"
                target="_blank" rel="noopener noreferrer"
                aria-label="Verificar segurança no Google Safe Browsing"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#25D366]/30 bg-[#25D366]/5 hover:border-[#25D366]/50 transition-colors">
                <ShieldIcon />
                <div className="flex flex-col leading-none gap-0.5">
                  <span className="font-body text-[10px] font-bold text-primary-foreground/70 tracking-wide uppercase">Site Seguro</span>
                  <span className="font-body text-[9px] text-[#25D366]/80">Google Safe Browsing</span>
                </div>
              </a>
            </div>

            {/* Right — links */}
            <div className="flex items-center gap-3">
              <Link to="/privacidade"
                className="font-body text-xs text-primary-foreground/40 hover:text-cyan transition-colors">
                Política de Privacidade
              </Link>
              <span className="text-primary-foreground/20 text-xs">·</span>
              <a href="mailto:contato@borotec.com.br"
                className="font-body text-xs text-primary-foreground/40 hover:text-cyan transition-colors">
                Fale Conosco
              </a>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px glow-line" />
    </footer>
  );
};

export default Footer;
