import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getWhatsAppUrl } from '@/config/whatsapp';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-heading text-xl font-bold text-primary-foreground mb-4 border-l-4 border-cyan pl-4">
      {title}
    </h2>
    <div className="font-body text-primary-foreground/70 leading-relaxed space-y-3 pl-4">
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade | BOROTEC Industrial</title>
        <meta name="description" content="Política de Privacidade da BOROTEC Industrial. Saiba como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD." />
        <link rel="canonical" href="https://borotec.com.br/privacidade" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-charcoal">
        <Header />

        <main className="pt-20">
          {/* Hero */}
          <section className="relative bg-charcoal py-16 md:py-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
            <div className="relative container-wide mx-auto px-4 md:px-8">
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
                <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
                <span>/</span>
                <span className="text-cyan">Política de Privacidade</span>
              </nav>
              <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground mb-4">
                Política de <span className="text-gradient">Privacidade</span>
              </h1>
              <p className="font-body text-primary-foreground/50 text-sm">
                Última atualização: 07 de maio de 2026
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
          </section>

          {/* Content */}
          <section className="section-padding bg-charcoal">
            <div className="container-wide mx-auto">
              <div className="max-w-3xl">

                <div className="mb-8 p-6 bg-navy-dark/50 rounded-xl border border-cyan/20 font-body text-primary-foreground/70 text-sm leading-relaxed">
                  A <strong className="text-primary-foreground">BOROTEC Industrial</strong> está comprometida com a transparência e a proteção dos seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações que você nos fornece, em conformidade com a <strong className="text-primary-foreground">Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
                </div>

                <Section title="1. Quem somos (Controlador dos Dados)">
                  <p>
                    <strong className="text-primary-foreground">BOROTEC Industrial</strong><br />
                    CNPJ: a confirmar<br />
                    Endereço: Rua Quinze de Novembro, 212 — São Paulo/SP — CEP 01013-000<br />
                    E-mail: <a href="mailto:contato@borotec.com.br" className="text-cyan hover:underline">contato@borotec.com.br</a><br />
                    Telefone: (11) 93287-6195
                  </p>
                </Section>

                <Section title="2. Quais dados coletamos">
                  <p>Coletamos apenas os dados estritamente necessários para atender sua solicitação:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong className="text-primary-foreground">Formulário de contato:</strong> nome, e-mail, telefone e empresa.</li>
                    <li><strong className="text-primary-foreground">WhatsApp:</strong> número de telefone e conteúdo da conversa iniciada por você.</li>
                    <li><strong className="text-primary-foreground">Navegação no site:</strong> dados de acesso coletados via cookies (Google Tag Manager / Google Analytics), como páginas visitadas, tempo de sessão, localização aproximada e dispositivo.</li>
                  </ul>
                  <p className="mt-3">Não coletamos dados sensíveis (saúde, biometria, origem racial, convicções religiosas ou políticas).</p>
                </Section>

                <Section title="3. Para que usamos seus dados">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Responder às suas solicitações de orçamento e informações sobre produtos.</li>
                    <li>Enviar comunicações comerciais relacionadas aos nossos produtos e serviços (somente com seu consentimento).</li>
                    <li>Analisar o desempenho do site e melhorar a experiência de navegação.</li>
                    <li>Cumprir obrigações legais e regulatórias.</li>
                  </ul>
                </Section>

                <Section title="4. Base legal para o tratamento">
                  <p>Tratamos seus dados com base nas seguintes hipóteses previstas na LGPD:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong className="text-primary-foreground">Execução de contrato ou pré-contrato</strong> — para responder solicitações de orçamento (art. 7º, V).</li>
                    <li><strong className="text-primary-foreground">Legítimo interesse</strong> — para análise de desempenho do site e melhoria dos nossos serviços (art. 7º, IX).</li>
                    <li><strong className="text-primary-foreground">Consentimento</strong> — para comunicações de marketing, quando aplicável (art. 7º, I).</li>
                  </ul>
                </Section>

                <Section title="5. Cookies e rastreamento">
                  <p>
                    Utilizamos o <strong className="text-primary-foreground">Google Tag Manager</strong> e o <strong className="text-primary-foreground">Google Analytics</strong> para coletar dados de navegação de forma agregada e anonimizada. Esses dados nos ajudam a entender como o site é usado e a melhorar o conteúdo.
                  </p>
                  <p>
                    Você pode desativar os cookies a qualquer momento nas configurações do seu navegador. Também é possível optar por não ser rastreado pelo Google Analytics instalando o <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">complemento de desativação do Google Analytics</a>.
                  </p>
                </Section>

                <Section title="6. Compartilhamento de dados">
                  <p>Não vendemos, alugamos ou cedemos seus dados a terceiros. Podemos compartilhá-los apenas com:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong className="text-primary-foreground">Prestadores de serviços:</strong> plataformas de e-mail (Web3Forms), análise (Google Analytics) e atendimento (WhatsApp/Meta), que atuam como operadores sob nossas instruções.</li>
                    <li><strong className="text-primary-foreground">Autoridades públicas:</strong> quando exigido por lei ou ordem judicial.</li>
                  </ul>
                </Section>

                <Section title="7. Por quanto tempo armazenamos seus dados">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Dados de contato e orçamento: pelo tempo necessário para concluir o atendimento e pelo prazo legal aplicável (mínimo 5 anos para fins fiscais).</li>
                    <li>Dados de navegação (cookies): conforme os prazos definidos pelas ferramentas do Google (geralmente até 26 meses).</li>
                  </ul>
                </Section>

                <Section title="8. Seus direitos como titular (LGPD)">
                  <p>Você tem direito a:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Confirmar se tratamos seus dados pessoais.</li>
                    <li>Acessar os dados que temos sobre você.</li>
                    <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                    <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                    <li>Revogar o consentimento dado a qualquer momento.</li>
                    <li>Solicitar a portabilidade dos seus dados.</li>
                    <li>Apresentar reclamação à <strong className="text-primary-foreground">ANPD</strong> (Autoridade Nacional de Proteção de Dados).</li>
                  </ul>
                  <p className="mt-3">
                    Para exercer qualquer um desses direitos, entre em contato pelo e-mail{' '}
                    <a href="mailto:contato@borotec.com.br" className="text-cyan hover:underline">contato@borotec.com.br</a>.
                    Responderemos em até 15 dias úteis.
                  </p>
                </Section>

                <Section title="9. Segurança dos dados">
                  <p>
                    Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou destruição, incluindo transmissão via HTTPS e controle de acesso restrito às informações de contato recebidas.
                  </p>
                </Section>

                <Section title="10. Alterações nesta política">
                  <p>
                    Esta Política de Privacidade pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página, com a data da última atualização indicada no topo. Recomendamos revisá-la ocasionalmente.
                  </p>
                </Section>

                <Section title="11. Contato">
                  <p>
                    Dúvidas sobre esta política ou sobre o tratamento dos seus dados? Fale conosco:
                  </p>
                  <p className="mt-2">
                    <strong className="text-primary-foreground">E-mail:</strong>{' '}
                    <a href="mailto:contato@borotec.com.br" className="text-cyan hover:underline">contato@borotec.com.br</a><br />
                    <strong className="text-primary-foreground">WhatsApp:</strong>{' '}
                    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="Contato pelo WhatsApp" className="text-cyan hover:underline">(11) 93287-6195</a>
                  </p>
                </Section>

              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
