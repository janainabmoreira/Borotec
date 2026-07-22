import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapLink from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { supabase } from '@/lib/supabase';
import type { DbBlogPost } from '@/types/database';
import {
  ArrowLeft, Loader2, Save, Plus, Trash2, ChevronDown, ChevronUp,
  Upload, X, ImageIcon, Image, Bold, Italic, UnderlineIcon, Heading2, Heading3,
  List, ListOrdered, Quote, LinkIcon, Undo2, Redo2,
} from 'lucide-react';

type FaqRow = { q: string; a: string };

const CATEGORIES = [
  'Guia Técnico',
  'Guia de Compra',
  'Aplicações',
  'Manutenção',
  'Novidades',
  'Casos de Uso',
];

const emptyPost: Omit<DbBlogPost, 'created_at' | 'updated_at'> = {
  id: '',
  title: '',
  excerpt: '',
  category: CATEGORIES[0],
  author: '',
  date: new Date().toISOString().split('T')[0],
  read_time: '',
  image: '',
  content: '',
  faqs: [],
  active: true,
};

// ── Image uploader (capa) ────────────────────────────────────────────────────

const ImageUploader = ({ value, onChange }: { value: string; onChange: (url: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [drag, setDrag] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const upload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { setUploadError('Apenas imagens são aceitas.'); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError('Imagem deve ter menos de 5MB.'); return; }
    setUploadError('');
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('produtos').upload(fileName, file, { upsert: true });
    if (error) { setUploadError(`Erro no upload: ${error.message}`); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from('produtos').getPublicUrl(fileName);
    onChange(urlData.publicUrl);
    setUploading(false);
  }, [onChange]);

  return (
    <div className="space-y-3">
      {value && (
        <div className="relative inline-block">
          <img src={value} alt="Capa" className="w-48 h-28 object-cover rounded-lg border border-primary-foreground/10" />
          <button type="button" onClick={() => onChange('')}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) upload(f); }}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 h-28 rounded-lg border-2 border-dashed cursor-pointer transition-colors
          ${drag ? 'border-cyan bg-cyan/5' : 'border-primary-foreground/20 hover:border-cyan/50'}
          ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {uploading ? (
          <><Loader2 className="w-6 h-6 text-cyan animate-spin" /><span className="text-xs text-primary-foreground/50">Enviando...</span></>
        ) : (
          <><ImageIcon className="w-6 h-6 text-primary-foreground/30" />
            <span className="text-xs text-primary-foreground/50 text-center">
              Arraste ou <span className="text-cyan">clique para selecionar</span>
            </span>
            <span className="text-[10px] text-primary-foreground/30">JPG, PNG ou WebP · máx. 5MB · ideal 1200×630px</span>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
      </div>
      {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
      <div>
        <label className="block text-[10px] text-primary-foreground/30 mb-1">Ou cole uma URL de imagem</label>
        <input className={inputCls} type="url" value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
      </div>
    </div>
  );
};

// ── Collapsible section ──────────────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-navy-dark/40 border border-primary-foreground/10 rounded-xl overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-primary-foreground/3 transition-colors">
        <span className="font-heading font-semibold text-primary-foreground">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-primary-foreground/40" /> : <ChevronDown className="w-4 h-4 text-primary-foreground/40" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
};

// ── Shared styles ────────────────────────────────────────────────────────────

const inputCls = "w-full h-10 px-3 rounded-lg bg-charcoal border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-cyan transition-colors";
const labelCls = "block text-xs font-medium text-primary-foreground/50 mb-1";

// ── Rich text content editor (visual formatting + inline images) ────────────

const StyledImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: { default: 'w-full rounded-xl my-6' },
    };
  },
});

const ToolbarButton = ({ active, onClick, disabled, title, children }: {
  active?: boolean; onClick: () => void; disabled?: boolean; title: string; children: React.ReactNode;
}) => (
  <button type="button" title={title} disabled={disabled} onClick={onClick}
    className={`flex items-center justify-center w-8 h-8 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed
      ${active ? 'bg-cyan/20 text-cyan' : 'bg-primary-foreground/5 hover:bg-primary-foreground/15 text-primary-foreground/70'}`}>
    {children}
  </button>
);

const EditorToolbar = ({ editor }: { editor: Editor }) => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const uploadInlineImage = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) { alert('Imagem deve ter menos de 5MB.'); return; }
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `blog/inline/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('produtos').upload(fileName, file, { upsert: true });
    if (error) { alert(`Erro no upload: ${error.message}`); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from('produtos').getPublicUrl(fileName);
    editor.chain().focus().setImage({ src: urlData.publicUrl, alt: '' }).run();
    setUploading(false);
  }, [editor]);

  const setLink = useCallback(() => {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL do link:', previous ?? 'https://');
    if (url === null) return;
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex items-center gap-1 flex-wrap p-1.5 rounded-lg bg-charcoal border border-primary-foreground/20">
      <ToolbarButton title="Título 2" active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton title="Título 3" active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="w-4 h-4" /></ToolbarButton>
      <div className="w-px h-5 bg-primary-foreground/10 mx-1" />
      <ToolbarButton title="Negrito" active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton title="Itálico" active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton title="Sublinhado" active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="w-4 h-4" /></ToolbarButton>
      <div className="w-px h-5 bg-primary-foreground/10 mx-1" />
      <ToolbarButton title="Lista com marcadores" active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton title="Lista numerada" active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton title="Citação" active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="w-4 h-4" /></ToolbarButton>
      <div className="w-px h-5 bg-primary-foreground/10 mx-1" />
      <ToolbarButton title="Link" active={editor.isActive('link')} onClick={setLink}><LinkIcon className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton title="Inserir imagem" disabled={uploading} onClick={() => imgInputRef.current?.click()}>
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
      </ToolbarButton>
      <input ref={imgInputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) { uploadInlineImage(f); e.target.value = ''; } }} />
      <div className="w-px h-5 bg-primary-foreground/10 mx-1" />
      <ToolbarButton title="Desfazer" disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}><Undo2 className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton title="Refazer" disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}><Redo2 className="w-4 h-4" /></ToolbarButton>
    </div>
  );
};

const ContentEditor = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      StyledImage,
      TiptapLink.configure({ openOnClick: false, HTMLAttributes: { class: 'text-cyan underline' } }),
      Placeholder.configure({ placeholder: 'Escreva o conteúdo do artigo…' }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        // @tailwindcss/typography isn't registered as a Tailwind plugin in
        // this project (installed but never added to tailwind.config.ts),
        // so `prose`/`prose-invert` generate no CSS — style tags explicitly
        // instead, matching the rest of the admin's text-primary-foreground convention.
        // ProseMirror splits this string on plain spaces only, so it must be
        // a single line — embedded newlines produce invalid classList tokens.
        class: [
          'max-w-none px-4 py-3 min-h-[400px] focus:outline-none text-primary-foreground leading-relaxed',
          '[&_h2]:text-xl [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-primary-foreground [&_h2]:mt-5 [&_h2]:mb-2',
          '[&_h3]:text-lg [&_h3]:font-heading [&_h3]:font-semibold [&_h3]:text-primary-foreground [&_h3]:mt-4 [&_h3]:mb-2',
          '[&_p]:mb-3 [&_strong]:font-bold [&_em]:italic [&_u]:underline',
          '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1',
          '[&_blockquote]:border-l-2 [&_blockquote]:border-cyan/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-primary-foreground/70',
          '[&_a]:text-cyan [&_a]:underline',
          '[&_img]:rounded-xl [&_img]:my-4',
          '[&_p.is-editor-empty:first-child::before]:text-primary-foreground/30 [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_p.is-editor-empty:first-child::before]:float-left [&_p.is-editor-empty:first-child::before]:pointer-events-none [&_p.is-editor-empty:first-child::before]:h-0',
        ].join(' '),
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <EditorToolbar editor={editor} />
      <div className="rounded-lg bg-charcoal border border-primary-foreground/20 focus-within:border-cyan transition-colors">
        <EditorContent editor={editor} />
      </div>
      <p className="text-[10px] text-primary-foreground/30">
        Selecione um texto e use os botões acima para formatar. O botão de imagem insere no ponto do cursor.
      </p>
    </div>
  );
};

// ── Main form ────────────────────────────────────────────────────────────────

const AdminBlogForm = () => {
  const { postId } = useParams<{ postId?: string }>();
  const isEdit = !!postId;
  const navigate = useNavigate();

  const [post, setPost] = useState<Omit<DbBlogPost, 'created_at' | 'updated_at'>>(emptyPost);
  const [faqs, setFaqs] = useState<FaqRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login');
    });
  }, [navigate]);

  useEffect(() => {
    if (!isEdit) return;
    supabase.from('blog_posts').select('*').eq('id', postId).single()
      .then(({ data }) => {
        if (data) {
          setPost(data);
          setFaqs(data.faqs ?? []);
        }
        setLoading(false);
      });
  }, [isEdit, postId]);

  const set = (field: keyof typeof post, value: unknown) =>
    setPost(prev => ({ ...prev, [field]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');

    const payload = {
      ...post,
      faqs,
      id: post.id || post.title.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        .slice(0, 80),
    };

    const { error } = isEdit
      ? await supabase.from('blog_posts').update(payload).eq('id', postId)
      : await supabase.from('blog_posts').insert(payload);

    if (error) {
      setSaveError(error.message);
      setSaving(false);
      return;
    }
    navigate('/admin?tab=blog');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Top bar */}
      <header className="border-b border-primary-foreground/10 bg-navy-dark/50 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RouterLink to="/admin?tab=blog" className="flex items-center gap-1.5 text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Artigos
            </RouterLink>
            <span className="text-primary-foreground/20">/</span>
            <span className="text-sm text-primary-foreground">{isEdit ? 'Editar artigo' : 'Novo artigo'}</span>
          </div>
          <button
            form="blog-form"
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Salvando...' : 'Salvar artigo'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        {saveError && (
          <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
            {saveError}
          </div>
        )}

        <form id="blog-form" onSubmit={handleSave} className="space-y-6">

          {/* Informações básicas */}
          <Section title="Informações do Artigo">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelCls}>Título *</label>
                <input className={inputCls} required value={post.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Ex: Como escolher o boroscópio ideal para inspeção de turbinas" />
              </div>

              <div>
                <label className={labelCls}>Autor *</label>
                <input className={inputCls} required value={post.author}
                  onChange={(e) => set('author', e.target.value)}
                  placeholder="Ex: Equipe BOROTEC" />
              </div>

              <div>
                <label className={labelCls}>Categoria *</label>
                <select className={inputCls} required value={post.category}
                  onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className={labelCls}>Data de publicação *</label>
                <input className={inputCls} type="date" required value={post.date}
                  onChange={(e) => set('date', e.target.value)} />
              </div>

              <div>
                <label className={labelCls}>Tempo de leitura</label>
                <input className={inputCls} value={post.read_time}
                  onChange={(e) => set('read_time', e.target.value)}
                  placeholder="Ex: 8 min" />
              </div>

              <div className="md:col-span-2">
                <label className={labelCls}>Resumo (excerpt) *</label>
                <textarea
                  className="w-full px-3 py-2.5 rounded-lg bg-charcoal border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-cyan transition-colors resize-none"
                  rows={3}
                  required
                  value={post.excerpt}
                  onChange={(e) => set('excerpt', e.target.value)}
                  placeholder="Breve descrição do artigo para aparecer na listagem do blog..."
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelCls}>Status</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={post.active}
                    onChange={(e) => set('active', e.target.checked)}
                    className="w-4 h-4 accent-cyan" />
                  <span className="text-sm text-primary-foreground/70">Publicado (visível no site)</span>
                </label>
              </div>
            </div>
          </Section>

          {/* Imagem de capa */}
          <Section title="Imagem de Capa">
            <ImageUploader value={post.image ?? ''} onChange={(url) => set('image', url)} />
          </Section>

          {/* Conteúdo */}
          <Section title="Conteúdo do Artigo">
            <ContentEditor value={post.content} onChange={(v) => set('content', v)} />
          </Section>

          {/* FAQs */}
          <Section title="Perguntas Frequentes (FAQ)">
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-charcoal rounded-lg border border-primary-foreground/15 p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs text-primary-foreground/40 font-mono">FAQ {i + 1}</span>
                    <button type="button" onClick={() => setFaqs(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-primary-foreground/30 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className={labelCls}>Pergunta</label>
                    <input className={inputCls} value={faq.q}
                      onChange={(e) => setFaqs(prev => prev.map((f, idx) => idx === i ? { ...f, q: e.target.value } : f))}
                      placeholder="Qual a diferença entre boroscópio e videoscópio?" />
                  </div>
                  <div>
                    <label className={labelCls}>Resposta</label>
                    <textarea
                      className="w-full px-3 py-2.5 rounded-lg bg-navy-dark/60 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-cyan transition-colors resize-none"
                      rows={3}
                      value={faq.a}
                      onChange={(e) => setFaqs(prev => prev.map((f, idx) => idx === i ? { ...f, a: e.target.value } : f))}
                      placeholder="Resposta detalhada..."
                    />
                  </div>
                </div>
              ))}
              <button type="button"
                onClick={() => setFaqs(prev => [...prev, { q: '', a: '' }])}
                className="flex items-center gap-2 text-sm text-cyan hover:text-cyan/80 transition-colors">
                <Plus className="w-4 h-4" />
                Adicionar pergunta
              </button>
            </div>
          </Section>

          {/* ID manual (opcional) */}
          {!isEdit && (
            <Section title="Configurações Avançadas">
              <div>
                <label className={labelCls}>Slug personalizado (deixe em branco para gerar automaticamente do título)</label>
                <input className={inputCls} value={post.id}
                  onChange={(e) => set('id', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  placeholder="como-escolher-boroscopio" />
              </div>
            </Section>
          )}

        </form>
      </main>
    </div>
  );
};

export default AdminBlogForm;
