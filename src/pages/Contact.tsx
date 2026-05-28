import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGclidCapture } from '@/hooks/useGclidCapture';
import { useWhatsAppMessage } from '@/hooks/useWhatsAppMessage';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useUTMCapture } from '@/hooks/useUTMCapture';

const WEB3FORMS_ACCESS_KEY = '5925cc10-7d22-4eff-a5eb-242540505331';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const gclid = useGclidCapture();
  const utms = useUTMCapture();
  const { openWhatsApp } = useWhatsAppMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: 'Formulario_contato' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'Novo Contato pelo Site',
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Não informado',
          company: formData.company || 'Não informada',
          message: formData.message,
          ...(gclid && { gclid }),
          ...(utms.utm_source && { 'Origem (utm_source)': utms.utm_source }),
          ...(utms.utm_medium && { 'Mídia (utm_medium)': utms.utm_medium }),
          ...(utms.utm_campaign && { 'Campanha (utm_campaign)': utms.utm_campaign }),
          ...(utms.utm_term && { 'Termo (utm_term)': utms.utm_term }),
          ...(utms.utm_content && { 'Conteúdo (utm_content)': utms.utm_content }),
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error('Falha no envio');

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });

      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar a mensagem. Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    openWhatsApp('contato');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'Botao_Whatsapp_contato' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      info: '(11) 93287-6195',
      action: 'tel:+5511932876195'
    },
    {
      icon: Mail,
      title: 'E-mail',
      info: 'contato@borotec.com.br',
      action: 'mailto:contato@borotec.com.br'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      info: 'Rua Quinze de Novembro, 212 — São Paulo/SP, CEP 01013-000',
      action: '#map'
    },
    {
      icon: Clock,
      title: 'Horário',
      info: 'Seg - Sex: 8h às 18h',
      action: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>Fale Conosco | BOROTEC Industrial</title>
        <meta name="description" content="Entre em contato com a BOROTEC Industrial. Solicite orçamento de equipamentos de inspeção industrial por formulário, e-mail ou WhatsApp." />
        <link rel="canonical" href="https://borotec.com.br/contato" />
        <meta property="og:title" content="Fale Conosco | BOROTEC Industrial" />
        <meta property="og:description" content="Entre em contato com a BOROTEC Industrial para orçamentos e informações sobre equipamentos de inspeção industrial." />
        <meta property="og:url" content="https://borotec.com.br/contato" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://borotec.com.br/og-borotec.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fale Conosco | BOROTEC Industrial" />
        <meta name="twitter:description" content="Entre em contato com a BOROTEC Industrial para orçamentos e informações sobre equipamentos de inspeção industrial." />
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
                <span className="text-cyan">Contato</span>
              </nav>
              
              <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground mb-6">
                Entre em <span className="text-gradient">Contato</span>
              </h1>
              <p className="font-body text-lg text-primary-foreground/60">
                Estamos prontos para atender suas necessidades. Fale com nossa equipe 
                de especialistas e descubra a solução ideal para sua empresa.
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
        </section>

        {/* Contact Content */}
        <section className="section-padding bg-charcoal">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-6">
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="bg-navy-dark/50 p-5 rounded-xl border border-primary-foreground/10 hover:border-cyan/30 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-cyan" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-primary-foreground mb-1">
                            {item.title}
                          </h3>
                          {item.action ? (
                            <a 
                              href={item.action} 
                              className="font-body text-sm text-primary-foreground/60 hover:text-cyan transition-colors"
                            >
                              {item.info}
                            </a>
                          ) : (
                            <p className="font-body text-sm text-primary-foreground/60">{item.info}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="whatsapp" size="lg" className="w-full whatsapp-btn whatsapp-contato" onClick={handleWhatsApp} aria-label="Falar via WhatsApp">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Fale com Especialista
                </Button>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-navy-dark/50 p-8 md:p-10 rounded-2xl border border-primary-foreground/10">
                  <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-6">
                    Envie uma Mensagem
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="utm_source" value={utms.utm_source} />
                    <input type="hidden" name="utm_medium" value={utms.utm_medium} />
                    <input type="hidden" name="utm_campaign" value={utms.utm_campaign} />
                    <input type="hidden" name="utm_term" value={utms.utm_term} />
                    <input type="hidden" name="utm_content" value={utms.utm_content} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-sm font-medium text-primary-foreground mb-2">
                          Nome Completo *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Seu nome"
                          required
                          className="h-12 bg-charcoal border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-cyan"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-medium text-primary-foreground mb-2">
                          E-mail *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu@email.com"
                          required
                          className="h-12 bg-charcoal border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-cyan"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-sm font-medium text-primary-foreground mb-2">
                          Telefone
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                          className="h-12 bg-charcoal border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-cyan"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-medium text-primary-foreground mb-2">
                          Empresa
                        </label>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Nome da empresa"
                          className="h-12 bg-charcoal border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-cyan"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-sm font-medium text-primary-foreground mb-2">
                        Mensagem *
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Descreva sua necessidade ou dúvida..."
                        required
                        rows={5}
                        className="resize-none bg-charcoal border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-cyan"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Enviando...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section id="map" className="h-96 bg-navy-dark/50 relative">
          <div className="absolute top-0 left-0 right-0 h-px glow-line" />
          <iframe
            src="https://maps.google.com/maps?q=Rua+Quinze+de+Novembro,+212,+S%C3%A3o+Paulo,+SP,+01013-000,+Brasil&output=embed&hl=pt-BR&z=17"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização BOROTEC Industrial"
          />
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default Contact;
