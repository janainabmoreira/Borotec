import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight, ChevronDown, Share2, Link2, Check } from 'lucide-react';
import { blogPosts } from '@/data/blog';

const BlogPost = () => {
  const { postId } = useParams();
  const post = blogPosts.find((p) => p.id === postId);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-primary-foreground mb-4">
            Artigo não encontrado
          </h1>
          <Button variant="cta" asChild>
            <Link to="/blog">Voltar ao Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const postUrl = `https://borotec.com.br/blog/${post.id}`;
  const currentIndex = blogPosts.findIndex((p) => p.id === postId);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${post.title} — ${postUrl}`)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'BOROTEC Industrial' },
    publisher: {
      '@type': 'Organization',
      name: 'BOROTEC Industrial',
      url: 'https://borotec.com.br',
    },
    url: postUrl,
  };

  const faqSchema = post.faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://borotec.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://borotec.com.br/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | BOROTEC Industrial</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={post.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <div className="min-h-screen bg-charcoal">
        <Header />

        <main className="pt-24 pb-16">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 mb-8">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/50">
              <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/blog" className="hover:text-cyan transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-cyan line-clamp-1">{post.title}</span>
            </nav>
          </div>

          {/* Hero image */}
          <div className="container mx-auto px-4 mb-10">
            <div className="w-full aspect-[19/10] overflow-hidden rounded-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Article content */}
          <article className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-primary-foreground/50">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1 text-sm text-primary-foreground/50">
                <Clock className="w-4 h-4" />
                {post.readTime} de leitura
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-primary-foreground/60 mb-8 leading-relaxed border-l-4 border-cyan pl-4">
              {post.excerpt}
            </p>

            {/* Share bar */}
            <div className="flex items-center gap-3 mb-10 pb-8 border-b border-primary-foreground/10">
              <span className="flex items-center gap-1.5 text-sm text-primary-foreground/40 font-body">
                <Share2 className="w-4 h-4" /> Compartilhar:
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg text-xs font-medium hover:bg-green-600/30 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg text-xs font-medium hover:bg-blue-600/30 transition-colors"
              >
                LinkedIn
              </a>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-primary-foreground/10 text-primary-foreground/60 border border-primary-foreground/20 rounded-lg text-xs font-medium hover:bg-primary-foreground/20 transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3 h-3 text-cyan" /> : <Link2 className="w-3 h-3" />}
                {copied ? 'Copiado!' : 'Copiar link'}
              </button>
            </div>

            {/* Article body */}
            <div
              className="prose prose-invert prose-cyan max-w-none text-primary-foreground/80 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n\n')
                  .map((block) => {
                    if (block.startsWith('## ')) {
                      return `<h2 class="text-2xl font-bold text-primary-foreground mt-10 mb-4">${block.slice(3)}</h2>`;
                    }
                    if (block.startsWith('### ')) {
                      return `<h3 class="text-xl font-semibold text-primary-foreground mt-8 mb-3">${block.slice(4)}</h3>`;
                    }
                    if (block.startsWith('- ') || block.includes('\n- ')) {
                      const items = block
                        .split('\n')
                        .filter((l) => l.startsWith('- '))
                        .map((l) => `<li>${l.slice(2)}</li>`)
                        .join('');
                      return `<ul class="list-disc pl-6 space-y-1">${items}</ul>`;
                    }
                    if (block.includes('|')) {
                      const rows = block.trim().split('\n').filter((r) => !r.match(/^\|[-| ]+\|$/));
                      const [header, ...body] = rows;
                      const th = header
                        .split('|')
                        .filter(Boolean)
                        .map((c) => `<th class="px-4 py-2 text-left font-semibold text-primary-foreground border-b border-primary-foreground/10">${c.trim()}</th>`)
                        .join('');
                      const trs = body
                        .map((row) => {
                          const tds = row
                            .split('|')
                            .filter(Boolean)
                            .map((c) => `<td class="px-4 py-2 text-primary-foreground/70">${c.trim().replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-cyan hover:underline transition-colors">$1</a>')}</td>`)
                            .join('');
                          return `<tr class="border-b border-primary-foreground/5">${tds}</tr>`;
                        })
                        .join('');
                      return `<div class="overflow-x-auto my-4"><table class="w-full text-sm bg-navy-dark/30 rounded-xl overflow-hidden"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`;
                    }
                    if (block.startsWith('**') && block.includes(':**')) {
                      return `<p class="text-primary-foreground/80">${block
                        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary-foreground">$1</strong>')
                        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-cyan hover:underline transition-colors">$1</a>')}</p>`;
                    }
                    return `<p class="text-primary-foreground/75 leading-relaxed">${block
                      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary-foreground">$1</strong>')
                      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-cyan hover:underline transition-colors">$1</a>')}</p>`;
                  })
                  .join('\n'),
              }}
            />

            {/* FAQ Accordion */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-6">
                  Perguntas Frequentes
                </h2>
                <div className="space-y-3">
                  {post.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-navy-dark/50 border border-primary-foreground/10 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                      >
                        <span className="font-heading font-semibold text-sm md:text-base text-primary-foreground">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-cyan flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-sm text-primary-foreground/70 leading-relaxed border-t border-primary-foreground/10 pt-4 font-body">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 p-6 bg-navy-dark/50 border border-cyan/20 rounded-2xl text-center">
              <p className="font-heading font-bold text-lg text-primary-foreground mb-2">
                Precisa de um boroscópio para sua operação?
              </p>
              <p className="text-sm text-primary-foreground/60 mb-4 font-body">
                Nossa equipe técnica indica o equipamento ideal para cada aplicação.
              </p>
              <Button variant="cta" asChild>
                <Link to="/contato">Falar com um Especialista</Link>
              </Button>
            </div>

            {/* Prev / Next navigation */}
            <div className="mt-10 pt-8 border-t border-primary-foreground/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.id}`}
                  className="group flex flex-col gap-1 p-4 bg-navy-dark/30 border border-primary-foreground/10 rounded-xl hover:border-cyan/30 transition-colors"
                >
                  <span className="flex items-center gap-1 text-xs text-primary-foreground/40 font-body">
                    <ArrowLeft className="w-3 h-3" /> Anterior
                  </span>
                  <span className="text-sm font-heading font-semibold text-primary-foreground group-hover:text-cyan transition-colors line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div />}

              {nextPost && (
                <Link
                  to={`/blog/${nextPost.id}`}
                  className="group flex flex-col gap-1 p-4 bg-navy-dark/30 border border-primary-foreground/10 rounded-xl hover:border-cyan/30 transition-colors sm:text-right"
                >
                  <span className="flex items-center gap-1 text-xs text-primary-foreground/40 font-body sm:justify-end">
                    Próximo <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-sm font-heading font-semibold text-primary-foreground group-hover:text-cyan transition-colors line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>

            <div className="mt-6">
              <Link
                to="/blog"
                className="flex items-center gap-2 text-cyan hover:gap-3 transition-all font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Ver todos os artigos
              </Link>
            </div>
          </article>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="container mx-auto px-4 mt-16 max-w-5xl">
              <div className="border-t border-primary-foreground/10 pt-12">
                <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-8">
                  Leia também
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      to={`/blog/${related.id}`}
                      className="group bg-navy-dark/50 border border-primary-foreground/10 rounded-xl overflow-hidden hover:border-cyan/30 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="aspect-[19/10] overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <span className="inline-block px-2 py-0.5 bg-cyan/10 text-cyan text-xs font-body rounded-full border border-cyan/20 mb-2">
                          {related.category}
                        </span>
                        <h3 className="font-heading font-bold text-sm text-primary-foreground group-hover:text-cyan transition-colors line-clamp-2 mb-1">
                          {related.title}
                        </h3>
                        <span className="flex items-center gap-1 text-xs text-primary-foreground/40 font-body">
                          <Clock className="w-3 h-3" /> {related.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
