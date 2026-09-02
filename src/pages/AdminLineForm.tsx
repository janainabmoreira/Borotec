import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ICON_OPTIONS } from '@/lib/iconMap';
import { ACCENT_OPTIONS } from '@/lib/accentColors';
import { useProductLines, groupLinesBySection, invalidateLinesCache } from '@/hooks/useProductLines';
import type { DbProductLine } from '@/types/database';
import { ArrowLeft, Loader2, Save, Upload, X, ImageIcon } from 'lucide-react';

// ── Slug helper (mesmo padrão de AdminProductForm.tsx) ─────────────────────────

const toSlug = (str: string) =>
  str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const emptyLine: Omit<DbProductLine, 'created_at' | 'updated_at'> = {
  id: '', badge: '', name: '', category: '', path: '',
  section_slug: 'boroscopios', section_name: 'Boroscópios',
  icon_name: 'Wrench', accent: 'cyan', image_url: null,
  card_description: '', menu_description: '', hero_description: '',
  seo_title: '', seo_description: '',
  filter_labels: { probe: 'Sonda', cable: 'Cabo', camera: 'Câmera', ip: 'Proteção' },
  card_labels: { probe: 'Sonda', cable: 'Cabo', camera: 'Câmera', ip: 'Proteção' },
  sort_order: 0, active: true,
};

// ── Upload de imagem única ──────────────────────────────────────────────────

const uploadImage = async (file: File): Promise<string | null> => {
  if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
    alert('Arquivo inválido: use JPG/PNG/WebP com até 5MB.');
    return null;
  }
  const ext = file.name.split('.').pop();
  const fileName = `linhas/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('produtos').upload(fileName, file, { upsert: true });
  if (error) {
    console.error('[Upload erro]', error);
    alert(`Erro no upload: ${error.message}`);
    return null;
  }
  const { data } = supabase.storage.from('produtos').getPublicUrl(fileName);
  return data.publicUrl;
};

const ImageUploader = ({ url, onChange }: { url: string | null; onChange: (url: string | null) => void }) => {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setUploading(true);
    const uploaded = await uploadImage(file);
    if (uploaded) onChange(uploaded);
    setUploading(false);
  }, [onChange]);

  return (
    <div className="space-y-2">
      {url ? (
        <div className="relative group w-full max-w-xs">
          <img src={url} alt="Foto da linha" className="w-full aspect-video object-cover rounded-lg border border-primary-foreground/10" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button type="button" onClick={() => inputRef.current?.click()}
              className="p-1.5 bg-charcoal/80 rounded-lg text-primary-foreground/70 hover:text-cyan transition-colors" title="Trocar imagem">
              <Upload className="w-3.5 h-3.5" />
            </button>
            <button type="button" onClick={() => onChange(null)}
              className="p-1.5 bg-charcoal/80 rounded-lg text-primary-foreground/70 hover:text-red-400 transition-colors" title="Remover (usa ícone)">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          className={`w-full max-w-xs aspect-video rounded-lg border-2 border-dashed transition-colors flex flex-col items-center justify-center gap-1
            ${drag ? 'border-cyan bg-cyan/5' : 'border-primary-foreground/15 hover:border-primary-foreground/30'}`}
        >
          {uploading ? (
            <Loader2 className="w-5 h-5 text-cyan animate-spin" />
          ) : (
            <>
              <button type="button" onClick={() => inputRef.current?.click()}
                className="flex flex-col items-center gap-1 text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors">
                <ImageIcon className="w-6 h-6" />
                <span className="text-xs font-medium">Sem foto — usa ícone</span>
              </button>
              <button type="button" onClick={() => setUrlInput(true)}
                className="text-[10px] text-primary-foreground/25 hover:text-cyan transition-colors mt-0.5 underline underline-offset-2">
                colar URL
              </button>
            </>
          )}
        </div>
      )}
      {urlInput && (
        <div className="flex gap-2 items-center max-w-xs">
          <input autoFocus type="url" value={urlValue} onChange={e => setUrlValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (urlValue.trim()) onChange(urlValue.trim()); setUrlInput(false); setUrlValue(''); } }}
            placeholder="https://..."
            className="flex-1 h-8 px-2 rounded bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-xs focus:outline-none focus:border-cyan transition-colors" />
          <button type="button" onClick={() => { if (urlValue.trim()) onChange(urlValue.trim()); setUrlInput(false); setUrlValue(''); }}
            className="px-3 h-8 bg-cyan text-charcoal text-xs font-semibold rounded hover:bg-cyan/90 transition-colors">OK</button>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; e.target.value = ''; if (f) handleFile(f); }} />
      <p className="text-[10px] text-primary-foreground/25">JPG, PNG ou WebP · máx. 5MB · opcional — sem foto, o card mostra o ícone da linha</p>
    </div>
  );
};

// ── Shared field styles (mesmo padrão de AdminProductForm.tsx) ─────────────────

const inputCls = "w-full h-10 px-3 rounded-lg bg-charcoal border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-cyan transition-colors";
const labelCls = "block text-xs font-medium text-primary-foreground/50 mb-1";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-navy-dark/40 border border-primary-foreground/10 rounded-xl overflow-hidden px-5 py-4 space-y-4">
    <span className="font-heading font-semibold text-primary-foreground block">{title}</span>
    {children}
  </div>
);

const SPEC_KEYS = ['probe', 'cable', 'camera', 'ip'] as const;
const SPEC_PLACEHOLDER: Record<typeof SPEC_KEYS[number], string> = { probe: 'Sonda', cable: 'Cabo', camera: 'Câmera', ip: 'Proteção' };

// ── Main form ────────────────────────────────────────────────────────────────

const AdminLineForm = () => {
  const { id: lineId } = useParams<{ id?: string }>();
  const isEdit = !!lineId;
  const navigate = useNavigate();

  const [line, setLine] = useState(emptyLine);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const slugEditedRef = useRef(isEdit);
  const categoryEditedRef = useRef(isEdit);
  const sortOrderEditedRef = useRef(isEdit);
  const { lines: existingLines } = useProductLines();
  const existingSections = groupLinesBySection(existingLines);

  // Linha nova entra no fim da fila por padrão — sem isso, toda linha nasceria
  // com sort_order 0 e apareceria ANTES de Boroscópios (1-7) no menu.
  useEffect(() => {
    if (!isEdit && !sortOrderEditedRef.current && existingLines.length > 0) {
      const maxOrder = Math.max(...existingLines.map(l => l.sort_order));
      setLine(prev => ({ ...prev, sort_order: maxOrder + 1 }));
    }
  }, [isEdit, existingLines]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login');
    });
  }, [navigate]);

  useEffect(() => {
    if (!isEdit) return;
    supabase.from('product_lines').select('*').eq('id', lineId).single().then(({ data }) => {
      if (data) setLine({ ...emptyLine, ...data });
      setLoading(false);
    });
  }, [isEdit, lineId]);

  const setL = <K extends keyof typeof emptyLine>(key: K, val: typeof emptyLine[K]) =>
    setLine(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return; // evita clique duplo disparar dois INSERTs
    setError('');

    if (!line.name.trim()) { setError('O nome da linha é obrigatório.'); return; }
    if (!line.badge.trim()) { setError('O selo (ex: "Linha X") é obrigatório.'); return; }
    if (!line.section_name.trim()) { setError('A seção do menu é obrigatória.'); return; }
    if (!line.card_description.trim()) { setError('A descrição do card é obrigatória.'); return; }
    if (!line.hero_description.trim()) { setError('A descrição da página é obrigatória.'); return; }

    const slug = line.id.trim() ? toSlug(line.id.trim()) : toSlug(line.name.trim());
    if (!slug) { setError('Não foi possível gerar um slug. Preencha o nome da linha.'); return; }

    const sectionSlug = toSlug(line.section_name.trim());
    if (!sectionSlug) { setError('Não foi possível gerar o slug da seção. Preencha a seção do menu.'); return; }

    const category = line.category.trim() || `${line.badge.trim()} - ${line.name.trim()}`;

    setSaving(true);

    const payload = {
      id: slug,
      badge: line.badge.trim(),
      name: line.name.trim(),
      category,
      path: `/${slug}`,
      section_slug: sectionSlug,
      section_name: line.section_name.trim(),
      icon_name: line.icon_name,
      accent: line.accent,
      image_url: line.image_url || null,
      card_description: line.card_description.trim(),
      menu_description: line.menu_description?.trim() || null,
      hero_description: line.hero_description.trim(),
      seo_title: line.seo_title?.trim() || null,
      seo_description: line.seo_description?.trim() || null,
      filter_labels: line.filter_labels,
      card_labels: line.card_labels,
      sort_order: line.sort_order,
      active: line.active,
    };

    const slugChanged = isEdit && slug !== lineId;

    const { error: saveError } = slugChanged
      ? await supabase.from('product_lines').insert(payload)
      : isEdit
        ? await supabase.from('product_lines').update(payload).eq('id', lineId!)
        : await supabase.from('product_lines').insert(payload);

    if (saveError) {
      if (saveError.code === '23505') {
        setError(
          saveError.message.includes('product_lines_category_key')
            ? `Já existe uma linha usando a categoria "${category}". Mude o nome e/ou o selo pra gerar uma categoria diferente, ou edite a linha existente em vez de criar outra.`
            : `Já existe uma linha com o slug "${slug}" (URL /${slug}). Mude o "Slug personalizado" ou o nome da linha para um valor diferente.`
        );
      } else {
        setError(`Erro ao salvar: ${saveError.message}`);
      }
      setSaving(false);
      return;
    }

    if (slugChanged) {
      await supabase.from('product_lines').delete().eq('id', lineId!);
    }

    invalidateLinesCache();
    setSaving(false);
    navigate('/admin?tab=linhas');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <header className="border-b border-primary-foreground/10 bg-navy-dark/50 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin?tab=linhas" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="font-heading font-bold text-primary-foreground">
              {isEdit ? 'Editar Linha' : 'Nova Linha'}
            </span>
          </div>
          <button type="submit" form="line-form" disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <form id="line-form" onSubmit={handleSubmit} className="space-y-5">

          <Section title="Informações Básicas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Nome da Linha *</label>
                <input
                  className={inputCls}
                  value={line.name}
                  onChange={e => {
                    setL('name', e.target.value);
                    if (!slugEditedRef.current) setL('id', toSlug(e.target.value));
                    if (!categoryEditedRef.current) setL('category', `${line.badge} - ${e.target.value}`.replace(/^ - /, ''));
                  }}
                  placeholder="ex: Termografia"
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Selo (badge) *</label>
                <input
                  className={inputCls}
                  value={line.badge}
                  onChange={e => {
                    setL('badge', e.target.value);
                    if (!categoryEditedRef.current) setL('category', `${e.target.value} - ${line.name}`.replace(/ - $/, ''));
                  }}
                  placeholder='ex: "Linha TM"'
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Seção do menu *</label>
              <input
                className={inputCls}
                list="existing-sections"
                value={line.section_name}
                onChange={e => setL('section_name', e.target.value)}
                placeholder='ex: "Boroscópios" ou "Termografia"'
                required
              />
              <datalist id="existing-sections">
                {existingSections.map(s => <option key={s.slug} value={s.name} />)}
              </datalist>
              <p className="text-xs text-primary-foreground/30 mt-1">
                Item do menu principal onde esta linha aparece (junto com outras da mesma seção). Use um nome já
                existente para agrupar com linhas atuais, ou digite um novo para criar uma seção nova.
              </p>
            </div>

            <div>
              <label className={labelCls}>
                Slug personalizado{!isEdit && ' (deixe em branco para gerar automaticamente do nome)'}
              </label>
              <input
                className={inputCls}
                value={line.id}
                onChange={e => { slugEditedRef.current = true; setL('id', e.target.value.toLowerCase().replace(/\s+/g, '-')); }}
                placeholder={line.name ? toSlug(line.name) : 'gerado-automaticamente-do-nome'}
              />
              <p className="text-xs text-primary-foreground/30 mt-1">
                URL: <span className="text-cyan">/{line.id || (line.name ? toSlug(line.name) : '...')}</span>
                {isEdit && line.id !== lineId && (
                  <span className="ml-2 text-amber-400">⚠ Alterar o slug muda a URL da linha e quebra links existentes</span>
                )}
              </p>
            </div>

            <div>
              <label className={labelCls}>
                Categoria vinculada aos produtos{!isEdit && ' (deixe em branco para gerar automaticamente)'}
              </label>
              <input
                className={inputCls}
                value={line.category}
                onChange={e => { categoryEditedRef.current = true; setL('category', e.target.value); }}
                placeholder={`${line.badge || 'Linha X'} - ${line.name || 'Nome'}`}
              />
              <p className="text-xs text-primary-foreground/30 mt-1">
                É esse texto que fica salvo em cada produto para ligá-lo a esta linha.
                {isEdit && <span className="ml-1 text-amber-400">⚠ Alterar isso desliga os produtos já cadastrados nesta linha (eles somem da listagem até você reatribuir a categoria deles).</span>}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Ícone</label>
                <select className={inputCls} value={line.icon_name} onChange={e => setL('icon_name', e.target.value)}>
                  {ICON_OPTIONS.map(ico => <option key={ico.value} value={ico.value}>{ico.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Cor de destaque</label>
                <select className={inputCls} value={line.accent} onChange={e => setL('accent', e.target.value)}>
                  {ACCENT_OPTIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>Foto da Linha</label>
              <ImageUploader url={line.image_url} onChange={url => setL('image_url', url)} />
            </div>

            <div>
              <label className={labelCls}>Descrição do card (Home + /boroscopios) *</label>
              <textarea
                className={`${inputCls} h-20 resize-none py-2`}
                value={line.card_description}
                onChange={e => setL('card_description', e.target.value)}
                placeholder="Descrição curta exibida nos cards..."
                required
              />
            </div>

            <div>
              <label className={labelCls}>Descrição do menu "Aplicações" (opcional — se vazio, usa a descrição do card)</label>
              <textarea
                className={`${inputCls} h-16 resize-none py-2`}
                value={line.menu_description ?? ''}
                onChange={e => setL('menu_description', e.target.value)}
                placeholder="Texto curto exibido no dropdown do menu..."
              />
            </div>

            <div>
              <label className={labelCls}>Descrição da página da linha *</label>
              <textarea
                className={`${inputCls} h-20 resize-none py-2`}
                value={line.hero_description}
                onChange={e => setL('hero_description', e.target.value)}
                placeholder="Parágrafo exibido abaixo do título na página da linha..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Ordem de exibição</label>
                <input type="number" className={inputCls} value={line.sort_order}
                  onChange={e => { sortOrderEditedRef.current = true; setL('sort_order', Number(e.target.value)); }} />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input id="active" type="checkbox" checked={line.active}
                  onChange={e => setL('active', e.target.checked)} className="w-4 h-4 accent-cyan" />
                <label htmlFor="active" className="text-sm text-primary-foreground/70 cursor-pointer">
                  Linha ativa (visível no site)
                </label>
              </div>
            </div>
          </Section>

          <Section title="SEO (Google / IAs)">
            <div>
              <label className={labelCls}>Title tag</label>
              <input className={inputCls} value={line.seo_title ?? ''} onChange={e => setL('seo_title', e.target.value)}
                placeholder={`${line.name || 'Nome da linha'} | ${line.badge || 'Linha X'} | BOROTEC Industrial`} maxLength={80} />
            </div>
            <div>
              <label className={labelCls}>Meta description</label>
              <textarea className={`${inputCls} h-20 resize-y py-2`} value={line.seo_description ?? ''}
                onChange={e => setL('seo_description', e.target.value)}
                placeholder="Descreva a linha em ~155 caracteres. Se vazio, usa a descrição da página." maxLength={200} />
            </div>
          </Section>

          <Section title="Rótulos de Especificação">
            <p className="text-xs text-primary-foreground/40 -mt-1">
              Cada produto tem 4 campos técnicos (sonda, cabo, câmera, proteção). Aqui você define os
              rótulos padrão desta linha — cada produto pode sobrescrever o dele individualmente.
            </p>
            <div>
              <p className="text-xs font-semibold text-primary-foreground/60 mb-2">Título do filtro (barra lateral)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {SPEC_KEYS.map(key => (
                  <div key={key}>
                    <label className={labelCls}>{SPEC_PLACEHOLDER[key]}</label>
                    <input className={inputCls} value={line.filter_labels[key] ?? ''}
                      onChange={e => setL('filter_labels', { ...line.filter_labels, [key]: e.target.value })}
                      placeholder={SPEC_PLACEHOLDER[key]} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-primary-foreground/60 mb-2">Rótulo no card do produto</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {SPEC_KEYS.map(key => (
                  <div key={key}>
                    <label className={labelCls}>{SPEC_PLACEHOLDER[key]}</label>
                    <input className={inputCls} value={line.card_labels[key] ?? ''}
                      onChange={e => setL('card_labels', { ...line.card_labels, [key]: e.target.value })}
                      placeholder={SPEC_PLACEHOLDER[key]} />
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <div className="flex justify-end pt-2 pb-10">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Salvando...' : 'Salvar Linha'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminLineForm;
