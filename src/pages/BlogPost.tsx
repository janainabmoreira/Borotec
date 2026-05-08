import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';

const BlogPost = () => {
  const { postId } = useParams();
  const post = blogPosts.find((p) => p.id === postId);

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

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

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
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-2xl">
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

            <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Link
                to="/blog"
                className="flex items-center gap-2 text-cyan hover:gap-3 transition-all font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Blog
              </Link>
              <Button variant="cta" asChild>
                <Link to="/contato">Fale com um Especialista</Link>
              </Button>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
