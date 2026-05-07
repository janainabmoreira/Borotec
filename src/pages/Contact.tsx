import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
    const message = encodeURIComponent('Olá, BOROTEC Industrial! Gostaria de mais informações sobre seus produtos.');
    const url = `https://wa.me/5511932876195?text=${message}`;
    window.open(url, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      info: '(11) 4002-8922',
      action: 'tel:+551140028922'
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
      info: 'Av. Industrial, 1500 - Distrito Industrial, São Paulo, SP',
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

                <Button
                  variant="cta"
                  size="lg"
                  className="w-full btn-glow"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar via WhatsApp
                </Button>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-navy-dark/50 p-8 md:p-10 rounded-2xl border border-primary-foreground/10">
                  <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-6">
                    Envie uma Mensagem
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.12345678901234!2d-46.6388888!3d-23.5505556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAyLjAiUyA0NsKwMzgnMjAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
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
  );
};

export default Contact;
