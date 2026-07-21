import { useState, useEffect, useMemo, useRef } from 'react';
import logoBorotec from '@/assets/logo-borotec-DJfYTfhm.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { DbProduct, DbBlogPost, DbLead } from '@/types/database';
import {
  Plus, Pencil, Trash2, LogOut, Package, Loader2,
  ToggleLeft, ToggleRight, ExternalLink, BookOpen,
  Users, ChevronDown, ChevronUp, Download, Mail, Phone, Building2,
  BarChart2, Eye, Globe, TrendingUp, RefreshCw, MapPin, Clock, MessageCircle, Send,
  CalendarIcon,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { addDays, startOfMonth, endOfMonth, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Tab = 'produtos' | 'blog' | 'leads' | 'analytics';

type PageView = {
  id: string;
  path: string;
  page_title: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  session_id: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  created_at: string;
};

type WaClick = {
  id: string;
  path: string;
  page_title: string | null;
  button_type: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  session_id: string | null;
  created_at: string;
};

// ---- Products tab ----
const ProductsTab = () => {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Excluir "${name}"? Esta ação não pode ser desfeita.`)) return;
    setDeletingId(id);
    await supabase.from('products').delete().eq('id', id);
    await fetchProducts();
    setDeletingId(null);
  };

  const handleToggleActive = async (product: DbProduct) => {
    await supabase.from('products').update({ active: !product.active }).eq('id', product.id);
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, active: !p.active } : p));
  };

  const categoryColor: Record<string, string> = {
    'Linha T - Tubulações': 'bg-cyan/15 text-cyan',
    'Linha R - Acesso Autônomo': 'bg-blue-500/15 text-blue-400',
    'Linha M - Máquinas e Motores': 'bg-purple-500/15 text-purple-400',
    'Linha E - Aplicações Especiais': 'bg-yellow-500/15 text-yellow-400',
    'Linha P - Poços e Subaquático': 'bg-teal-500/15 text-teal-400',
    'Linha TC - Altura e Difícil Acesso': 'bg-orange-500/15 text-orange-400',
  };

  const categorySlug: Record<string, string> = {
    'Linha T - Tubulações':               '/linha-t',
    'Linha R - Acesso Autônomo':          '/linha-r',
    'Linha M - Máquinas e Motores':       '/linha-m',
    'Linha E - Aplicações Especiais':     '/linha-e',
    'Linha P - Poços e Subaquático':      '/linha-p',
    'Linha TC - Altura e Difícil Acesso': '/linha-tc',
  };

  const productUrl = (p: { category: string; id: string }) =>
    `${categorySlug[p.category] ?? '/produtos'}/${p.id}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary-foreground flex items-center gap-2">
            <Package className="w-6 h-6 text-accent" />
            Produtos
          </h1>
          <p className="text-primary-foreground/50 text-sm mt-1">
            {products.length} produto{products.length !== 1 ? 's' : ''} cadastrado{products.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/admin/produtos/novo"
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white font-semibold text-sm rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Novo Produto
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cyan" /></div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-primary-foreground/10 rounded-2xl">
          <Package className="w-10 h-10 text-primary-foreground/20 mx-auto mb-3" />
          <p className="text-primary-foreground/40 text-sm">Nenhum produto cadastrado ainda.</p>
          <Link to="/admin/produtos/novo" className="inline-flex items-center gap-2 mt-4 text-sm text-accent hover:underline">
            <Plus className="w-4 h-4" /> Adicionar primeiro produto
          </Link>
        </div>
      ) : (
        <div className="bg-navy-dark/40 border border-primary-foreground/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary-foreground/10 text-primary-foreground/40 text-xs uppercase tracking-wide">
                <th className="text-left px-4 py-3 font-medium">Produto</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Linha</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Specs</th>
                <th className="text-center px-4 py-3 font-medium">Ativo</th>
                <th className="text-right px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-primary-foreground/5 hover:bg-primary-foreground/3 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-charcoal flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-primary-foreground/20" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-primary-foreground leading-tight">{p.name}</p>
                        <p className="text-primary-foreground/40 text-xs font-mono">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor[p.category] ?? 'bg-primary-foreground/10 text-primary-foreground/60'}`}>
                      {p.category.split(' - ')[0]}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-primary-foreground/50 font-mono text-xs">
                      {[p.cable, p.probe, p.camera, p.ip].filter(Boolean).join(' · ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => handleToggleActive(p)} title={p.active ? 'Desativar' : 'Ativar'}
                      className="text-primary-foreground/40 hover:text-cyan transition-colors">
                      {p.active ? <ToggleRight className="w-6 h-6 text-cyan" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={productUrl(p)} target="_blank"
                        className="p-1.5 text-primary-foreground/40 hover:text-emerald-400 transition-colors" title="Ver produto no site">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link to={`/admin/produtos/${p.id}/editar`}
                        className="p-1.5 text-primary-foreground/40 hover:text-cyan transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(p.id, p.name)} disabled={deletingId === p.id}
                        className="p-1.5 text-primary-foreground/40 hover:text-red-400 transition-colors disabled:opacity-40" title="Excluir">
                        {deletingId === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ---- Blog: comment card ----
type BlogComment = {
  id: string;
  post_id: string;
  post_title: string | null;
  author_name: string;
  message: string;
  reply: string | null;
  published: boolean;
  created_at: string;
  replied_at: string | null;
};

const CommentCard = ({
  c, draft, onDraft, onPublish, onSaveReply, onDelete, saving,
}: {
  c: BlogComment;
  draft: string;
  onDraft: (v: string) => void;
  onPublish: () => void;
  onSaveReply: () => void;
  onDelete: () => void;
  saving: boolean;
}) => (
  <div className={`rounded-2xl border p-4 space-y-3 ${c.published ? 'bg-navy-dark/30 border-primary-foreground/10' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center text-cyan font-bold text-sm flex-shrink-0">
          {c.author_name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary-foreground">{c.author_name}</p>
          <p className="text-xs text-primary-foreground/40">
            {new Date(c.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            {c.post_title && <> · <span className="text-accent">{c.post_title}</span></>}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button onClick={onPublish} title={c.published ? 'Despublicar' : 'Publicar'}
          className="text-primary-foreground/40 hover:text-cyan transition-colors">
          {c.published ? <ToggleRight className="w-6 h-6 text-cyan" /> : <ToggleLeft className="w-6 h-6" />}
        </button>
        <button onClick={onDelete} className="p-1 text-primary-foreground/30 hover:text-red-400 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    <p className="text-sm text-primary-foreground/80 leading-relaxed bg-primary-foreground/5 rounded-xl px-3 py-2.5">
      {c.message}
    </p>

    {c.reply && !Object.prototype.hasOwnProperty.call({}, c.id) && (
      <div className="flex items-start gap-2 pl-3 border-l-2 border-accent/40">
        <Send className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-xs text-primary-foreground/60 leading-relaxed">{c.reply}</p>
      </div>
    )}

    <div className="flex gap-2">
      <textarea
        value={draft}
        onChange={e => onDraft(e.target.value)}
        placeholder="Escrever resposta..."
        rows={2}
        className="flex-1 px-3 py-2 bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-cyan/40 transition-colors text-xs resize-none"
      />
      <button onClick={onSaveReply} disabled={saving || !draft.trim()}
        className="flex items-center gap-1.5 px-3 py-2 bg-accent/15 hover:bg-accent/25 text-accent border border-accent/30 rounded-xl text-xs font-semibold transition-colors disabled:opacity-40 self-end">
        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
        {c.reply ? 'Atualizar' : 'Responder'}
      </button>
    </div>
  </div>
);

// ---- Blog tab ----
const BlogTab = () => {
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [blogViews, setBlogViews] = useState<{ post_id: string; count: number }[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});
  const [savingReply, setSavingReply] = useState<string | null>(null);
  const [blogSubTab, setBlogSubTab] = useState<'artigos' | 'ranking' | 'comentarios'>('artigos');

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('date', { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  };

  const fetchBlogData = async () => {
    const [{ data: pv }, { data: cm }] = await Promise.all([
      supabase.from('page_views').select('path').like('path', '/blog/%'),
      supabase.from('blog_comments').select('*').order('created_at', { ascending: false }),
    ]);
    const countMap = new Map<string, number>();
    (pv ?? []).forEach(({ path }: { path: string }) => {
      const id = path.replace('/blog/', '').split('?')[0];
      if (id) countMap.set(id, (countMap.get(id) ?? 0) + 1);
    });
    setBlogViews(Array.from(countMap.entries()).map(([post_id, count]) => ({ post_id, count })).sort((a, b) => b.count - a.count));
    setComments((cm ?? []) as BlogComment[]);
  };

  useEffect(() => { fetchPosts(); fetchBlogData(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Excluir "${title}"? Esta ação não pode ser desfeita.`)) return;
    setDeletingId(id);
    await supabase.from('blog_posts').delete().eq('id', id);
    await fetchPosts();
    setDeletingId(null);
  };

  const handleToggleActive = async (post: DbBlogPost) => {
    await supabase.from('blog_posts').update({ active: !post.active }).eq('id', post.id);
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, active: !p.active } : p));
  };

  const handleTogglePublish = async (c: BlogComment) => {
    await supabase.from('blog_comments').update({ published: !c.published }).eq('id', c.id);
    setComments(prev => prev.map(x => x.id === c.id ? { ...x, published: !x.published } : x));
  };

  const handleSaveReply = async (c: BlogComment) => {
    const reply = replyDraft[c.id]?.trim();
    if (!reply) return;
    setSavingReply(c.id);
    await supabase.from('blog_comments').update({ reply, replied_at: new Date().toISOString() }).eq('id', c.id);
    setComments(prev => prev.map(x => x.id === c.id ? { ...x, reply } : x));
    setSavingReply(null);
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm('Excluir este comentário?')) return;
    await supabase.from('blog_comments').delete().eq('id', id);
    setComments(prev => prev.filter(x => x.id !== id));
  };

  const pendingComments = comments.filter(c => !c.published);
  const publishedComments = comments.filter(c => c.published);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-accent" />
            Blog
          </h1>
          <p className="text-primary-foreground/50 text-sm mt-1">
            {posts.length} artigo{posts.length !== 1 ? 's' : ''} · {pendingComments.length} comentário{pendingComments.length !== 1 ? 's' : ''} pendente{pendingComments.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/admin/blog/novo"
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white font-semibold text-sm rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Novo Artigo
        </Link>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-navy-dark/60 border border-primary-foreground/10 rounded-xl p-1 mb-6">
        {([
          { id: 'artigos',     label: 'Artigos',          icon: BookOpen },
          { id: 'ranking',     label: 'Mais lidos',        icon: TrendingUp },
          { id: 'comentarios', label: `Comentários${pendingComments.length > 0 ? ` (${pendingComments.length})` : ''}`, icon: MessageCircle },
        ] as const).map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setBlogSubTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${blogSubTab === id ? 'bg-charcoal text-primary-foreground shadow-sm' : 'text-primary-foreground/40 hover:text-primary-foreground/70'}`}>
            <Icon className="w-4 h-4" /><span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* ---- Artigos ---- */}
      {blogSubTab === 'artigos' && (
        loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cyan" /></div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-primary-foreground/10 rounded-2xl">
            <BookOpen className="w-10 h-10 text-primary-foreground/20 mx-auto mb-3" />
            <p className="text-primary-foreground/40 text-sm">Nenhum artigo cadastrado ainda.</p>
            <Link to="/admin/blog/novo" className="inline-flex items-center gap-2 mt-4 text-sm text-accent hover:underline">
              <Plus className="w-4 h-4" /> Criar primeiro artigo
            </Link>
          </div>
        ) : (
          <div className="bg-navy-dark/40 border border-primary-foreground/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary-foreground/10 text-primary-foreground/40 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium">Artigo</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Categoria</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Autor</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Data</th>
                  <th className="text-center px-4 py-3 font-medium">Publicado</th>
                  <th className="text-right px-4 py-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-primary-foreground/5 hover:bg-primary-foreground/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt={p.title} className="w-12 h-8 rounded object-cover bg-charcoal flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-8 rounded bg-charcoal flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-4 h-4 text-primary-foreground/20" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-primary-foreground leading-tight line-clamp-1">{p.title}</p>
                          <p className="text-primary-foreground/40 text-xs font-mono truncate">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-accent/15 text-accent">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-primary-foreground/60 text-xs">{p.author}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-primary-foreground/50 text-xs font-mono">
                        {new Date(p.date).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => handleToggleActive(p)} title={p.active ? 'Despublicar' : 'Publicar'}
                        className="text-primary-foreground/40 hover:text-cyan transition-colors">
                        {p.active ? <ToggleRight className="w-6 h-6 text-cyan" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <a href={`/blog/${p.id}`} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 text-primary-foreground/40 hover:text-cyan transition-colors" title="Ver no site">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link to={`/admin/blog/${p.id}/editar`}
                          className="p-1.5 text-primary-foreground/40 hover:text-cyan transition-colors" title="Editar">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(p.id, p.title)} disabled={deletingId === p.id}
                          className="p-1.5 text-primary-foreground/40 hover:text-red-400 transition-colors disabled:opacity-40" title="Excluir">
                          {deletingId === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* ---- Ranking: mais lidos ---- */}
      {blogSubTab === 'ranking' && (
        <div className="space-y-4">
          {blogViews.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-primary-foreground/10 rounded-2xl">
              <Eye className="w-10 h-10 text-primary-foreground/20 mx-auto mb-3" />
              <p className="text-primary-foreground/40 text-sm">Nenhuma visita em artigos registrada ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogViews.slice(0, 12).map(({ post_id, count }, idx) => {
                const post = posts.find(p => p.id === post_id);
                const medal = ['🥇', '🥈', '🥉'][idx] ?? `${idx + 1}º`;
                const maxViews = blogViews[0]?.count ?? 1;
                const pct = Math.round((count / maxViews) * 100);
                return (
                  <div key={post_id} className="bg-navy-dark/40 border border-primary-foreground/10 rounded-2xl p-4 flex flex-col gap-3 hover:border-accent/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0 leading-none mt-0.5">{medal}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-heading font-bold text-sm text-primary-foreground leading-snug line-clamp-2">
                          {post?.title ?? post_id}
                        </p>
                        {post?.category && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/15 text-accent">
                            {post.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-primary-foreground/40">Visualizações</span>
                        <span className="font-bold text-cyan">{count}</span>
                      </div>
                      <div className="h-1.5 bg-primary-foreground/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan to-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <a href={`/blog/${post_id}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-primary-foreground/30 hover:text-cyan transition-colors">
                      <ExternalLink className="w-3 h-3" /> Ver artigo
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ---- Comentários / Dúvidas ---- */}
      {blogSubTab === 'comentarios' && (
        <div className="space-y-6">
          {/* Pendentes */}
          <div>
            <h2 className="font-heading text-sm font-bold text-primary-foreground/60 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
              Aguardando moderação ({pendingComments.length})
            </h2>
            {pendingComments.length === 0 ? (
              <p className="text-primary-foreground/30 text-sm py-6 text-center border border-dashed border-primary-foreground/10 rounded-xl">
                Nenhum comentário pendente.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingComments.map(c => (
                  <CommentCard key={c.id} c={c}
                    draft={replyDraft[c.id] ?? ''}
                    onDraft={v => setReplyDraft(prev => ({ ...prev, [c.id]: v }))}
                    onPublish={() => handleTogglePublish(c)}
                    onSaveReply={() => handleSaveReply(c)}
                    onDelete={() => handleDeleteComment(c.id)}
                    saving={savingReply === c.id}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Publicados */}
          {publishedComments.length > 0 && (
            <div>
              <h2 className="font-heading text-sm font-bold text-primary-foreground/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                Publicados ({publishedComments.length})
              </h2>
              <div className="space-y-3">
                {publishedComments.map(c => (
                  <CommentCard key={c.id} c={c}
                    draft={replyDraft[c.id] ?? c.reply ?? ''}
                    onDraft={v => setReplyDraft(prev => ({ ...prev, [c.id]: v }))}
                    onPublish={() => handleTogglePublish(c)}
                    onSaveReply={() => handleSaveReply(c)}
                    onDelete={() => handleDeleteComment(c.id)}
                    saving={savingReply === c.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ---- Leads tab ----
const subjectColor: Record<string, string> = {
  'Solicitação de Orçamento': 'bg-cyan/15 text-cyan',
  'Informações sobre Produto': 'bg-blue-500/15 text-blue-400',
  'Suporte Técnico': 'bg-yellow-500/15 text-yellow-400',
  'Parceria Comercial': 'bg-purple-500/15 text-purple-400',
  'Outro': 'bg-primary-foreground/10 text-primary-foreground/60',
};

const LeadsTab = () => {
  const [leads, setLeads] = useState<DbLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Excluir lead de "${name}"?`)) return;
    setDeletingId(id);
    await supabase.from('leads').delete().eq('id', id);
    setLeads(prev => prev.filter(l => l.id !== id));
    setDeletingId(null);
  };

  const exportCSV = () => {
    const headers = ['Nome', 'Email', 'Telefone', 'Empresa', 'Assunto', 'Mensagem', 'Origem', 'Mídia', 'Campanha', 'Data'];
    const rows = leads.map(l => [
      l.name, l.email, l.phone ?? '', l.company ?? '', l.subject ?? '', l.message,
      l.utm_source ?? '', l.utm_medium ?? '', l.utm_campaign ?? '',
      new Date(l.created_at).toLocaleDateString('pt-BR'),
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-borotec-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-accent" />
            Leads
          </h1>
          <p className="text-primary-foreground/50 text-sm mt-1">
            {leads.length} lead{leads.length !== 1 ? 's' : ''} recebido{leads.length !== 1 ? 's' : ''}
          </p>
        </div>
        {leads.length > 0 && (
          <button onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-foreground/10 hover:bg-primary-foreground/15 text-primary-foreground/70 hover:text-primary-foreground font-medium text-sm rounded-lg transition-colors border border-primary-foreground/10">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cyan" /></div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-primary-foreground/10 rounded-2xl">
          <Users className="w-10 h-10 text-primary-foreground/20 mx-auto mb-3" />
          <p className="text-primary-foreground/40 text-sm">Nenhum lead recebido ainda.</p>
          <p className="text-primary-foreground/25 text-xs mt-1">Os contatos do formulário aparecerão aqui.</p>
        </div>
      ) : (
        <div className="bg-navy-dark/40 border border-primary-foreground/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary-foreground/10 text-primary-foreground/40 text-xs uppercase tracking-wide">
                <th className="text-left px-4 py-3 font-medium">Contato</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Assunto</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Origem</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Data</th>
                <th className="text-right px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <>
                  <tr key={lead.id}
                    className="border-b border-primary-foreground/5 hover:bg-primary-foreground/3 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-primary-foreground leading-tight">{lead.name}</p>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs text-cyan hover:underline">
                          <Mail className="w-3 h-3" />{lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1 text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                            <Phone className="w-3 h-3" />{lead.phone}
                          </a>
                        )}
                        {lead.company && (
                          <span className="flex items-center gap-1 text-xs text-primary-foreground/40">
                            <Building2 className="w-3 h-3" />{lead.company}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {lead.subject && (
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${subjectColor[lead.subject] ?? subjectColor['Outro']}`}>
                          {lead.subject}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {lead.utm_source ? (
                        <span className="text-xs text-primary-foreground/50 font-mono">
                          {[lead.utm_source, lead.utm_medium].filter(Boolean).join(' / ')}
                        </span>
                      ) : (
                        <span className="text-xs text-primary-foreground/25">–</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-primary-foreground/50 font-mono">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        <br />
                        <span className="text-primary-foreground/30">
                          {new Date(lead.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={e => { e.stopPropagation(); setExpandedId(expandedId === lead.id ? null : lead.id); }}
                          className="p-1.5 text-primary-foreground/40 hover:text-cyan transition-colors" title="Ver detalhes">
                          {expandedId === lead.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <button onClick={e => { e.stopPropagation(); handleDelete(lead.id, lead.name); }}
                          disabled={deletingId === lead.id}
                          className="p-1.5 text-primary-foreground/40 hover:text-red-400 transition-colors disabled:opacity-40" title="Excluir">
                          {deletingId === lead.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedId === lead.id && (
                    <tr key={`${lead.id}-expanded`} className="border-b border-primary-foreground/5 bg-navy-dark/20">
                      <td colSpan={5} className="px-6 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-medium text-primary-foreground/40 uppercase tracking-wide mb-2">Mensagem</p>
                            <p className="text-sm text-primary-foreground/75 leading-relaxed whitespace-pre-wrap bg-charcoal/60 rounded-lg p-3 border border-primary-foreground/10">
                              {lead.message}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-medium text-primary-foreground/40 uppercase tracking-wide mb-2">Rastreamento</p>
                              <div className="space-y-1.5">
                                {[
                                  ['Origem', lead.utm_source],
                                  ['Mídia', lead.utm_medium],
                                  ['Campanha', lead.utm_campaign],
                                  ['Termo', lead.utm_term],
                                  ['Conteúdo', lead.utm_content],
                                  ['GCLID', lead.gclid],
                                ].map(([label, value]) => value && (
                                  <div key={label} className="flex items-start gap-2 text-xs">
                                    <span className="text-primary-foreground/30 w-20 flex-shrink-0">{label}</span>
                                    <span className="text-primary-foreground/70 font-mono break-all">{value}</span>
                                  </div>
                                ))}
                                {!lead.utm_source && !lead.gclid && (
                                  <p className="text-xs text-primary-foreground/25">Sem dados de rastreamento</p>
                                )}
                              </div>
                            </div>
                            <div className="pt-2">
                              <a href={`mailto:${lead.email}?subject=Re: ${lead.subject ?? 'Contato BOROTEC'}`}
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan/10 hover:bg-cyan/20 text-cyan border border-cyan/20 rounded-lg text-xs font-medium transition-colors">
                                <Mail className="w-3.5 h-3.5" />
                                Responder por e-mail
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ---- Analytics tab ----
const groupByPath = (list: PageView[]) => {
  const map = new Map<string, { path: string; title: string; count: number }>();
  list.forEach(v => {
    const e = map.get(v.path);
    if (e) e.count++;
    else map.set(v.path, { path: v.path, title: v.page_title ?? v.path, count: 1 });
  });
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
};

const HBar = ({ count, max, color = 'bg-cyan' }: { count: number; max: number; color?: string }) => (
  <div className="flex-1 bg-primary-foreground/5 rounded-full h-1.5 overflow-hidden">
    <div className={`${color} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${max ? (count / max) * 100 : 0}%` }} />
  </div>
);

const StatCard = ({ icon: Icon, label, value, sub, accent }: { icon: React.ElementType; label: string; value: string | number; sub?: string; accent?: boolean }) => (
  <div className="bg-navy-dark/40 border border-primary-foreground/10 rounded-xl p-5">
    <div className="flex items-center gap-2 mb-3">
      <Icon className={`w-4 h-4 ${accent ? 'text-accent' : 'text-cyan'}`} />
      <span className="text-xs text-primary-foreground/40 uppercase tracking-wide">{label}</span>
    </div>
    <p className="font-heading text-3xl font-black text-primary-foreground">{value}</p>
    {sub && <p className="text-xs text-primary-foreground/40 mt-1">{sub}</p>}
  </div>
);

const rankColor = (i: number) =>
  i === 0 ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/20'
  : i === 1 ? 'bg-slate-400/20 text-slate-300 border-slate-400/20'
  : i === 2 ? 'bg-orange-600/20 text-orange-400 border-orange-600/20'
  : 'bg-primary-foreground/8 text-primary-foreground/30 border-primary-foreground/10';

type DateRange = { from: Date; to: Date };
type PresetId = 'today' | 'yesterday' | 'last7' | 'last28' | 'last30' | 'thisMonth' | 'lastMonth' | 'last90' | 'custom';

const makeDatePresets = (): { id: PresetId; label: string; range: DateRange }[] => {
  const now = new Date();
  const bod = (d: Date) => { const r = new Date(d); r.setHours(0, 0, 0, 0); return r; };
  const eod = (d: Date) => { const r = new Date(d); r.setHours(23, 59, 59, 999); return r; };
  return [
    { id: 'today',     label: 'Hoje',            range: { from: bod(now), to: eod(now) } },
    { id: 'yesterday', label: 'Ontem',            range: { from: bod(addDays(now, -1)), to: eod(addDays(now, -1)) } },
    { id: 'last7',     label: 'Últimos 7 dias',   range: { from: bod(addDays(now, -6)), to: eod(now) } },
    { id: 'last28',    label: 'Últimos 28 dias',  range: { from: bod(addDays(now, -27)), to: eod(now) } },
    { id: 'last30',    label: 'Últimos 30 dias',  range: { from: bod(addDays(now, -29)), to: eod(now) } },
    { id: 'thisMonth', label: 'Este mês',          range: { from: bod(startOfMonth(now)), to: eod(now) } },
    { id: 'lastMonth', label: 'Mês passado',       range: { from: bod(startOfMonth(subMonths(now, 1))), to: eod(endOfMonth(subMonths(now, 1))) } },
    { id: 'last90',    label: 'Últimos 90 dias',   range: { from: bod(addDays(now, -89)), to: eod(now) } },
  ];
};

type PdfData = {
  period: number;
  totalVisits: number;
  todayCount: number;
  uniqueSessions: number;
  waTotal: number;
  conversionRate: string;
  weekStats: { thisWeekViews: number; lastWeekViews: number; thisWeekWa: number; lastWeekWa: number; thisWeekForm: number; lastWeekForm: number; viewsDiff: number | null; waDiff: number | null; formDiff: number | null };
  convBySource: { source: string; visits: number; wa: number; rate: number }[];
  waHourlyData: { hour: number; count: number }[];
  productsWithoutVisits: { id: string; name: string; slug: string }[];
  topPages: { title: string; count: number }[];
  topProducts: { title: string; count: number }[];
  topSources: { source: string; count: number }[];
  topCities: { city: string; count: number }[];
  topRegions: { region: string; count: number }[];
  waByPage: { page: string; count: number }[];
  waByType: { type: string; count: number }[];
  waBySource: { source: string; count: number }[];
  dailyData: { label: string; date: string; count: number }[];
  bounceRate: string;
  avgPages: string;
  formStats: { contactViews: number; starts: number; successes: number; errors: number; startRate: string; submitRate: string };
  weekdayHourHeatmap: number[][];
};

const PdfReport = ({ data }: { data: PdfData }) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const since = new Date(); since.setDate(since.getDate() - data.period);
  const sinceStr = since.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const todayStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const s: Record<string, React.CSSProperties> = {
    page: { fontFamily: "'Helvetica Neue', Arial, sans-serif", background: '#fff', color: '#1a1a2e', width: '794px', padding: '0' },
    header: { background: 'linear-gradient(135deg, #0b1929 0%, #0f3460 100%)', padding: '0', color: '#fff' },
    headerTop: { background: '#fff', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid #e67e22' },
    headerBottom: { padding: '20px 40px 22px', background: 'linear-gradient(135deg, #0b1929 0%, #0f3460 100%)' },
    reportTitle: { fontSize: '18px', fontWeight: '900', color: '#fff', letterSpacing: '0.5px' },
    reportMeta: { fontSize: '12px', color: '#8ab4d4', marginTop: '6px', lineHeight: '1.6' },
    accent: { color: '#e67e22' },
    body: { padding: '24px 40px' },
    sectionTitle: { fontSize: '12px', fontWeight: '800', color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '1.5px', marginBottom: '12px', padding: '8px 14px', background: 'linear-gradient(90deg, #0f3460, #1a5276)', borderRadius: '6px', breakInside: 'avoid' as const },
    grid4: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '20px' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' },
    card: { background: '#f8fafc', borderRadius: '8px', padding: '14px 16px', textAlign: 'center' as const, border: '1px solid #e2eaf2' },
    cardVal: { fontSize: '26px', fontWeight: '900', color: '#0f1c2e', lineHeight: '1' },
    cardLabel: { fontSize: '10px', color: '#6b7a8d', marginTop: '5px', fontWeight: '700', textTransform: 'uppercase' as const, letterSpacing: '0.5px' },
    cardAccent: { background: '#e8f8ff', borderRadius: '8px', padding: '14px 16px', textAlign: 'center' as const, border: '1px solid #b3e5fc' },
    cardValAccent: { fontSize: '26px', fontWeight: '900', color: '#0077b6', lineHeight: '1' },
    table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '12px' },
    th: { textAlign: 'left' as const, padding: '8px 10px', background: '#f0f4f8', color: '#4a5568', fontWeight: '700', fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.5px', borderBottom: '2px solid #e2eaf2' },
    td: { padding: '7px 10px', borderBottom: '1px solid #f0f4f8', color: '#2d3748', fontSize: '12px' },
    tdRight: { padding: '7px 10px', borderBottom: '1px solid #f0f4f8', color: '#2d3748', textAlign: 'right' as const, fontWeight: '700', fontSize: '12px' },
    section: { marginBottom: '24px', breakInside: 'avoid' as const, pageBreakInside: 'avoid' as const },
    footer: { marginTop: '24px', padding: '14px 40px', background: '#f8fafc', borderTop: '2px solid #e2eaf2', fontSize: '10px', color: '#9aa5b4', display: 'flex', justifyContent: 'space-between' as const },
    weekHeader: { background: '#0f3460', color: '#fff', padding: '6px 12px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', borderRadius: '4px 4px 0 0' },
    weekend: { color: '#c0392b', fontWeight: '700' },
  };

  const DIAS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  // Group daily data into weeks (Mon–Sun)
  const weeklyGroups: { weekLabel: string; days: typeof data.dailyData }[] = [];
  if (data.dailyData.length > 0) {
    let currentWeek: typeof data.dailyData = [];
    let weekStart = '';
    data.dailyData.forEach((day, idx) => {
      const d = new Date(day.date + 'T12:00:00');
      const dow = d.getDay();
      if (currentWeek.length === 0) weekStart = day.label;
      currentWeek.push(day);
      const isLastDay = idx === data.dailyData.length - 1;
      if (dow === 0 || isLastDay) {
        weeklyGroups.push({ weekLabel: `${weekStart} – ${day.label}`, days: currentWeek });
        currentWeek = [];
        weekStart = '';
      }
    });
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerTop}>
          <img src={logoBorotec} alt="Borotec" style={{ height: '52px' }} />
          <div style={{ textAlign: 'right' as const, fontSize: '11px', color: '#6b7a8d' }}>
            <div style={{ fontWeight: '700', color: '#0f3460', fontSize: '12px' }}>Relatório de Analytics</div>
            <div>Gerado em {dateStr} às {timeStr}</div>
          </div>
        </div>
        <div style={s.headerBottom}>
          <div style={s.reportTitle}>Análise de Desempenho do Site</div>
          <div style={s.reportMeta}>
            Período analisado: <span style={{ color: '#e67e22', fontWeight: '700' }}>{sinceStr}</span>
            {' até '}
            <span style={{ color: '#e67e22', fontWeight: '700' }}>{todayStr}</span>
            {' · '}
            <span style={{ color: '#8ab4d4' }}>{data.period} dias</span>
            {' · '}
            <span style={{ color: '#8ab4d4' }}>{data.totalVisits} visitas · {data.uniqueSessions} sessões · {data.waTotal} cliques WA</span>
          </div>
        </div>
      </div>

      <div style={s.body}>
        {/* KPIs */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Resumo do Período</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div style={s.card}><div style={s.cardVal}>{data.totalVisits}</div><div style={s.cardLabel}>Visitas totais</div></div>
            <div style={s.card}><div style={s.cardVal}>{data.todayCount}</div><div style={s.cardLabel}>Visitas hoje</div></div>
            <div style={s.card}><div style={s.cardVal}>{data.uniqueSessions}</div><div style={s.cardLabel}>Sessões únicas</div></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '0' }}>
            <div style={s.cardAccent}><div style={s.cardValAccent}>{data.waTotal}</div><div style={s.cardLabel}>Cliques WhatsApp</div></div>
            <div style={s.card}><div style={{ ...s.cardVal, color: data.bounceRate !== '–' && parseInt(data.bounceRate) > 70 ? '#e74c3c' : data.bounceRate !== '–' && parseInt(data.bounceRate) < 40 ? '#27ae60' : '#0f1c2e' }}>{data.bounceRate}</div><div style={s.cardLabel}>Taxa de rejeição</div></div>
            <div style={s.card}><div style={s.cardVal}>{data.avgPages}</div><div style={s.cardLabel}>Págs. por sessão</div></div>
          </div>
        </div>

        {/* Funil de conversão */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Funil de Conversão</div>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Etapa</th>
                <th style={{ ...s.th, textAlign: 'right' }}>Visitantes</th>
                <th style={{ ...s.th, textAlign: 'right' }}>% do total</th>
                <th style={{ ...s.th, textAlign: 'right' }}>Conversão da etapa</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const total = data.totalVisits;
                const steps = [
                  { label: 'Visitas totais',     value: total },
                  { label: 'Visitou /contato',   value: data.formStats.contactViews },
                  { label: 'Iniciou formulário', value: data.formStats.starts },
                  { label: 'Enviou formulário',  value: data.formStats.successes },
                  { label: 'Clicou WhatsApp',    value: data.waTotal },
                ];
                return steps.map((step, i) => {
                  const pct = total > 0 ? ((step.value / total) * 100).toFixed(1) : '0.0';
                  const conv = i > 0 && steps[i-1].value > 0 ? ((step.value / steps[i-1].value) * 100).toFixed(1) : '–';
                  const isConv = i > 0 && steps[i-1].value > 0;
                  const convNum = isConv ? parseFloat(conv) : 100;
                  return (
                    <tr key={step.label}>
                      <td style={s.td}>{step.label}</td>
                      <td style={s.tdRight}>{step.value}</td>
                      <td style={s.tdRight}>{pct}%</td>
                      <td style={{ ...s.tdRight, color: !isConv ? '#9aa5b4' : convNum >= 50 ? '#27ae60' : convNum >= 20 ? '#e67e22' : '#e74c3c' }}>
                        {i === 0 ? '–' : `${conv}%`}
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>

        {/* Formulário de Contato */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Formulário de Contato</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div style={s.card}><div style={{ ...s.cardVal, fontSize: '22px' }}>{data.formStats.contactViews}</div><div style={s.cardLabel}>Visualizações</div></div>
            <div style={s.card}><div style={{ ...s.cardVal, fontSize: '22px', color: '#0077b6' }}>{data.formStats.starts}</div><div style={s.cardLabel}>Iniciaram</div></div>
            <div style={s.card}><div style={{ ...s.cardVal, fontSize: '22px', color: '#e67e22' }}>{data.formStats.successes}</div><div style={s.cardLabel}>Enviados</div></div>
            <div style={s.card}><div style={{ ...s.cardVal, fontSize: '22px', color: data.formStats.errors > 0 ? '#e74c3c' : '#9aa5b4' }}>{data.formStats.errors}</div><div style={s.cardLabel}>Erros</div></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#f4f8fc', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#6b7a8d', fontWeight: '600' }}>Taxa de início</span>
              <span style={{ fontSize: '20px', fontWeight: '900', color: '#0077b6' }}>{data.formStats.startRate}%</span>
            </div>
            <div style={{ background: '#f4f8fc', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#6b7a8d', fontWeight: '600' }}>Taxa de conclusão</span>
              <span style={{ fontSize: '20px', fontWeight: '900', color: '#e67e22' }}>{data.formStats.submitRate}%</span>
            </div>
          </div>
        </div>

        {/* Visitas por semana */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Visitas por Dia – Agrupadas por Semana</div>
          {weeklyGroups.map((week, wi) => (
            <div key={wi} style={{ marginBottom: '16px' }}>
              <div style={s.weekHeader}>Semana {week.weekLabel}</div>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Dia da semana</th>
                    <th style={s.th}>Data</th>
                    <th style={{ ...s.th, textAlign: 'right' }}>Visitas</th>
                  </tr>
                </thead>
                <tbody>
                  {week.days.map((day) => {
                    const d = new Date(day.date + 'T12:00:00');
                    const dow = d.getDay();
                    const isWeekend = dow === 0 || dow === 6;
                    return (
                      <tr key={day.date}>
                        <td style={{ ...s.td, ...(isWeekend ? s.weekend : {}) }}>{DIAS[dow]}</td>
                        <td style={{ ...s.td, color: '#6b7a8d' }}>{day.label}</td>
                        <td style={{ ...s.tdRight, ...(isWeekend ? s.weekend : {}) }}>{day.count}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div style={s.grid2}>
          {/* Páginas mais visitadas */}
          <div style={s.section}>
            <div style={s.sectionTitle}>Páginas Mais Visitadas</div>
            <table style={s.table}>
              <thead><tr><th style={s.th}>Página</th><th style={{ ...s.th, textAlign: 'right' }}>Visitas</th></tr></thead>
              <tbody>{data.topPages.map((p, i) => <tr key={i}><td style={s.td}>{p.title}</td><td style={s.tdRight}>{p.count}</td></tr>)}</tbody>
            </table>
          </div>

          {/* Origem do tráfego */}
          <div style={s.section}>
            <div style={s.sectionTitle}>Origem do Tráfego</div>
            <table style={s.table}>
              <thead><tr><th style={s.th}>Origem</th><th style={{ ...s.th, textAlign: 'right' }}>Visitas</th></tr></thead>
              <tbody>{data.topSources.map((p, i) => <tr key={i}><td style={s.td}>{p.source}</td><td style={s.tdRight}>{p.count}</td></tr>)}</tbody>
            </table>
          </div>
        </div>

        {/* Produtos mais vistos */}
        {data.topProducts.length > 0 && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Produtos Mais Vistos</div>
            <table style={s.table}>
              <thead><tr><th style={s.th}>#</th><th style={s.th}>Produto</th><th style={{ ...s.th, textAlign: 'right' }}>Visitas</th></tr></thead>
              <tbody>{data.topProducts.map((p, i) => <tr key={i}><td style={{ ...s.td, color: '#9aa5b4', width: '30px' }}>{i + 1}º</td><td style={s.td}>{p.title}</td><td style={s.tdRight}>{p.count}</td></tr>)}</tbody>
            </table>
          </div>
        )}

        {/* WhatsApp */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Cliques no WhatsApp</div>
          <div style={s.grid2}>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7a8d', fontWeight: '700', marginBottom: '8px' }}>POR PÁGINA</div>
              <table style={s.table}>
                <tbody>{data.waByPage.map((p, i) => <tr key={i}><td style={s.td}>{p.page}</td><td style={s.tdRight}>{p.count}</td></tr>)}</tbody>
              </table>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7a8d', fontWeight: '700', marginBottom: '8px' }}>POR BOTÃO</div>
              <table style={s.table}>
                <tbody>{data.waByType.map((p, i) => <tr key={i}><td style={s.td}>{p.type}</td><td style={s.tdRight}>{p.count}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Geo */}
        {(data.topCities.length > 0 || data.topRegions.length > 0) && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Geolocalização</div>
            <div style={s.grid2}>
              {data.topCities.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', color: '#6b7a8d', fontWeight: '700', marginBottom: '8px' }}>CIDADES</div>
                  <table style={s.table}>
                    <tbody>{data.topCities.map((p, i) => <tr key={i}><td style={s.td}>{p.city}</td><td style={s.tdRight}>{p.count}</td></tr>)}</tbody>
                  </table>
                </div>
              )}
              {data.topRegions.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', color: '#6b7a8d', fontWeight: '700', marginBottom: '8px' }}>ESTADOS</div>
                  <table style={s.table}>
                    <tbody>{data.topRegions.map((p, i) => <tr key={i}><td style={s.td}>{p.region}</td><td style={s.tdRight}>{p.count}</td></tr>)}</tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Taxa de conversão + Semana vs semana */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Desempenho – Conversão e Comparativo Semanal</div>
          <div style={{ ...s.grid2, marginBottom: '0' }}>
            {/* Conversão */}
            <div style={{ background: '#e8f8ff', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#6b7a8d', fontWeight: '700', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '8px' }}>Taxa de Conversão</div>
              <div style={{ fontSize: '40px', fontWeight: '900', color: '#0077b6' }}>{data.conversionRate}%</div>
              <div style={{ fontSize: '11px', color: '#9aa5b4', marginTop: '4px' }}>visitas → clique WhatsApp</div>
            </div>
            {/* Semana vs semana */}
            <div style={{ background: '#f4f8fc', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '11px', color: '#6b7a8d', fontWeight: '700', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '12px' }}>Esta Semana vs. Anterior</div>
              {[
                { label: 'Visitas',     curr: data.weekStats.thisWeekViews, prev: data.weekStats.lastWeekViews, diff: data.weekStats.viewsDiff },
                { label: 'WhatsApp',    curr: data.weekStats.thisWeekWa,    prev: data.weekStats.lastWeekWa,    diff: data.weekStats.waDiff },
                { label: 'Formulários', curr: data.weekStats.thisWeekForm,  prev: data.weekStats.lastWeekForm,  diff: data.weekStats.formDiff },
              ].map(({ label, curr, prev, diff }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', color: '#1a1a2e', fontWeight: '600' }}>{label}</span>
                  <span style={{ fontSize: '12px', color: '#6b7a8d' }}>{prev} → <strong style={{ color: '#0f1c2e' }}>{curr}</strong></span>
                  {diff !== null && (
                    <span style={{ fontSize: '12px', fontWeight: '700', color: diff >= 0 ? '#27ae60' : '#e74c3c' }}>
                      {diff >= 0 ? '↑ ' : '↓ '} {Math.abs(diff).toFixed(1)}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversão por origem */}
        {data.convBySource.length > 0 && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Origem que Mais Converte em WhatsApp</div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Origem</th>
                  <th style={{ ...s.th, textAlign: 'right' }}>Visitas</th>
                  <th style={{ ...s.th, textAlign: 'right' }}>Cliques WA</th>
                  <th style={{ ...s.th, textAlign: 'right' }}>Conversão</th>
                </tr>
              </thead>
              <tbody>
                {data.convBySource.map((r, i) => (
                  <tr key={i}>
                    <td style={s.td}>{r.source}</td>
                    <td style={s.tdRight}>{r.visits}</td>
                    <td style={s.tdRight}>{r.wa}</td>
                    <td style={{ ...s.tdRight, color: r.rate >= 5 ? '#e67e22' : r.rate >= 2 ? '#2980b9' : '#9aa5b4', fontWeight: '700' }}>{r.rate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Horário de pico WA */}
        {data.waHourlyData.some(h => h.count > 0) && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Horário de Pico – Cliques WhatsApp</div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Horário</th>
                  <th style={s.th}>Período</th>
                  <th style={{ ...s.th, textAlign: 'right' }}>Cliques</th>
                </tr>
              </thead>
              <tbody>
                {data.waHourlyData.filter(h => h.count > 0).map(({ hour, count }) => {
                  const period = hour < 6 ? 'Madrugada' : hour < 12 ? 'Manhã' : hour < 18 ? 'Tarde' : 'Noite';
                  return (
                    <tr key={hour}>
                      <td style={s.td}>{String(hour).padStart(2, '0')}h – {String(hour + 1).padStart(2, '0')}h</td>
                      <td style={s.td}>{period}</td>
                      <td style={s.tdRight}>{count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Heatmap dia × hora */}
        {data.weekdayHourHeatmap.some(row => row.some(v => v > 0)) && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Heatmap – Dia da Semana × Hora</div>
            {(() => {
              const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
              const HOURS = Array.from({ length: 24 }, (_, i) => i);
              const maxVal = Math.max(...data.weekdayHourHeatmap.flat(), 1);
              const cellBg = (v: number) => {
                if (v === 0) return '#f1f5f9';
                const pct = v / maxVal;
                if (pct >= 0.75) return '#16a34a';
                if (pct >= 0.5)  return '#4ade80';
                if (pct >= 0.25) return '#86efac';
                return '#dcfce7';
              };
              const cellText = (v: number) => {
                if (v === 0) return '#cbd5e1';
                const pct = v / maxVal;
                return pct >= 0.5 ? '#fff' : '#14532d';
              };
              return (
                <table style={{ ...s.table, fontSize: '9px' }}>
                  <thead>
                    <tr>
                      <th style={{ ...s.th, fontSize: '9px', width: '28px' }} />
                      {HOURS.map(h => (
                        <th key={h} style={{ ...s.th, fontSize: '9px', textAlign: 'center', padding: '4px 2px', color: [0,6,12,18,23].includes(h) ? '#6b7a8d' : 'transparent' }}>
                          {h}h
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS.map((day, dIdx) => (
                      <tr key={day}>
                        <td style={{ ...s.td, fontSize: '9px', fontWeight: '700', color: '#6b7a8d', padding: '3px 6px 3px 0', borderBottom: 'none' }}>{day}</td>
                        {HOURS.map(h => {
                          const v = data.weekdayHourHeatmap[dIdx][h];
                          return (
                            <td key={h} style={{ padding: '2px', borderBottom: 'none' }}>
                              <div style={{ background: cellBg(v), color: cellText(v), borderRadius: '2px', width: '26px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: v > 0 ? '800' : '400' }}>
                                {v > 0 ? v : ''}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })()}
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '10px', color: '#9aa5b4' }}>
              {[['#f1f5f9','Sem visitas'],['#dcfce7','Baixo'],['#86efac','Médio'],['#4ade80','Alto'],['#16a34a','Pico']].map(([bg, label]) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: bg, display: 'inline-block' }} />{label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Produtos sem visitas */}
        {data.productsWithoutVisits.length > 0 && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Produtos sem Visitas nos Últimos {data.period} Dias</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {data.productsWithoutVisits.map(p => (
                <div key={p.id} style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', color: '#7f1d1d' }}>
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={s.footer}>
        <span>BOROTEC Industrial · borotec.com.br</span>
        <span>Relatório gerado automaticamente · {dateStr}</span>
      </div>
    </div>
  );
};

const AnalyticsTab = () => {
  const [views, setViews] = useState<PageView[]>([]);
  const [waClicks, setWaClicks] = useState<WaClick[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const presets = makeDatePresets();
    return presets.find(p => p.id === 'last30')!.range;
  });
  const [activePreset, setActivePreset] = useState<PresetId>('last30');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pendingRange, setPendingRange] = useState<{ from: Date; to: Date | undefined }>({ from: dateRange.from, to: dateRange.to });
  const [pendingPreset, setPendingPreset] = useState<PresetId>('last30');
  const [showComparison, setShowComparison] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(180);
  const [exporting, setExporting] = useState(false);
  const [aTab, setATab] = useState<'geral' | 'whatsapp' | 'form' | 'produtos'>('geral');
  const pdfRef = useRef<HTMLDivElement>(null);

  const exportAllData = async () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR').replace(/\//g, '-');
    const e = (v: string | number | null | undefined) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const row = (...cols: (string | number | null | undefined)[]) => cols.map(e).join(',');

    const [{ data: pvAll }, { data: waAll }, { data: feAll }] = await Promise.all([
      supabase.from('page_views').select('*').order('created_at', { ascending: true }),
      supabase.from('whatsapp_clicks').select('*').order('created_at', { ascending: true }),
      supabase.from('form_events').select('*').order('created_at', { ascending: true }),
    ]);

    const pvSection = [
      row('=== PAGE_VIEWS – TODAS AS VISITAS ==='),
      row('id', 'created_at', 'path', 'page_title', 'utm_source', 'utm_medium', 'utm_campaign', 'city', 'region', 'country', 'session_id'),
      ...(pvAll ?? []).map((v: Record<string, unknown>) => row(v.id, v.created_at, v.path, v.page_title, v.utm_source, v.utm_medium, v.utm_campaign, v.city, v.region, v.country, v.session_id)),
      '',
    ];

    const waSection = [
      row('=== WHATSAPP_CLICKS – TODOS OS CLIQUES ==='),
      row('id', 'created_at', 'path', 'page_title', 'button_type', 'utm_source', 'utm_medium', 'utm_campaign', 'session_id'),
      ...(waAll ?? []).map((v: Record<string, unknown>) => row(v.id, v.created_at, v.path, v.page_title, v.button_type, v.utm_source, v.utm_medium, v.utm_campaign, v.session_id)),
      '',
    ];

    const feSection = [
      row('=== FORM_EVENTS – TODOS OS EVENTOS ==='),
      row('id', 'created_at', 'event_type', 'utm_source', 'utm_medium', 'utm_campaign', 'session_id'),
      ...(feAll ?? []).map((v: Record<string, unknown>) => row(v.id, v.created_at, v.event_type, v.utm_source, v.utm_medium, v.utm_campaign, v.session_id)),
      '',
    ];

    const header = [
      row('BACKUP COMPLETO – BOROTEC ANALYTICS'),
      row('Exportado em', now.toLocaleString('pt-BR')),
      row('Total page_views', (pvAll ?? []).length),
      row('Total whatsapp_clicks', (waAll ?? []).length),
      row('Total form_events', (feAll ?? []).length),
      '',
    ];

    const csv = [...header, ...pvSection, ...waSection, ...feSection].join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `borotec-backup-completo-${dateStr}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR').replace(/\//g, '-');
    const e = (v: string | number | null | undefined) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const row = (...cols: (string | number | null | undefined)[]) => cols.map(e).join(',');

    // ---- Resumo ----
    const summary = [
      row('RELATÓRIO BOROTEC ANALYTICS'),
      row('Gerado em', now.toLocaleString('pt-BR')),
      row('Período início', dateRange.from.toLocaleDateString('pt-BR')),
      row('Período fim', dateRange.to.toLocaleDateString('pt-BR')),
      row('Total de visitas', filtered.length),
      row('Sessões únicas', uniqueSessions),
      row('Cliques WhatsApp', filteredWa.length),
      row('Taxa de conversão WA', conversionRate + '%'),
      row('Taxa de rejeição', bounceRate),
      row('Págs. por sessão', avgPages),
      row('Formulários enviados', formStats.successes),
      '',
    ];

    // ---- Visitas ----
    const pvSection = [
      row('=== VISITAS POR PÁGINA ==='),
      row('Data', 'Hora (UTC-3)', 'Caminho', 'Título da Página', 'Origem (UTM)', 'Mídia (UTM)', 'Campanha (UTM)', 'Cidade', 'Estado', 'País', 'Session ID'),
      ...filtered.map(v => row(
        v.created_at.slice(0, 10),
        v.created_at.slice(11, 16),
        v.path,
        v.page_title,
        v.utm_source,
        v.utm_medium,
        v.utm_campaign,
        v.city,
        v.region,
        (v as { country?: string | null }).country ?? '',
        v.session_id,
      )),
      '',
    ];

    // ---- WhatsApp ----
    const waSection = [
      row('=== CLIQUES WHATSAPP ==='),
      row('Data', 'Hora (UTC-3)', 'Página de Origem', 'Título da Página', 'Tipo de Botão', 'Origem (UTM)', 'Mídia (UTM)', 'Campanha (UTM)', 'Session ID'),
      ...filteredWa.map(c => row(
        c.created_at.slice(0, 10),
        c.created_at.slice(11, 16),
        c.path,
        c.page_title,
        c.button_type,
        c.utm_source,
        c.utm_medium,
        c.utm_campaign,
        c.session_id,
      )),
      '',
    ];

    // ---- Formulário ----
    const start = new Date(dateRange.from); start.setHours(0, 0, 0, 0);
    const end   = new Date(dateRange.to);   end.setHours(23, 59, 59, 999);
    const filteredFe = formEvents.filter(fe => { const d = new Date(fe.created_at); return d >= start && d <= end; });
    const feSection = [
      row('=== EVENTOS DE FORMULÁRIO ==='),
      row('Data', 'Hora (UTC-3)', 'Tipo de Evento', 'Descrição', 'Origem (UTM)', 'Mídia (UTM)', 'Campanha (UTM)', 'Session ID'),
      ...filteredFe.map(fe => {
        const desc: Record<string, string> = {
          start: 'Visitante começou a preencher o formulário',
          submit_attempt: 'Tentativa de envio',
          submit_success: 'Formulário enviado com sucesso',
          submit_error: 'Erro ao enviar o formulário',
        };
        return row(
          fe.created_at.slice(0, 10),
          fe.created_at.slice(11, 16),
          fe.event_type,
          desc[fe.event_type] ?? fe.event_type,
          (fe as { utm_source?: string | null }).utm_source ?? '',
          (fe as { utm_medium?: string | null }).utm_medium ?? '',
          (fe as { utm_campaign?: string | null }).utm_campaign ?? '',
          fe.session_id,
        );
      }),
      '',
    ];

    // ---- Top páginas ----
    const topPagesSection = [
      row('=== PÁGINAS MAIS VISITADAS ==='),
      row('Título', 'Visitas'),
      ...topPages.map(p => row(p.title, p.count)),
      '',
    ];

    // ---- Top fontes ----
    const sourcesSection = [
      row('=== ORIGEM DO TRÁFEGO ==='),
      row('Origem', 'Visitas'),
      ...topSources.map(s => row(s.source, s.count)),
      '',
    ];

    // ---- Conversão por origem ----
    const convSection = convBySource.length > 0 ? [
      row('=== CONVERSÃO POR ORIGEM ==='),
      row('Origem', 'Visitas', 'Cliques WA', 'Taxa de Conversão'),
      ...convBySource.map(c => row(c.source, c.visits, c.wa, c.rate.toFixed(1) + '%')),
      '',
    ] : [];

    const csv = [
      ...summary,
      ...pvSection,
      ...waSection,
      ...feSection,
      ...topPagesSection,
      ...sourcesSection,
      ...convSection,
    ].join('\n');

    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `borotec-analytics-${dateStr}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = async () => {
    if (!pdfRef.current) return;
    setExporting(true);
    const html2pdf = (await import('html2pdf.js')).default;
    const date = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
    await html2pdf()
      .set({
        margin: [10, 0, 10, 0],
        filename: `borotec-analytics-${date}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, backgroundColor: '#ffffff', logging: false, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css'], avoid: ['table', 'tr', '.pdf-section'] },
      })
      .from(pdfRef.current)
      .save();
    setExporting(false);
  };

  const [formEvents, setFormEvents] = useState<{ event_type: string; session_id: string | null; created_at: string }[]>([]);
  const [leads, setLeads] = useState<{ subject: string | null; created_at: string }[]>([]);

  const fetchViews = async () => {
    setLoading(true);
    const since = new Date();
    since.setDate(since.getDate() - 90);
    const [{ data: pvData }, { data: waData }, { data: feData }, { data: leadsData }] = await Promise.all([
      supabase
        .from('page_views')
        .select('id, path, page_title, utm_source, utm_medium, utm_campaign, session_id, city, region, country, created_at')
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: true }),
      supabase
        .from('whatsapp_clicks')
        .select('id, path, page_title, button_type, utm_source, utm_medium, utm_campaign, session_id, created_at')
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: true }),
      supabase
        .from('form_events')
        .select('event_type, session_id, created_at')
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: true }),
      supabase
        .from('leads')
        .select('subject, created_at')
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: true }),
    ]);
    setViews(pvData ?? []);
    setWaClicks(waData ?? []);
    setFormEvents(feData ?? []);
    setLeads(leadsData ?? []);
    setLastUpdated(new Date());
    setCountdown(180);
    setLoading(false);
  };

  useEffect(() => {
    fetchViews();
    const refresh = setInterval(fetchViews, 180_000);
    return () => clearInterval(refresh);
  }, []);

  useEffect(() => {
    if (!lastUpdated) return;
    const tick = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 180 : prev - 1));
    }, 1000);
    return () => clearInterval(tick);
  }, [lastUpdated]);

  const filtered = useMemo(() => {
    const start = new Date(dateRange.from); start.setHours(0, 0, 0, 0);
    const end   = new Date(dateRange.to);   end.setHours(23, 59, 59, 999);
    return views.filter(v => { const d = new Date(v.created_at); return d >= start && d <= end; });
  }, [views, dateRange]);

  const todayCount = useMemo(() => {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    return views.filter(v => new Date(v.created_at) >= start).length;
  }, [views]);

  const period = Math.max(1, Math.round(
    (new Date(dateRange.to).setHours(0, 0, 0, 0) - new Date(dateRange.from).setHours(0, 0, 0, 0)) / 86400000
  ) + 1);

  const uniqueSessions = useMemo(() =>
    new Set(filtered.map(v => v.session_id).filter(Boolean)).size, [filtered]);

  // Daily chart
  const dailyData = useMemo(() => {
    const DIAS_CURTOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const todayStr = new Date().toISOString().slice(0, 10);
    const days = [];
    const cur = new Date(dateRange.from); cur.setHours(0, 0, 0, 0);
    const end = new Date(dateRange.to);   end.setHours(23, 59, 59, 999);
    while (cur <= end) {
      const dateStr = cur.toISOString().slice(0, 10);
      const dow = cur.getDay();
      days.push({
        date: dateStr,
        label: cur.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        dowShort: DIAS_CURTOS[dow],
        isWeekend: dow === 0 || dow === 6,
        count: filtered.filter(v => v.created_at.slice(0, 10) === dateStr).length,
        isToday: dateStr === todayStr,
      });
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  }, [filtered, dateRange]);
  const maxDay = Math.max(...dailyData.map(d => d.count), 1);

  // Hourly heatmap
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, h) => ({ hour: h, count: 0 }));
    filtered.forEach(v => { hours[new Date(v.created_at).getHours()].count++; });
    return hours;
  }, [filtered]);
  const maxHour = Math.max(...hourlyData.map(h => h.count), 1);
  const peakHour = hourlyData.reduce((a, b) => b.count > a.count ? b : a, hourlyData[0]);

  const topPages = useMemo(() => groupByPath(filtered).slice(0, 8), [filtered]);
  const topProducts = useMemo(() =>
    groupByPath(filtered.filter(v => v.path.startsWith('/produtos/'))).slice(0, 8), [filtered]);
  const topSources = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach(v => {
      const src = v.utm_source && v.utm_source !== 'direto' ? v.utm_source : 'Direto / Orgânico';
      map.set(src, (map.get(src) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count);
  }, [filtered]);
  const topCities = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach(v => { if (v.city) map.set(v.city, (map.get(v.city) ?? 0) + 1); });
    return Array.from(map.entries()).map(([city, count]) => ({ city, count })).sort((a, b) => b.count - a.count).slice(0, 8);
  }, [filtered]);
  const topRegions = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach(v => { if (v.region) map.set(v.region, (map.get(v.region) ?? 0) + 1); });
    return Array.from(map.entries()).map(([region, count]) => ({ region, count })).sort((a, b) => b.count - a.count).slice(0, 8);
  }, [filtered]);

  // WhatsApp stats
  const filteredWa = useMemo(() => {
    const start = new Date(dateRange.from); start.setHours(0, 0, 0, 0);
    const end   = new Date(dateRange.to);   end.setHours(23, 59, 59, 999);
    return waClicks.filter(c => { const d = new Date(c.created_at); return d >= start && d <= end; });
  }, [waClicks, dateRange]);

  const filteredLeads = useMemo(() => {
    const start = new Date(dateRange.from); start.setHours(0, 0, 0, 0);
    const end   = new Date(dateRange.to);   end.setHours(23, 59, 59, 999);
    return leads.filter(l => { const d = new Date(l.created_at); return d >= start && d <= end; });
  }, [leads, dateRange]);

  const leadsByType = useMemo(() => {
    const contact   = filteredLeads.filter(l => !l.subject?.startsWith('Orçamento:') && !l.subject?.startsWith('Catálogo:')).length;
    const quote     = filteredLeads.filter(l => l.subject?.startsWith('Orçamento:')).length;
    const catalogue = filteredLeads.filter(l => l.subject?.startsWith('Catálogo:')).length;
    return { contact, quote, catalogue, total: filteredLeads.length };
  }, [filteredLeads]);

  const waByPage = useMemo(() => {
    const map = new Map<string, number>();
    filteredWa.forEach(c => {
      const label = c.page_title ?? c.path;
      map.set(label, (map.get(label) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([page, count]) => ({ page, count })).sort((a, b) => b.count - a.count).slice(0, 6);
  }, [filteredWa]);

  const waByType = useMemo(() => {
    const labels: Record<string, string> = {
      flutuante: 'Botão flutuante', produto: 'Página de produto',
      hero: 'Hero / Banner', contato: 'Contato', geral: 'Geral', carrinho: 'Carrinho',
    };
    const map = new Map<string, number>();
    filteredWa.forEach(c => {
      const t = c.button_type ?? 'desconhecido';
      map.set(labels[t] ?? t, (map.get(labels[t] ?? t) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count);
  }, [filteredWa]);

  const waBySource = useMemo(() => {
    const map = new Map<string, number>();
    filteredWa.forEach(c => {
      const src = c.utm_source && c.utm_source !== 'direto' ? c.utm_source : 'Direto / Orgânico';
      map.set(src, (map.get(src) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count);
  }, [filteredWa]);

  // ---- Feature 1: Conversion rate ----
  const conversionRate = filtered.length > 0
    ? ((filteredWa.length / filtered.length) * 100).toFixed(1)
    : '0.0';

  // ---- Feature 2: Week-over-week ----
  const weekStats = useMemo(() => {
    const now = new Date();
    const w0start = new Date(now); w0start.setDate(now.getDate() - 6); w0start.setHours(0, 0, 0, 0);
    const w1start = new Date(now); w1start.setDate(now.getDate() - 13); w1start.setHours(0, 0, 0, 0);
    const w1end   = new Date(now); w1end.setDate(now.getDate() - 7);   w1end.setHours(23, 59, 59, 999);
    const thisWeekViews = views.filter(v => new Date(v.created_at) >= w0start).length;
    const lastWeekViews = views.filter(v => { const d = new Date(v.created_at); return d >= w1start && d <= w1end; }).length;
    const thisWeekWa = waClicks.filter(c => new Date(c.created_at) >= w0start).length;
    const lastWeekWa = waClicks.filter(c => { const d = new Date(c.created_at); return d >= w1start && d <= w1end; }).length;
    const thisWeekForm = leads.filter(l => new Date(l.created_at) >= w0start).length;
    const lastWeekForm = leads.filter(l => { const d = new Date(l.created_at); return d >= w1start && d <= w1end; }).length;
    const viewsDiff = lastWeekViews > 0 ? ((thisWeekViews - lastWeekViews) / lastWeekViews) * 100 : null;
    const waDiff    = lastWeekWa    > 0 ? ((thisWeekWa    - lastWeekWa)    / lastWeekWa)    * 100 : null;
    const formDiff  = lastWeekForm  > 0 ? ((thisWeekForm  - lastWeekForm)  / lastWeekForm)  * 100 : null;
    return { thisWeekViews, lastWeekViews, thisWeekWa, lastWeekWa, thisWeekForm, lastWeekForm, viewsDiff, waDiff, formDiff };
  }, [views, waClicks, leads]);

  // ---- Feature 3: Conversion by source ----
  const convBySource = useMemo(() => {
    const visitMap = new Map<string, number>();
    filtered.forEach(v => {
      const src = v.utm_source && v.utm_source !== 'direto' ? v.utm_source : 'Direto / Orgânico';
      visitMap.set(src, (visitMap.get(src) ?? 0) + 1);
    });
    const waMap = new Map<string, number>();
    filteredWa.forEach(c => {
      const src = c.utm_source && c.utm_source !== 'direto' ? c.utm_source : 'Direto / Orgânico';
      waMap.set(src, (waMap.get(src) ?? 0) + 1);
    });
    return Array.from(visitMap.entries())
      .map(([source, visits]) => {
        const wa = waMap.get(source) ?? 0;
        return { source, visits, wa, rate: visits > 0 ? (wa / visits) * 100 : 0 };
      })
      .sort((a, b) => b.rate - a.rate);
  }, [filtered, filteredWa]);

  // ---- Feature 4: WA clicks by hour ----
  const waHourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, h) => ({ hour: h, count: 0 }));
    filteredWa.forEach(c => { hours[new Date(c.created_at).getHours()].count++; });
    return hours;
  }, [filteredWa]);
  const maxWaHour = Math.max(...waHourlyData.map(h => h.count), 1);
  const peakWaHour = waHourlyData.reduce((a, b) => b.count > a.count ? b : a, waHourlyData[0]);

  // ---- Feature 5: Products without visits ----
  const [allProducts, setAllProducts] = useState<{ id: string; name: string; slug: string }[]>([]);
  useEffect(() => {
    supabase.from('products').select('id, name, slug').then(({ data }) => {
      setAllProducts(data ?? []);
    });
  }, []);
  const productsWithoutVisits = useMemo(() => {
    const visitedSlugs = new Set(
      filtered.filter(v => v.path.startsWith('/produtos/')).map(v => v.path.split('/')[2])
    );
    return allProducts.filter(p => !visitedSlugs.has(p.slug));
  }, [allProducts, filtered]);

  // ---- Form metrics ----
  const formStats = useMemo(() => {
    const start = new Date(dateRange.from); start.setHours(0, 0, 0, 0);
    const end   = new Date(dateRange.to);   end.setHours(23, 59, 59, 999);
    const fe = formEvents.filter(e => { const d = new Date(e.created_at); return d >= start && d <= end; });
    const contactViews = filtered.filter(v => v.path === '/contato').length;
    const starts    = new Set(fe.filter(e => e.event_type === 'start').map(e => e.session_id)).size;
    const attempts  = fe.filter(e => e.event_type === 'submit_attempt').length;
    const successes = fe.filter(e => e.event_type === 'submit_success').length;
    const errors    = fe.filter(e => e.event_type === 'submit_error').length;
    const startRate   = contactViews > 0 ? ((starts    / contactViews) * 100).toFixed(1) : '0.0';
    const submitRate  = starts      > 0 ? ((successes / starts)       * 100).toFixed(1) : '0.0';
    return { contactViews, starts, attempts, successes, errors, startRate, submitRate };
  }, [formEvents, filtered, dateRange]);

  // ---- Bounce rate & avg pages/session ----
  const { bounceRate, avgPages } = useMemo(() => {
    const sessionCounts = new Map<string, number>();
    filtered.forEach(v => { if (v.session_id) sessionCounts.set(v.session_id, (sessionCounts.get(v.session_id) ?? 0) + 1); });
    const total = sessionCounts.size;
    if (total === 0) return { bounceRate: '–', avgPages: '–' };
    const bounces = Array.from(sessionCounts.values()).filter(c => c === 1).length;
    return {
      bounceRate: `${Math.round((bounces / total) * 100)}%`,
      avgPages: (filtered.length / total).toFixed(1),
    };
  }, [filtered]);

  // ---- Previous period (for comparison overlay) ----
  const prevDailyData = useMemo(() => {
    if (!showComparison) return [] as { date: string; count: number }[];
    const days: { date: string; count: number }[] = [];
    const cur = new Date(dateRange.from); cur.setDate(cur.getDate() - period); cur.setHours(0, 0, 0, 0);
    const end = new Date(dateRange.from); end.setDate(end.getDate() - 1); end.setHours(23, 59, 59, 999);
    while (cur <= end) {
      const dateStr = cur.toISOString().slice(0, 10);
      days.push({ date: dateStr, count: views.filter(v => v.created_at.slice(0, 10) === dateStr).length });
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  }, [views, dateRange, period, showComparison]);

  // ---- Weekday × Hour heatmap ----
  const weekdayHourHeatmap = useMemo(() => {
    const grid: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0));
    filtered.forEach(v => { const d = new Date(v.created_at); grid[d.getDay()][d.getHours()]++; });
    return grid;
  }, [filtered]);
  const maxHeatmapCell = Math.max(...weekdayHourHeatmap.flat(), 1);

  const maxPage = topPages[0]?.count ?? 1;
  const maxProduct = topProducts[0]?.count ?? 1;
  const maxSource = topSources[0]?.count ?? 1;
  const maxCity = topCities[0]?.count ?? 1;
  const maxRegion = topRegions[0]?.count ?? 1;
  const maxWaPage = waByPage[0]?.count ?? 1;
  const maxWaType = waByType[0]?.count ?? 1;
  const maxWaSource = waBySource[0]?.count ?? 1;
  const hasGeo = topCities.length > 0 || topRegions.length > 0;

  const hourLabel = (h: number) => `${String(h).padStart(2, '0')}h`;
  const periodOf = (h: number) =>
    h < 6 ? { label: 'Madrugada', color: 'bg-indigo-500' }
    : h < 12 ? { label: 'Manhã', color: 'bg-yellow-400' }
    : h < 18 ? { label: 'Tarde', color: 'bg-accent' }
    : { label: 'Noite', color: 'bg-cyan' };

  // Helpers reutilizáveis para seção
  const SectionCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-navy-dark/40 border border-primary-foreground/10 rounded-2xl p-6 ${className}`}>{children}</div>
  );
  const SectionTitle = ({ icon: Icon, label, color = 'text-cyan', badge }: { icon: React.ElementType; label: string; color?: string; badge?: React.ReactNode }) => (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-heading font-bold text-primary-foreground flex items-center gap-2">
        <Icon className={`w-4 h-4 ${color}`} /> {label}
      </h2>
      {badge}
    </div>
  );
  const Badge = ({ children, color = 'bg-cyan/10 text-cyan border-cyan/20' }: { children: React.ReactNode; color?: string }) => (
    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${color}`}>{children}</span>
  );
  const MiniCard = ({ value, label, color = 'text-primary-foreground' }: { value: React.ReactNode; label: string; color?: string }) => (
    <div className="bg-charcoal/50 rounded-xl p-4 text-center">
      <p className={`text-2xl font-black font-heading ${color}`}>{value}</p>
      <p className="text-xs text-primary-foreground/40 mt-1 leading-tight">{label}</p>
    </div>
  );

  const aTabItems: { id: typeof aTab; label: string; icon: React.ElementType }[] = [
    { id: 'geral',    label: 'Visão Geral', icon: BarChart2 },
    { id: 'whatsapp', label: 'WhatsApp',    icon: MessageCircle },
    { id: 'form',     label: 'Formulário',  icon: Send },
    { id: 'produtos', label: 'Produtos',    icon: Eye },
  ];

  return (
    <div className="space-y-6">

      {/* ---- PDF oculto ---- */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1 }}>
        <div ref={pdfRef}>
          <PdfReport data={{
            period, totalVisits: filtered.length, todayCount, uniqueSessions,
            waTotal: filteredWa.length, conversionRate, weekStats, convBySource,
            waHourlyData, productsWithoutVisits,
            topPages: topPages.map(p => ({ title: p.title, count: p.count })),
            topProducts: topProducts.map(p => ({ title: p.title, count: p.count })),
            topSources, topCities, topRegions, waByPage, waByType, waBySource,
            dailyData: dailyData.map(d => ({ label: d.label, date: d.date, count: d.count })),
            bounceRate, avgPages, formStats, weekdayHourHeatmap,
          }} />
        </div>
      </div>

      {/* ---- Topo: título + controles ---- */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary-foreground flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-accent" /> Analytics
          </h1>
          {lastUpdated && (
            <div className="flex items-center gap-1.5 text-xs text-primary-foreground/30 mt-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan/60" />
              </span>
              Atualizado às {lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              {' · '}próxima atualização em <span className="font-mono text-cyan">{countdown}s</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* GA4-style date range picker */}
          {(() => {
            const presets = makeDatePresets();
            const fmtDate = (d: Date) => format(d, "dd 'de' MMM. 'de' yyyy", { locale: ptBR });
            const fmtRange = (from: Date, to: Date) => {
              const sameYear = from.getFullYear() === to.getFullYear();
              const f = format(from, sameYear ? "dd 'de' MMM" : "dd 'de' MMM yyyy", { locale: ptBR });
              const t = format(to, "dd 'de' MMM 'de' yyyy", { locale: ptBR });
              return from.toDateString() === to.toDateString() ? format(from, "dd 'de' MMM 'de' yyyy", { locale: ptBR }) : `${f} – ${t}`;
            };
            const presetLabel = activePreset !== 'custom' ? presets.find(p => p.id === activePreset)?.label : 'Personalizado';
            const handleOpen = (open: boolean) => {
              if (open) {
                setPendingRange({ from: dateRange.from, to: dateRange.to });
                setPendingPreset(activePreset);
              }
              setPickerOpen(open);
            };
            const handleApply = () => {
              const from = pendingRange.from;
              const to = pendingRange.to ?? pendingRange.from;
              setDateRange({ from, to });
              setActivePreset(pendingPreset);
              setPickerOpen(false);
            };
            const handleCancel = () => {
              setPendingRange({ from: dateRange.from, to: dateRange.to });
              setPendingPreset(activePreset);
              setPickerOpen(false);
            };
            return (
              <Popover open={pickerOpen} onOpenChange={handleOpen}>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 bg-navy-dark/40 border border-primary-foreground/10 hover:border-primary-foreground/30 text-primary-foreground/80 hover:text-primary-foreground rounded-lg text-sm font-medium transition-colors">
                    <CalendarIcon className="w-4 h-4 text-cyan flex-shrink-0" />
                    {presetLabel && <span className="text-primary-foreground font-semibold">{presetLabel}</span>}
                    {presetLabel && <span className="text-primary-foreground/30">|</span>}
                    <span className="text-primary-foreground/60">{fmtRange(dateRange.from, dateRange.to)}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end" sideOffset={8}>
                  <div className="flex">
                    {/* Presets */}
                    <div className="border-r border-border py-2 min-w-[170px]">
                      {presets.map(preset => (
                        <button key={preset.id}
                          onClick={() => { setPendingRange({ from: preset.range.from, to: preset.range.to }); setPendingPreset(preset.id); }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${pendingPreset === preset.id ? 'bg-accent/10 text-accent font-semibold' : 'text-foreground/70 hover:bg-muted hover:text-foreground'}`}>
                          {preset.label}
                        </button>
                      ))}
                      <div className="border-t border-border mt-2 pt-2">
                        <button
                          onClick={() => setPendingPreset('custom')}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${pendingPreset === 'custom' ? 'bg-accent/10 text-accent font-semibold' : 'text-foreground/70 hover:bg-muted hover:text-foreground'}`}>
                          Personalizado
                        </button>
                      </div>
                    </div>
                    {/* Calendar range */}
                    <div className="flex flex-col">
                      <div className="p-3">
                        <div className="flex gap-2 mb-3 text-xs">
                          <div className={`flex-1 border rounded px-2 py-1.5 transition-colors ${!pendingRange.to ? 'border-accent' : 'border-border'}`}>
                            <span className="text-[9px] uppercase tracking-wide block text-muted-foreground/50 mb-0.5">Data de início</span>
                            <span className="font-medium">{fmtDate(pendingRange.from)}</span>
                          </div>
                          <div className="self-center text-muted-foreground/30">→</div>
                          <div className={`flex-1 border rounded px-2 py-1.5 transition-colors ${!pendingRange.to ? 'border-border opacity-40' : 'border-border'}`}>
                            <span className="text-[9px] uppercase tracking-wide block text-muted-foreground/50 mb-0.5">Data de término</span>
                            <span className="font-medium">{pendingRange.to ? fmtDate(pendingRange.to) : '–'}</span>
                          </div>
                        </div>
                        <Calendar
                          mode="range"
                          selected={{ from: pendingRange.from, to: pendingRange.to }}
                          onSelect={(range) => {
                            if (range?.from) {
                              setPendingRange({ from: range.from, to: range.to });
                              setPendingPreset('custom');
                            }
                          }}
                          disabled={{ after: new Date() }}
                          locale={ptBR}
                          initialFocus
                        />
                      </div>
                      {/* Aplicar / Cancelar */}
                      <div className="border-t border-border px-3 py-2 flex justify-end gap-2">
                        <button onClick={handleCancel}
                          className="px-4 py-1.5 rounded-lg text-sm text-foreground/60 hover:text-foreground hover:bg-muted transition-colors">
                          Cancelar
                        </button>
                        <button onClick={handleApply}
                          className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-colors">
                          Aplicar
                        </button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })()}

          <button onClick={fetchViews} disabled={loading}
            className="p-2 text-primary-foreground/40 hover:text-cyan transition-colors disabled:opacity-40" title="Atualizar">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={exportCsv} disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-primary-foreground/5 hover:bg-primary-foreground/10 text-primary-foreground/60 hover:text-primary-foreground border border-primary-foreground/10 rounded-lg text-sm font-medium transition-colors disabled:opacity-40"
            title="Exportar dados do período selecionado">
            <Download className="w-4 h-4" /> CSV
          </button>
          <button onClick={exportAllData} disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 rounded-lg text-sm font-medium transition-colors disabled:opacity-40"
            title="Backup completo de todos os dados coletados">
            <Download className="w-4 h-4" /> Backup completo
          </button>
          <button onClick={exportPdf} disabled={exporting || loading}
            className="flex items-center gap-2 px-3 py-2 bg-cyan/10 hover:bg-cyan/20 text-cyan border border-cyan/30 rounded-lg text-sm font-medium transition-colors disabled:opacity-40">
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {exporting ? 'Gerando...' : 'PDF'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-cyan" />
          <p className="text-primary-foreground/30 text-sm">Carregando dados⬦</p>
        </div>
      ) : (<>

        {/* ---- KPI Strip ---- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: 'Hoje',         value: todayCount,            color: 'text-primary-foreground', sub: 'visitas',      tooltip: 'Total de pageviews registrados hoje (desde meia-noite).' },
            { label: (() => { const presets = makeDatePresets(); return activePreset !== 'custom' ? (presets.find(p => p.id === activePreset)?.label ?? `${period}d`) : `${format(dateRange.from, 'dd/MM')} – ${format(dateRange.to, 'dd/MM')}`; })(), value: filtered.length, color: 'text-primary-foreground', sub: 'visitas totais', tooltip: 'Soma de todas as páginas visualizadas no período selecionado. Uma mesma pessoa acessando 3 páginas conta como 3 visitas.' },
            { label: 'Sessões',      value: uniqueSessions,        color: 'text-cyan',               sub: 'únicas',       tooltip: 'Número de visitantes distintos no período, identificados por ID de sessão. Dá uma ideia de quantas pessoas (não pageviews) acessaram o site.' },
            { label: 'WhatsApp',     value: filteredWa.length,     color: 'text-[#25D366]',          sub: 'cliques',      tooltip: 'Total de cliques em qualquer botão de WhatsApp do site no período.' },
            { label: 'Conversão WA', value: `${conversionRate}%`,  color: 'text-accent',             sub: 'visitas → WA', tooltip: 'Percentual de visitas que resultaram em um clique no WhatsApp. Indica o quanto o site está convertendo visitantes em contatos.' },
            { label: 'Formulários',  value: leadsByType.total,     color: 'text-cyan',               sub: 'enviados',     tooltip: 'Total de formulários enviados no período: contato, orçamento de produto e solicitação de catálogo.' },
            { label: 'Rejeição',     value: bounceRate,            color: bounceRate !== '–' && parseInt(bounceRate) > 70 ? 'text-red-400' : bounceRate !== '–' && parseInt(bounceRate) < 40 ? 'text-green-400' : 'text-primary-foreground', sub: 'bounce rate', tooltip: 'Percentual de sessões em que o visitante viu apenas 1 página e saiu. Abaixo de 40% é ótimo; acima de 70% indica que a página inicial não está engajando.' },
          ].map(({ label, value, color, sub, tooltip }) => (
            <div key={label} className="relative group bg-navy-dark/40 border border-primary-foreground/10 rounded-xl p-4 text-center hover:border-primary-foreground/25 transition-colors cursor-default">
              <p className={`text-2xl font-black font-heading ${color}`}>{value}</p>
              <p className="text-[11px] font-semibold text-primary-foreground/60 mt-0.5">{label}</p>
              <p className="text-[10px] text-primary-foreground/25">{sub}</p>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-charcoal border border-primary-foreground/20 rounded-lg px-3 py-2 text-xs text-primary-foreground/80 leading-relaxed shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                {tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-charcoal" />
              </div>
            </div>
          ))}
        </div>

        {/* ---- Sub-navegação ---- */}
        <div className="flex gap-1 bg-navy-dark/60 border border-primary-foreground/10 rounded-xl p-1">
          {aTabItems.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setATab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${aTab === id ? 'bg-charcoal text-primary-foreground shadow-sm' : 'text-primary-foreground/40 hover:text-primary-foreground/70'}`}>
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ==== TAB: VISÃO GERAL ==== */}
        {aTab === 'geral' && (
          <div className="space-y-6">
            {/* Comparativo semanal */}
            <SectionCard>
              <SectionTitle icon={BarChart2} label="Esta semana vs. semana anterior" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Visitas',     curr: weekStats.thisWeekViews, prev: weekStats.lastWeekViews, diff: weekStats.viewsDiff, color: 'text-cyan' },
                  { label: 'WhatsApp',    curr: weekStats.thisWeekWa,    prev: weekStats.lastWeekWa,    diff: weekStats.waDiff,    color: 'text-[#25D366]' },
                  { label: 'Formulários', curr: weekStats.thisWeekForm,  prev: weekStats.lastWeekForm,  diff: weekStats.formDiff,  color: 'text-accent' },
                ].map(({ label, curr, prev, diff, color }) => (
                  <div key={label} className="bg-charcoal/30 rounded-xl p-4 flex flex-col gap-3">
                    <p className="text-xs text-primary-foreground/40 uppercase tracking-wide font-semibold">{label}</p>
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className={`text-4xl font-black font-heading leading-none ${color}`}>{curr}</p>
                        <p className="text-[10px] text-primary-foreground/30 mt-1">esta semana</p>
                      </div>
                      <div className="text-right pb-0.5">
                        <p className="text-2xl font-bold text-primary-foreground/40 leading-none">{prev}</p>
                        <p className="text-[10px] text-primary-foreground/25 mt-1">semana ant.</p>
                      </div>
                    </div>
                    <div className={`h-px ${diff === null ? 'bg-primary-foreground/10' : diff >= 0 ? 'bg-green-500/30' : 'bg-red-500/30'}`} />
                    <p className={`text-xs font-bold ${diff === null ? 'text-primary-foreground/20' : diff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {diff === null ? 'sem dados anteriores' : `${diff >= 0 ? '↑ ' : '↓ '} ${Math.abs(diff).toFixed(1)}% em relação à semana passada`}
                    </p>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Funil de conversão */}
            {(() => {
              const total = filtered.length;
              const steps = [
                { label: 'Visitas totais',       value: total,                    color: 'bg-cyan',         pct: 100 },
                { label: 'Visitou /contato',     value: formStats.contactViews,   color: 'bg-cyan/70',      pct: total > 0 ? (formStats.contactViews / total) * 100 : 0 },
                { label: 'Iniciou formulário',   value: formStats.starts,         color: 'bg-accent/80',    pct: total > 0 ? (formStats.starts / total) * 100 : 0 },
                { label: 'Enviou formulário',    value: leadsByType.total,        color: 'bg-accent',       pct: total > 0 ? (leadsByType.total / total) * 100 : 0 },
                { label: 'Clicou WhatsApp',      value: filteredWa.length,        color: 'bg-[#25D366]',    pct: total > 0 ? (filteredWa.length / total) * 100 : 0 },
              ];
              return (
                <SectionCard>
                  <SectionTitle icon={TrendingUp} label="Funil de conversão"
                    badge={<Badge color="bg-accent/10 text-accent border-accent/20">
                      {total > 0 ? ((leadsByType.total + filteredWa.length) / total * 100).toFixed(1) : '0.0'}% conversão total
                    </Badge>} />
                  <div className="space-y-3">
                    {steps.map((step, i) => (
                      <div key={step.label} className="flex items-center gap-4">
                        <div className="w-36 text-xs text-primary-foreground/60 text-right flex-shrink-0">{step.label}</div>
                        <div className="flex-1 relative h-7 bg-primary-foreground/5 rounded-lg overflow-hidden">
                          <div className={`h-full rounded-lg transition-all duration-700 ${step.color} flex items-center px-2`}
                            style={{ width: `${Math.max(step.pct, step.value > 0 ? 2 : 0)}%` }}>
                            {step.value > 0 && <span className="text-[11px] font-bold text-navy-dark whitespace-nowrap">{step.value}</span>}
                          </div>
                        </div>
                        <div className="w-12 text-xs font-mono text-primary-foreground/40 text-right flex-shrink-0">
                          {step.pct.toFixed(1)}%
                        </div>
                        {i > 0 && steps[i - 1].value > 0 && (
                          <div className={`w-14 text-[10px] font-semibold text-right flex-shrink-0 ${step.value / steps[i-1].value >= 0.5 ? 'text-green-400' : 'text-red-400'}`}>
                            → {((step.value / steps[i-1].value) * 100).toFixed(0)}%
                          </div>
                        )}
                        {i === 0 && <div className="w-14 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-primary-foreground/25 mt-4">A coluna "→ X%" mostra a taxa de conversão entre cada etapa consecutiva do funil.</p>
                </SectionCard>
              );
            })()}

            {/* Gráfico diário */}
            <SectionCard>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan" />
                  <h2 className="font-heading font-bold text-primary-foreground">Visitas por dia</h2>
                  <Badge>{filtered.length} visitas em {period} dias</Badge>
                </div>
                <button onClick={() => setShowComparison(v => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${showComparison ? 'bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20' : 'text-primary-foreground/40 border-primary-foreground/10 hover:text-primary-foreground/70'}`}>
                  <span className="w-3 h-0.5 bg-current rounded opacity-60 border-dashed" />
                  Período anterior
                </button>
              </div>
              {showComparison && (
                <div className="flex items-center gap-4 mb-3 text-[10px] text-primary-foreground/40">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-cyan/60 inline-block" /> Período atual</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 border-t-2 border-dashed border-primary-foreground/30 inline-block" /> Período anterior</span>
                </div>
              )}
              <div className="flex items-end h-36">
                {dailyData.map((day, idx) => {
                  const prevCount = showComparison && prevDailyData[idx] ? prevDailyData[idx].count : null;
                  const prevPct = prevCount !== null && maxDay ? Math.max((prevCount / maxDay) * 100, prevCount > 0 ? 4 : 0) : 0;
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-charcoal border border-primary-foreground/20 rounded-lg px-2 py-1 text-[10px] text-primary-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <span className="text-primary-foreground/50">{day.dowShort} {day.label}</span>{' '}
                        <span className="font-bold text-cyan">{day.count}</span>
                        {prevCount !== null && <span className="text-primary-foreground/40"> · ant: {prevCount}</span>}
                      </div>
                      <div className="w-full flex items-end relative" style={{ height: '120px' }}>
                        {/* Barra período anterior (fundo) */}
                        {prevCount !== null && (
                          <div className="absolute bottom-0 w-full rounded-t border-t-2 border-dashed border-primary-foreground/25 opacity-50"
                            style={{ height: `${prevPct}%` }} />
                        )}
                        {/* Barra atual */}
                        <div className={`w-full rounded-t transition-all duration-500 flex items-start justify-center pt-1 ${day.isToday ? 'bg-accent' : day.isWeekend ? 'bg-cyan/30 group-hover:bg-cyan/60' : 'bg-cyan/60 group-hover:bg-cyan'}`}
                          style={{ height: `${maxDay ? Math.max((day.count / maxDay) * 100, day.count > 0 ? 8 : 0) : 0}%` }}>
                          {day.count > 0 && <span className={`text-[10px] font-bold leading-none ${day.isToday ? 'text-white' : 'text-navy-dark'}`}>{day.count}</span>}
                        </div>
                      </div>
                      {period <= 7 ? (
                        <div className="flex flex-col items-center gap-0.5">
                          <span className={`text-xs font-semibold ${day.isToday ? 'text-accent' : day.isWeekend ? 'text-primary-foreground/50' : 'text-primary-foreground/70'}`}>{day.dowShort}</span>
                          <span className={`text-[10px] ${day.isToday ? 'text-accent/70' : 'text-primary-foreground/40'}`}>{day.label}</span>
                        </div>
                      ) : ((period <= 15 && idx % 2 === 0) || (period > 15 && idx % 4 === 0) || day.isToday) ? (
                        <div className="flex flex-col items-center gap-0.5">
                          <span className={`text-[10px] font-semibold ${day.isToday ? 'text-accent' : day.isWeekend ? 'text-primary-foreground/45' : 'text-primary-foreground/60'}`}>{day.dowShort}</span>
                          <span className={`text-[9px] ${day.isToday ? 'text-accent/70' : 'text-primary-foreground/30'}`}>{day.label}</span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            {/* Páginas + Origem */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SectionCard>
                <SectionTitle icon={Eye} label="Páginas mais acessadas" />
                {topPages.length === 0
                  ? <p className="text-primary-foreground/30 text-sm text-center py-8">Sem dados ainda</p>
                  : <div className="space-y-2.5">
                      {topPages.map((p, i) => (
                        <div key={p.path} className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 border ${rankColor(i)}`}>{i + 1}</span>
                          <span className="text-xs text-primary-foreground/70 truncate flex-1" title={p.title}>{p.title}</span>
                          <HBar count={p.count} max={maxPage} />
                          <span className="text-xs font-mono text-primary-foreground/50 w-7 text-right">{p.count}</span>
                        </div>
                      ))}
                    </div>}
              </SectionCard>
              <SectionCard>
                <SectionTitle icon={Globe} label="Origem do tráfego" color="text-accent" />
                {topSources.length === 0
                  ? <p className="text-primary-foreground/30 text-sm text-center py-8">Sem dados ainda</p>
                  : <div className="space-y-2.5">
                      {topSources.map((s, i) => (
                        <div key={s.source} className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 border ${rankColor(i)}`}>{i + 1}</span>
                          <span className="text-xs text-primary-foreground/70 truncate flex-1">{s.source}</span>
                          <HBar count={s.count} max={maxSource} color="bg-accent" />
                          <span className="text-xs font-mono text-primary-foreground/50 w-7 text-right">{s.count}</span>
                        </div>
                      ))}
                    </div>}
              </SectionCard>
            </div>

            {/* Heatmap dia da semana × hora */}
            {(() => {
              const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
              const HOURS = Array.from({ length: 24 }, (_, i) => i);
              const cellColor = (v: number) => {
                if (v === 0) return 'bg-primary-foreground/[0.06]';
                const pct = v / maxHeatmapCell;
                if (pct >= 0.75) return 'bg-green-500';
                if (pct >= 0.5)  return 'bg-orange-400';
                if (pct >= 0.25) return 'bg-yellow-400';
                return 'bg-red-400/70';
              };
              const cellTextColor = (v: number) => {
                if (v === 0) return 'text-primary-foreground/20';
                const pct = v / maxHeatmapCell;
                return pct >= 0.25 ? 'text-navy-dark font-bold' : 'text-white/80 font-bold';
              };
              return (
                <SectionCard>
                  <SectionTitle icon={Clock} label="Heatmap: dia da semana × hora" color="text-accent"
                    badge={<Badge color="bg-accent/10 text-accent border-accent/20">quando seu público visita</Badge>} />
                  <div>
                    <table className="text-[9px] border-collapse" style={{ tableLayout: 'fixed', width: '100%' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '32px' }} />
                          {HOURS.map(h => (
                            <th key={h} style={{ width: '3.8%' }}
                              className="text-center font-normal pb-1.5 text-primary-foreground/40">
                              {h}h
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {DAYS.map((day, dIdx) => (
                          <tr key={day}>
                            <td className="text-right text-primary-foreground/50 font-semibold pr-2 text-[10px]">{day}</td>
                            {HOURS.map(h => {
                              const val = weekdayHourHeatmap[dIdx][h];
                              return (
                                <td key={h} className="p-0.5">
                                  <div className={`group relative rounded-sm ${cellColor(val)} transition-colors flex items-center justify-center border border-primary-foreground/10`}
                                    style={{ height: '22px' }}>
                                    <span className={`text-[9px] leading-none ${cellTextColor(val)}`}>{val}</span>
                                    {val > 0 && (
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-charcoal border border-primary-foreground/20 rounded px-1.5 py-0.5 text-[9px] text-primary-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-10">
                                        {day} {h}h: <span className="font-bold text-green-400">{val}</span>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-[10px] text-primary-foreground/40 flex-wrap">
                    <span className="font-medium">Intensidade:</span>
                    {[
                      ['bg-primary-foreground/8', 'Sem visitas'],
                      ['bg-red-400/70',           'Baixa'],
                      ['bg-yellow-400',            'Média'],
                      ['bg-orange-400',            'Alta'],
                      ['bg-green-500',             'Pico'],
                    ].map(([c, l]) => (
                      <span key={l} className="flex items-center gap-1.5">
                        <span className={`w-3.5 h-3.5 rounded-sm ${c} flex-shrink-0`} />{l}
                      </span>
                    ))}
                  </div>
                </SectionCard>
              );
            })()}

            {/* Geolocalização */}
            {hasGeo ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SectionCard>
                  <SectionTitle icon={MapPin} label="Top Cidades" />
                  <div className="space-y-2.5">
                    {topCities.map(({ city, count }, i) => (
                      <div key={city} className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 border ${rankColor(i)}`}>{i + 1}</span>
                        <span className="text-sm text-primary-foreground/80 flex-1 truncate">{city}</span>
                        <HBar count={count} max={maxCity} />
                        <span className="text-xs font-mono font-bold text-primary-foreground/60 w-7 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </SectionCard>
                <SectionCard>
                  <SectionTitle icon={Globe} label="Top Estados" color="text-accent" />
                  <div className="space-y-2.5">
                    {topRegions.map(({ region, count }, i) => (
                      <div key={region} className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 border ${rankColor(i)}`}>{i + 1}</span>
                        <span className="text-sm text-primary-foreground/80 flex-1 truncate">{region}</span>
                        <HBar count={count} max={maxRegion} color="bg-accent" />
                        <span className="text-xs font-mono font-bold text-primary-foreground/60 w-7 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            ) : (
              <SectionCard>
                <div className="text-center py-6">
                  <MapPin className="w-8 h-8 text-primary-foreground/10 mx-auto mb-2" />
                  <p className="text-primary-foreground/30 text-sm">Dados de localização aparecerão nas próximas visitas</p>
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {/* ==== TAB: WHATSAPP ==== */}
        {aTab === 'whatsapp' && (() => {
          const btnLabels: Record<string, string> = {
            flutuante: 'Botão Flutuante', produto: 'Página de Produto',
            hero: 'Hero / Banner', contato: 'Contato', geral: 'CTA Geral',
            'linha-m': 'Linha Máquinas', 'linha-p': 'Linha Poços',
            'linha-r': 'Linha Robô', 'linha-t': 'Linha Tubulações',
            'linha-e': 'Linha Especiais', 'linha-tc': 'Linha Telescopia',
          };
          const byBtn = new Map<string, { count: number; pages: Map<string, number>; sources: Map<string, number> }>();
          filteredWa.forEach(c => {
            const key = btnLabels[c.button_type ?? ''] ?? (c.button_type ?? 'Desconhecido');
            if (!byBtn.has(key)) byBtn.set(key, { count: 0, pages: new Map(), sources: new Map() });
            const e = byBtn.get(key)!;
            e.count++;
            const pg = c.page_title ?? c.path;
            e.pages.set(pg, (e.pages.get(pg) ?? 0) + 1);
            const src = c.utm_source && c.utm_source !== 'direto' ? c.utm_source : 'Direto / Orgânico';
            e.sources.set(src, (e.sources.get(src) ?? 0) + 1);
          });
          const btnRows = [...byBtn.entries()]
            .map(([label, d]) => ({
              label, count: d.count,
              topPage:   [...d.pages.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '–',
              topSource: [...d.sources.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '–',
            }))
            .sort((a, b) => b.count - a.count);

          const waGrid: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0));
          filteredWa.forEach(c => { const d = new Date(c.created_at); waGrid[d.getDay()][d.getHours()]++; });
          const waGridMax = Math.max(...waGrid.flat(), 1);

          const topBtn = btnRows[0];
          const topSrc = waBySource[0];
          const topPg  = waByPage[0];

          return (
            <div className="space-y-6">
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MiniCard value={filteredWa.length} label="Cliques totais" color="text-[#25D366]" />
                <MiniCard value={`${conversionRate}%`} label="Taxa de conversão" color="text-accent" />
                <MiniCard value={weekStats.thisWeekWa} label="Esta semana" color="text-cyan" />
                <MiniCard value={peakWaHour.count > 0 ? hourLabel(peakWaHour.hour) : '–'} label="Horário de pico" color="text-[#25D366]" />
              </div>

              {filteredWa.length === 0 ? (
                <SectionCard>
                  <p className="text-primary-foreground/30 text-sm text-center py-8">Sem cliques registrados no período</p>
                </SectionCard>
              ) : (<>

                {/* Análise automática */}
                <SectionCard>
                  <SectionTitle icon={TrendingUp} label="Análise automática" color="text-[#25D366]" />
                  <div className="space-y-2.5">
                    {topBtn && (
                      <p className="text-sm text-primary-foreground/70 flex items-start gap-2">
                        <span className="text-[#25D366] flex-shrink-0 mt-0.5">⬢</span>
                        O botão mais clicado é <span className="text-primary-foreground font-semibold mx-1">"{topBtn.label}"</span>
                        com <span className="text-[#25D366] font-semibold mx-1">{topBtn.count} clique{topBtn.count !== 1 ? 's' : ''}</span>
                        ({Math.round((topBtn.count / filteredWa.length) * 100)}% do total), vindo principalmente de <span className="text-cyan mx-1 font-medium">{topBtn.topSource}</span>.
                      </p>
                    )}
                    {topPg && (
                      <p className="text-sm text-primary-foreground/70 flex items-start gap-2">
                        <span className="text-[#25D366] flex-shrink-0 mt-0.5">⬢</span>
                        A página que mais gera cliques é <span className="text-primary-foreground font-semibold mx-1">"{topPg.page}"</span>
                        com <span className="text-[#25D366] font-semibold mx-1">{topPg.count} clique{topPg.count !== 1 ? 's' : ''}</span>
                        ({Math.round((topPg.count / filteredWa.length) * 100)}% do total).
                      </p>
                    )}
                    {topSrc && (
                      <p className="text-sm text-primary-foreground/70 flex items-start gap-2">
                        <span className="text-[#25D366] flex-shrink-0 mt-0.5">⬢</span>
                        A origem com mais cliques é <span className="text-primary-foreground font-semibold mx-1">"{topSrc.source}"</span>
                        com <span className="text-[#25D366] font-semibold mx-1">{topSrc.count}</span> clique{topSrc.count !== 1 ? 's' : ''}.
                        {convBySource.length > 1 && (() => {
                          const best = [...convBySource].sort((a, b) => b.rate - a.rate)[0];
                          return best.source !== topSrc.source
                            ? <span> Mas a maior taxa de conversão é de <span className="text-accent font-semibold mx-1">{best.source}</span> com {best.rate.toFixed(1)}%.</span>
                            : null;
                        })()}
                      </p>
                    )}
                    {peakWaHour.count > 0 && (
                      <p className="text-sm text-primary-foreground/70 flex items-start gap-2">
                        <span className="text-[#25D366] flex-shrink-0 mt-0.5">⬢</span>
                        Pico às <span className="text-primary-foreground font-semibold mx-1">{hourLabel(peakWaHour.hour)}</span>
                        com {peakWaHour.count} clique{peakWaHour.count !== 1 ? 's' : ''} — ideal para disparar campanhas neste horário.
                      </p>
                    )}
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-primary-foreground/8 mt-2">
                    <span className="text-yellow-400 text-sm flex-shrink-0 mt-0.5">💡</span>
                    <p className="text-xs text-primary-foreground/40 leading-relaxed">
                      <span className="font-semibold text-primary-foreground/50">Cliques no botão WhatsApp:</span> representa o número de vezes que o botão foi acionado. Esse dado não confirma que o usuário iniciou a conversa — apenas que houve intenção de contato.
                    </p>
                  </div>
                </SectionCard>

                {/* Tabela: por botão × página × origem */}
                <SectionCard>
                  <SectionTitle icon={MessageCircle} label="Cliques por botão" color="text-[#25D366]"
                    badge={<Badge color="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">{btnRows.length} tipo{btnRows.length !== 1 ? 's' : ''} de botão</Badge>} />
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary-foreground/10 text-primary-foreground/40 text-xs uppercase tracking-wide">
                          <th className="text-left py-2 pr-4 font-medium">Botão</th>
                          <th className="text-right py-2 px-3 font-medium">Cliques</th>
                          <th className="text-left py-2 px-3 font-medium hidden md:table-cell">Página principal</th>
                          <th className="text-left py-2 pl-3 font-medium hidden lg:table-cell">Origem principal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {btnRows.map(({ label, count, topPage, topSource }, i) => {
                          const pct = Math.round((count / filteredWa.length) * 100);
                          return (
                            <tr key={label} className="border-b border-primary-foreground/5 hover:bg-primary-foreground/3 transition-colors">
                              <td className="py-3 pr-4">
                                <div className="flex items-center gap-2.5">
                                  <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 border ${rankColor(i)}`}>{i + 1}</span>
                                  <span className="font-medium text-primary-foreground">{label}</span>
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <div className="flex items-center justify-end gap-2">
                                  <div className="w-20 bg-primary-foreground/8 rounded-full h-1.5 hidden sm:block">
                                    <div className="h-1.5 rounded-full bg-[#25D366]" style={{ width: `${pct}%` }} />
                                  </div>
                                  <span className="font-black text-[#25D366] font-heading text-lg leading-none">{count}</span>
                                  <span className="text-[10px] text-primary-foreground/30 w-8">{pct}%</span>
                                </div>
                              </td>
                              <td className="py-3 px-3 hidden md:table-cell">
                                <span className="text-xs text-primary-foreground/60 truncate max-w-[180px] block">{topPage}</span>
                              </td>
                              <td className="py-3 pl-3 hidden lg:table-cell">
                                <span className="text-xs font-mono text-primary-foreground/50">{topSource}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>

                {/* Heatmap dia × hora – WA */}
                {(() => {
                  const DAYS  = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                  const HOURS = Array.from({ length: 24 }, (_, i) => i);
                  const cellBg = (v: number) => {
                    if (v === 0) return 'bg-primary-foreground/[0.06]';
                    const p = v / waGridMax;
                    if (p >= 0.75) return 'bg-green-500';
                    if (p >= 0.5)  return 'bg-orange-400';
                    if (p >= 0.25) return 'bg-yellow-400';
                    return 'bg-red-400/70';
                  };
                  const cellTxt = (v: number) => {
                    if (v === 0) return 'text-primary-foreground/20';
                    return v / waGridMax >= 0.25 ? 'text-navy-dark font-bold' : 'text-white/80 font-bold';
                  };
                  return (
                    <SectionCard>
                      <SectionTitle icon={Clock} label="Heatmap – Dia × Hora (cliques WhatsApp)" color="text-[#25D366]"
                        badge={<Badge color="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">quando seu público clica</Badge>} />
                      <table className="text-[9px] border-collapse" style={{ tableLayout: 'fixed', width: '100%' }}>
                        <thead>
                          <tr>
                            <th style={{ width: '32px' }} />
                            {HOURS.map(h => (
                              <th key={h} style={{ width: '3.8%' }} className="text-center font-normal pb-1.5 text-primary-foreground/40">
                                {h}h
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {DAYS.map((day, dIdx) => (
                            <tr key={day}>
                              <td className="text-right text-primary-foreground/50 font-semibold pr-2 text-[10px]">{day}</td>
                              {HOURS.map(h => {
                                const val = waGrid[dIdx][h];
                                return (
                                  <td key={h} className="p-0.5">
                                    <div className={`group relative rounded-sm ${cellBg(val)} flex items-center justify-center border border-[#25D366]/10`}
                                      style={{ height: '22px' }}>
                                      <span className={`text-[9px] leading-none ${cellTxt(val)}`}>{val}</span>
                                      {val > 0 && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-charcoal border border-primary-foreground/20 rounded px-1.5 py-0.5 text-[9px] text-primary-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-10">
                                          {day} {h}h: <span className="font-bold text-[#25D366]">{val}</span>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex items-center gap-4 mt-3 text-[10px] text-primary-foreground/40 flex-wrap">
                        <span className="font-medium">Intensidade:</span>
                        {[
                          ['bg-primary-foreground/8', 'Sem cliques'],
                          ['bg-red-400/70',            'Baixa'],
                          ['bg-yellow-400',             'Média'],
                          ['bg-orange-400',             'Alta'],
                          ['bg-green-500',              'Pico'],
                        ].map(([c, l]) => (
                          <span key={l} className="flex items-center gap-1.5">
                            <span className={`w-3.5 h-3.5 rounded-sm ${c} flex-shrink-0`} />{l}
                          </span>
                        ))}
                      </div>
                    </SectionCard>
                  );
                })()}

                {/* Top páginas + origens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SectionCard>
                    <SectionTitle icon={Eye} label="Por página" />
                    <div className="space-y-2.5">
                      {waByPage.map(({ page, count }, i) => (
                        <div key={page} className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 border ${rankColor(i)}`}>{i + 1}</span>
                          <span className="text-xs text-primary-foreground/70 flex-1 truncate" title={page}>{page}</span>
                          <HBar count={count} max={maxWaPage} color="bg-[#25D366]" />
                          <span className="text-xs font-mono font-bold text-primary-foreground/60 w-6 text-right">{count}</span>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                  <SectionCard>
                    <SectionTitle icon={Globe} label="Por origem" color="text-accent" />
                    <div className="space-y-2.5">
                      {waBySource.map(({ source, count }, i) => (
                        <div key={source} className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 border ${rankColor(i)}`}>{i + 1}</span>
                          <span className="text-xs text-primary-foreground/70 flex-1 truncate">{source}</span>
                          <HBar count={count} max={maxWaSource} color="bg-accent" />
                          <span className="text-xs font-mono font-bold text-primary-foreground/60 w-6 text-right">{count}</span>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </div>

                {/* Conversão por origem */}
                {convBySource.length > 0 && (
                  <SectionCard>
                    <SectionTitle icon={TrendingUp} label="Conversão por origem" color="text-accent" />
                    <div className="space-y-3">
                      {convBySource.map(({ source, visits, wa, rate }) => (
                        <div key={source} className="flex items-center gap-3 p-3 bg-charcoal/30 rounded-xl">
                          <span className="text-sm text-primary-foreground/80 w-36 truncate flex-shrink-0 font-medium">{source}</span>
                          <div className="flex-1 flex items-center gap-3 text-xs text-primary-foreground/40">
                            <span>{visits} vis.</span>
                            <span className="text-primary-foreground/20">·</span>
                            <span className="text-[#25D366]">{wa} cliques</span>
                          </div>
                          <div className="w-24 bg-primary-foreground/10 rounded-full h-2">
                            <div className="h-2 rounded-full bg-[#25D366]" style={{ width: `${Math.min(rate, 100)}%` }} />
                          </div>
                          <span className={`text-sm font-black w-12 text-right ${rate >= 5 ? 'text-[#25D366]' : rate >= 2 ? 'text-cyan' : 'text-primary-foreground/30'}`}>{rate.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                )}

              </>)}
            </div>
          );
        })()}

        {/* ==== TAB: FORMULÁRIO ==== */}
        {aTab === 'form' && (() => {
          const contactViews  = filtered.filter(v => v.path === '/contato').length;
          const productViews  = filtered.filter(v => v.path.startsWith('/produtos/')).length;
          const productLeads  = leadsByType.quote + leadsByType.catalogue;
          const convContact   = contactViews  > 0 ? ((leadsByType.contact / contactViews)  * 100).toFixed(1) : null;
          const convProduct   = productViews  > 0 ? ((productLeads       / productViews)   * 100).toFixed(1) : null;
          const convTotal     = filtered.length > 0 ? ((leadsByType.total / filtered.length) * 100).toFixed(1) : null;

          // per-product: group leads by product name from subject
          const perProduct = filteredLeads
            .filter(l => l.subject?.startsWith('Orçamento:') || l.subject?.startsWith('Catálogo:'))
            .reduce<Record<string, { quote: number; catalogue: number; views: number }>>((acc, l) => {
              const name = (l.subject ?? '').replace(/^Orçamento:\s*|^Catálogo:\s*/, '').trim();
              if (!name) return acc;
              if (!acc[name]) {
                const path = topProducts.find(p => p.title.includes(name))?.path ?? '';
                const views = path ? filtered.filter(v => v.path === path).length : 0;
                acc[name] = { quote: 0, catalogue: 0, views };
              }
              if (l.subject?.startsWith('Orçamento:')) acc[name].quote++;
              else acc[name].catalogue++;
              return acc;
            }, {});
          const perProductList = Object.entries(perProduct)
            .map(([name, d]) => ({ name, total: d.quote + d.catalogue, quote: d.quote, catalogue: d.catalogue, views: d.views }))
            .sort((a, b) => b.total - a.total);

          return (
          <div className="space-y-6">
            {/* ---- Análise de conversão por página ---- */}
            <div className="bg-navy-dark/40 border border-accent/20 rounded-2xl p-6 space-y-5">
              <SectionTitle icon={TrendingUp} label="Conversão por página" color="text-accent"
                badge={<Badge color="bg-accent/10 text-accent border-accent/20">{leadsByType.total} leads em {period} dias</Badge>} />

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary-foreground/10 text-primary-foreground/40 text-xs uppercase tracking-wide">
                      <th className="text-left py-2 pr-4 font-medium">Página / Origem</th>
                      <th className="text-right py-2 px-3 font-medium">Visualizações</th>
                      <th className="text-right py-2 px-3 font-medium">Formulários</th>
                      <th className="text-right py-2 pl-3 font-medium">Conversão</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Página de Contato',  path: '/contato',    views: contactViews, leads: leadsByType.contact, conv: convContact,  color: 'text-cyan'   },
                      { label: 'Páginas de Produto', path: '/produtos/*', views: productViews, leads: productLeads,        conv: convProduct,  color: 'text-accent' },
                      { label: 'Total do site',      path: '',            views: filtered.length, leads: leadsByType.total, conv: convTotal,   color: 'text-primary-foreground' },
                    ].map(({ label, path, views, leads, conv, color }, i) => {
                      const convNum = conv ? parseFloat(conv) : 0;
                      return (
                        <tr key={label} className={`border-b border-primary-foreground/5 ${i === 2 ? 'bg-primary-foreground/3' : ''}`}>
                          <td className="py-3 pr-4">
                            <p className="font-medium text-primary-foreground">{label}</p>
                            {path && <p className="text-[11px] text-primary-foreground/30 font-mono">{path}</p>}
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-primary-foreground/70">{views}</td>
                          <td className={`py-3 px-3 text-right font-black font-heading text-xl ${color}`}>{leads}</td>
                          <td className="py-3 pl-3 text-right">
                            {conv ? (
                              <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                                convNum >= 5 ? 'bg-green-500/15 text-green-400' :
                                convNum >= 2 ? 'bg-cyan/15 text-cyan' :
                                convNum >= 0.5 ? 'bg-yellow-500/15 text-yellow-400' :
                                'bg-primary-foreground/8 text-primary-foreground/40'
                              }`}>{conv}%</span>
                            ) : <span className="text-primary-foreground/20 text-xs">–</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* análise automática */}
              {leadsByType.total > 0 && (
                <div className="space-y-2 pt-1">
                  {convContact && parseFloat(convContact) >= parseFloat(convProduct ?? '0') ? (
                    <p className="text-xs text-primary-foreground/50 flex items-start gap-2">
                      <span className="text-cyan mt-0.5">⬢</span>
                      A página de contato converte <span className="text-cyan font-semibold mx-1">{convContact}%</span> dos visitantes — {parseFloat(convContact) > parseFloat(convProduct ?? '0') ? 'acima' : 'igual a'} produtos ({convProduct ?? '0'}%).
                    </p>
                  ) : convProduct ? (
                    <p className="text-xs text-primary-foreground/50 flex items-start gap-2">
                      <span className="text-accent mt-0.5">⬢</span>
                      Páginas de produto convertem <span className="text-accent font-semibold mx-1">{convProduct}%</span> a mais que contato ({convContact ?? '0'}%). Visitantes de produto estão mais qualificados.
                    </p>
                  ) : null}
                  {productLeads > leadsByType.contact && (
                    <p className="text-xs text-primary-foreground/50 flex items-start gap-2">
                      <span className="text-accent mt-0.5">⬢</span>
                      <span>{Math.round((productLeads / leadsByType.total) * 100)}% dos leads vêm de páginas de produto — invista em mais produtos cadastrados e conteúdo técnico.</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ---- Breakdown por tipo de formulário ---- */}
            <div className="bg-navy-dark/40 border border-primary-foreground/10 rounded-2xl p-6 space-y-4">
              <SectionTitle icon={Send} label="Por tipo de formulário" color="text-cyan" />
              {leadsByType.total === 0 ? (
                <div className="text-center py-6">
                  <Send className="w-10 h-10 text-primary-foreground/10 mx-auto mb-2" />
                  <p className="text-primary-foreground/30 text-sm">Nenhum formulário enviado no período</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {[
                    { label: 'Formulário de Contato', count: leadsByType.contact,   color: 'bg-cyan',       desc: 'Via /contato' },
                    { label: 'Orçamento de Produto',  count: leadsByType.quote,     color: 'bg-accent',     desc: 'Modal de orçamento por e-mail' },
                    { label: 'Catálogo Técnico',      count: leadsByType.catalogue, color: 'bg-purple-400', desc: 'Solicitação de catálogo' },
                  ].map(({ label, count, color, desc }) => (
                    <div key={label} className="flex items-center gap-3 p-3 bg-charcoal/30 rounded-xl">
                      <div className={`w-1.5 h-8 rounded-full flex-shrink-0 ${color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-primary-foreground">{label}</p>
                        <p className="text-xs text-primary-foreground/30">{desc}</p>
                      </div>
                      <div className="w-32 mx-2">
                        <div className="h-1.5 bg-primary-foreground/8 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${color}`}
                            style={{ width: `${(count / Math.max(leadsByType.total, 1)) * 100}%` }} />
                        </div>
                        <p className="text-[10px] text-primary-foreground/30 mt-0.5 text-right">
                          {leadsByType.total > 0 ? Math.round((count / leadsByType.total) * 100) : 0}%
                        </p>
                      </div>
                      <span className="text-xl font-black font-heading text-primary-foreground w-8 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---- Por produto ---- */}
            {perProductList.length > 0 && (
              <div className="bg-navy-dark/40 border border-primary-foreground/10 rounded-2xl p-6 space-y-4">
                <SectionTitle icon={Eye} label="Leads por produto" color="text-accent"
                  badge={<Badge color="bg-accent/10 text-accent border-accent/20">{perProductList.length} produto{perProductList.length !== 1 ? 's' : ''} com lead</Badge>} />
                <div className="space-y-2">
                  {perProductList.map(({ name, total, quote, catalogue, views }) => {
                    const conv = views > 0 ? ((total / views) * 100).toFixed(1) : null;
                    return (
                      <div key={name} className="flex items-center gap-3 p-3 bg-charcoal/30 rounded-xl">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-primary-foreground truncate">{name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {quote > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/15 text-accent">{quote} orçamento{quote !== 1 ? 's' : ''}</span>}
                            {catalogue > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-400/15 text-purple-400">{catalogue} catálogo{catalogue !== 1 ? 's' : ''}</span>}
                          </div>
                        </div>
                        {views > 0 && <span className="text-xs text-primary-foreground/30 flex-shrink-0">{views} vis.</span>}
                        {conv && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                            parseFloat(conv) >= 5 ? 'bg-green-500/15 text-green-400' :
                            parseFloat(conv) >= 2 ? 'bg-cyan/15 text-cyan' :
                            'bg-primary-foreground/8 text-primary-foreground/40'
                          }`}>{conv}%</span>
                        )}
                        <span className="text-xl font-black font-heading text-accent w-6 text-right">{total}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
          );
        })()}

        {/* ==== TAB: PRODUTOS & GEO ==== */}
        {aTab === 'produtos' && (
          <div className="space-y-6">
            {/* Ranking de produtos */}
            <SectionCard>
              <SectionTitle icon={TrendingUp} label="Ranking de produtos mais vistos" />
              {topProducts.length === 0
                ? <p className="text-primary-foreground/30 text-sm text-center py-8">Sem visitas a produtos ainda</p>
                : <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {topProducts.map((p, i) => {
                      const pct = filtered.length > 0 ? Math.round((p.count / filtered.length) * 100) : 0;
                      return (
                        <div key={p.path} className="flex items-center gap-3 p-3 bg-charcoal/50 border border-primary-foreground/8 rounded-xl hover:border-primary-foreground/20 transition-colors group">
                          <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center flex-shrink-0 border ${rankColor(i)}`}>{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary-foreground truncate">{p.title.replace('Produto: ', '')}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="flex-1 bg-primary-foreground/5 rounded-full h-1">
                                <div className="bg-cyan h-1 rounded-full" style={{ width: `${(p.count / maxProduct) * 100}%` }} />
                              </div>
                              <span className="text-[10px] text-primary-foreground/30">{pct}%</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-lg font-black font-heading text-primary-foreground leading-none">{p.count}</p>
                            <p className="text-[10px] text-primary-foreground/30">visitas</p>
                          </div>
                          <a href={p.path} target="_blank" rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-foreground/30 hover:text-cyan flex-shrink-0">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
              }
            </SectionCard>

            {/* Produtos sem visitas */}
            {allProducts.length > 0 && (
              <SectionCard>
                <SectionTitle icon={Eye} label={`Produtos sem visitas nos últimos ${period} dias`} color="text-primary-foreground/40"
                  badge={<Badge color={productsWithoutVisits.length === 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}>
                    {productsWithoutVisits.length === 0 ? 'Todos visitados' : `${productsWithoutVisits.length} sem visita`}
                  </Badge>} />
                {productsWithoutVisits.length === 0
                  ? <p className="text-green-400/60 text-sm text-center py-4">Todos os produtos tiveram visitas no período.</p>
                  : <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                      {productsWithoutVisits.map(p => (
                        <div key={p.id} className="flex items-center gap-2 px-3 py-2.5 bg-red-500/5 border border-red-500/10 rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                          <span className="text-xs text-primary-foreground/60 truncate">{p.name}</span>
                        </div>
                      ))}
                    </div>
                }
              </SectionCard>
            )}

          </div>
        )}

      </>)}
    </div>
  );
};

// ---- Admin shell ----
const Admin = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get('tab') as Tab;
  const tab: Tab = ['produtos', 'blog', 'leads', 'analytics'].includes(rawTab) ? rawTab : 'produtos';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login');
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Top bar */}
      <header className="border-b border-primary-foreground/10 bg-navy-dark/50 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading text-lg font-black text-primary-foreground">
              BORO<span className="text-accent">TEC</span>
            </span>
            <span className="text-primary-foreground/20">/</span>
            <span className="text-sm text-primary-foreground/60">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank"
              className="flex items-center gap-1.5 text-sm text-primary-foreground/50 hover:text-cyan transition-colors">
              <ExternalLink className="w-4 h-4" />
              Ver site
            </a>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-navy-dark/40 border border-primary-foreground/10 rounded-xl p-1 w-fit">
          <button
            onClick={() => setSearchParams({ tab: 'produtos' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'produtos'
                ? 'bg-charcoal text-primary-foreground shadow-sm'
                : 'text-primary-foreground/50 hover:text-primary-foreground'
            }`}
          >
            <Package className="w-4 h-4" />
            Produtos
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'blog' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'blog'
                ? 'bg-charcoal text-primary-foreground shadow-sm'
                : 'text-primary-foreground/50 hover:text-primary-foreground'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Artigos
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'leads' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'leads'
                ? 'bg-charcoal text-primary-foreground shadow-sm'
                : 'text-primary-foreground/50 hover:text-primary-foreground'
            }`}
          >
            <Users className="w-4 h-4" />
            Leads
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'analytics' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'analytics'
                ? 'bg-charcoal text-primary-foreground shadow-sm'
                : 'text-primary-foreground/50 hover:text-primary-foreground'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Analytics
          </button>
        </div>

        {tab === 'produtos' && <ProductsTab />}
        {tab === 'blog' && <BlogTab />}
        {tab === 'leads' && <LeadsTab />}
        {tab === 'analytics' && <AnalyticsTab />}
      </main>
    </div>
  );
};

export default Admin;

