import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight, ChevronDown,
  Share2, Link2, Check, Search, Tag, Send, X,
} from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { WHATSAPP_NUMBER } from '@/config/whatsapp';

const WEB3FORMS_ACCESS_KEY = '5925cc10-7d22-4eff-a5eb-242540505331';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const BlogPost = () => {
  const { postId } = useParams();
  const post = blogPosts.find((p) => p.id === postId);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [comment, setComment] = useState({ name: '', text: '' });
  const [commentSent, setCommentSent] = useState(false);
  const [sendingComment, setSendingComment] = useState(false);

  // All useMemo before early return (Rules of Hooks)
  const postUrl = useMemo(() =>
    post ? `https://borotec.com.br/blog/${post.id}` : '', [post]);

  const currentIndex = useMemo(() =>
    blogPosts.findIndex((p) => p.id === postId), [postId]);

  const prevPost = useMemo(() =>
    currentIndex > 0 ? blogPosts[currentIndex - 1] : null, [currentIndex]);

  const nextPost = useMemo(() =>
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null, [currentIndex]);

  const relatedPosts = useMemo(() =>
    post ? blogPosts.filter((p) => p.id !== post.id).slice(0, 3) : [], [post]);

  const categories = useMemo(() =>
    Array.from(new Set(blogPosts.map((p) => p.category))), []);

  const recentPosts = useMemo(() =>
    post ? blogPosts.filter((p) => p.id !== post.id).slice(0, 4) : [], [post]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return blogPosts.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Expensive HTML generation memoized — only recalculates when post changes, not on every keystroke
  const articleHtml = useMemo(() => {
    if (!post) return '';
    return post.content
      .split('\n\n')
      .map((block) => {
        if (block.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold text-primary-foreground mt-10 mb-4">${block.slice(3)}</h2>`;
        }
        if (block.startsWith('### ')) {
          return `<h3 class="text-xl font-semibold text-primary-foreground mt-8 mb-3">${block.slice(4)}</h3>`;
        }
        if (block.startsWith('- ') || block.includes('\n- ')) {
          const items = block.split('\n').filter((l) => l.startsWith('- '))
            .map((l) => `<li>${l.slice(2)}</li>`).join('');
          return `<ul class="list-disc pl-6 space-y-1">${items}</ul>`;
        }
        if (block.includes('|')) {
          const rows = block.trim().split('\n').filter((r) => !r.match(/^\|[-| ]+\|$/));
          const [header, ...body] = rows;
          const th = header.split('|').filter(Boolean)
            .map((c) => `<th class="px-4 py-2 text-left font-semibold text-primary-foreground border-b border-primary-foreground/10">${c.trim()}</th>`)
            .join('');
          const trs = body.map((row) => {
            const tds = row.split('|').filter(Boolean)
              .map((c) => `<td class="px-4 py-2 text-primary-foreground/70">${c.trim().replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-cyan hover:underline transition-colors">$1</a>')}</td>`)
              .join('');
            return `<tr class="border-b border-primary-foreground/5">${tds}</tr>`;
          }).join('');
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
      .join('\n');
  }, [post]);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.name.trim() || !comment.text.trim()) return;
    setSendingComment(true);
    const gclid = (document.getElementById('gclid') as HTMLInputElement)?.value || '';

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Blog] Comentário em: ${post.title}`,
          from_name: comment.name,
          message: comment.text,
          post_url: postUrl,
          ...(gclid && { gclid }),
        }),
      });
      setCommentSent(true);
      setComment({ name: '', text: '' });
    } finally {
      setSendingComment(false);
    }
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'BOROTEC Industrial' },
    publisher: { '@type': 'Organization', name: 'BOROTEC Industrial', url: 'https://borotec.com.br' },
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
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <div className="min-h-screen bg-charcoal">
        <Header />

        <main className="pt-24 pb-16">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 mb-6">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/50">
              <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/blog" className="hover:text-cyan transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-cyan line-clamp-1">{post.title}</span>
            </nav>
          </div>

          {/* Two-column layout */}
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10 items-start">

              {/* ── ARTICLE ── */}
              <article className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-sm text-primary-foreground/50">
                    <Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-primary-foreground/50">
                    <Clock className="w-4 h-4" /> {post.readTime} de leitura
                  </span>
                </div>

                <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground mb-5 leading-tight">
                  {post.title}
                </h1>

                <p className="text-lg text-primary-foreground/60 mb-7 leading-relaxed border-l-4 border-cyan pl-4">
                  {post.excerpt}
                </p>

                {/* Share bar */}
                <div className="flex items-center gap-3 mb-8 pb-7 border-b border-primary-foreground/10 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm text-primary-foreground/40 font-body">
                    <Share2 className="w-4 h-4" /> Compartilhar:
                  </span>
                  <a
                    href={whatsappUrl}
                    aria-label="Compartilhar no WhatsApp"
                    className="whatsapp-btn whatsapp-geral px-3 py-1.5 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 rounded-lg text-xs font-medium hover:bg-[#25D366]/30 transition-colors"
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

                {/* Article body — pre-computed, no recompute on search typing */}
                <div
                  className="prose prose-invert prose-cyan max-w-none text-primary-foreground/80 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: articleHtml }}
                />

                {/* FAQ Accordion */}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="mt-12">
                    <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-6">
                      Perguntas Frequentes
                    </h2>
                    <div className="space-y-3">
                      {post.faqs.map((faq, i) => (
                        <div key={i} className="bg-navy-dark/50 border border-primary-foreground/10 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                          >
                            <span className="font-heading font-semibold text-sm md:text-base text-primary-foreground">
                              {faq.q}
                            </span>
                            <ChevronDown className={`w-5 h-5 text-cyan flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
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

                {/* Comments */}
                <div className="mt-12">
                  <h2 className="font-heading text-xl font-bold text-primary-foreground mb-6">
                    Deixe sua dúvida ou comentário
                  </h2>
                  {commentSent ? (
                    <div className="p-5 bg-cyan/10 border border-cyan/30 rounded-xl text-cyan font-body text-sm">
                      Mensagem enviada! Nossa equipe responde em breve.
                    </div>
                  ) : (
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                      <input type="hidden" name="gclid" id="gclid" value="" />
                      <input
                        type="text"
                        placeholder="Seu nome"
                        value={comment.name}
                        onChange={(e) => setComment({ ...comment, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-cyan/50 transition-colors font-body text-sm"
                      />
                      <textarea
                        placeholder="Escreva seu comentário ou dúvida..."
                        value={comment.text}
                        onChange={(e) => setComment({ ...comment, text: e.target.value })}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-cyan/50 transition-colors font-body text-sm resize-none"
                      />
                      <button
                        type="submit"
                        disabled={sendingComment}
                        className="flex items-center gap-2 px-6 py-3 bg-cyan text-charcoal font-semibold rounded-xl hover:bg-cyan/90 transition-colors text-sm disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        {sendingComment ? 'Enviando...' : 'Enviar comentário'}
                      </button>
                    </form>
                  )}
                </div>

                {/* Prev / Next */}
                <div className="mt-10 pt-8 border-t border-primary-foreground/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link
                      to={`/blog/${prevPost.id}`}
                      onClick={scrollTop}
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
                      onClick={scrollTop}
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
                  <Link to="/blog" className="flex items-center gap-2 text-cyan hover:gap-3 transition-all font-medium text-sm">
                    <ArrowLeft className="w-4 h-4" /> Ver todos os artigos
                  </Link>
                </div>
              </article>

              {/* ── SIDEBAR ── */}
              <aside className="w-full lg:w-72 flex-shrink-0 space-y-6 lg:sticky lg:top-24">

                {/* Search */}
                <div className="bg-navy-dark/50 border border-primary-foreground/10 rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm text-primary-foreground mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4 text-cyan" /> Buscar no Blog
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Digite um termo ou frase..."
                      className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-cyan/50 transition-colors font-body text-xs"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="px-2 py-2 text-primary-foreground/40 hover:text-primary-foreground transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Resultados inline */}
                  {searchQuery.trim() && (
                    <div className="mt-3">
                      {searchResults.length === 0 ? (
                        <p className="text-xs text-primary-foreground/50 py-2 text-center font-body">
                          Nenhum artigo encontrado para<br />
                          <span className="text-primary-foreground/70 font-medium">"{searchQuery}"</span>
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          <p className="text-[10px] text-primary-foreground/40 font-body mb-2 uppercase tracking-wide">
                            {searchResults.length} {searchResults.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
                          </p>
                          {searchResults.map((result) => (
                            <li key={result.id}>
                              <Link
                                to={`/blog/${result.id}`}
                                onClick={() => { setSearchQuery(''); scrollTop(); }}
                                className="flex gap-2 group p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                              >
                                <img
                                  src={result.image}
                                  alt={result.title}
                                  className="w-10 h-10 object-cover rounded flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="text-xs font-heading font-semibold text-primary-foreground group-hover:text-cyan transition-colors line-clamp-2 leading-snug">
                                    {result.title}
                                  </p>
                                  <span className="text-[10px] text-cyan/70 font-body">{result.category}</span>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Categories — links para /blog?categoria=... */}
                <div className="bg-navy-dark/50 border border-primary-foreground/10 rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm text-primary-foreground mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-cyan" /> Categorias
                  </h3>
                  <ul className="space-y-1">
                    {categories.map((cat) => {
                      const count = blogPosts.filter((p) => p.category === cat).length;
                      return (
                        <li key={cat}>
                          <Link
                            to={`/blog?categoria=${encodeURIComponent(cat)}`}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-body transition-colors ${
                              post.category === cat
                                ? 'bg-cyan/10 text-cyan border border-cyan/20'
                                : 'text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                            }`}
                          >
                            {cat}
                            <span className="text-primary-foreground/30">{count}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Recent posts */}
                <div className="bg-navy-dark/50 border border-primary-foreground/10 rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm text-primary-foreground mb-4">
                    Artigos Recentes
                  </h3>
                  <ul className="space-y-4">
                    {recentPosts.map((recent) => (
                      <li key={recent.id}>
                        <Link
                          to={`/blog/${recent.id}`}
                          onClick={scrollTop}
                          className="flex gap-3 group"
                        >
                          <img
                            src={recent.image}
                            alt={recent.title}
                            className="w-14 h-14 object-cover rounded-lg flex-shrink-0 group-hover:opacity-80 transition-opacity"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-heading font-semibold text-primary-foreground group-hover:text-cyan transition-colors line-clamp-2 leading-snug">
                              {recent.title}
                            </p>
                            <span className="text-[10px] text-primary-foreground/40 font-body mt-0.5 block">
                              {recent.readTime}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-primary-foreground/10">
                <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-8">
                  Leia também
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      to={`/blog/${related.id}`}
                      onClick={scrollTop}
                      className="group bg-navy-dark/50 border border-primary-foreground/10 rounded-xl overflow-hidden hover:border-cyan/30 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="aspect-[4/3] md:aspect-[19/10] overflow-hidden">
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
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
