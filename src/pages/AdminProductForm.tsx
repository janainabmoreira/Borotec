import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ICON_OPTIONS } from '@/lib/iconMap';
import { useProductLines } from '@/hooks/useProductLines';
import type { DbProduct, DbProductDetails } from '@/types/database';
import {
  ArrowLeft, Loader2, Save, Plus, Trash2, ChevronDown, ChevronUp,
  Upload, X, ImageIcon,
} from 'lucide-react';

type FeatureRow = DbProductDetails['features'][0];
type FaqRow = DbProductDetails['faqs'][0];

const DEFAULT_ACC_COLUMNS = ['Modelo', 'Diâm. Sonda', 'Rigidez', 'Diâm. Cabo', 'Câmera', 'Revestimento', 'Comprimento'];
type VideoRow = DbProductDetails['videos'][0];

const emptyProduct: Omit<DbProduct, 'created_at' | 'updated_at'> = {
  id: '', name: '', description: '', category: '',
  image_url: '', gallery: [], cable: '', probe: '', camera: '', ip: '', active: true,
  seo_title: '', seo_description: '',
  spec_labels: null,
};

const emptyDetails: DbProductDetails = {
  product_id: '',
  manual_url: '',
  accessories_tip: '',
  specs_description: '',
  features: [],
  specs_left: [],
  specs_right: [],
  accessories: [],
  accessories_table: [],
  accessories_list: [],
  applications: [],
  faqs: [],
  videos: [],
};

// ── Gallery uploader ─────────────────────────────────────────────────────────

const uploadImage = async (file: File, folder = 'produtos'): Promise<string | null> => {
  if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
    alert('Arquivo inválido: use JPG/PNG/WebP com até 5MB.');
    return null;
  }
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('produtos').upload(fileName, file, { upsert: true });
  if (error) {
    console.error('[Upload erro]', error);
    alert(`Erro no upload: ${error.message}`);
    return null;
  }
  const { data } = supabase.storage.from('produtos').getPublicUrl(fileName);
  return data.publicUrl;
};

const GalleryUploader = ({
  mainImage,
  gallery,
  onMainChange,
  onGalleryChange,
}: {
  mainImage: string;
  gallery: string[];
  onMainChange: (url: string) => void;
  onGalleryChange: (urls: string[]) => void;
}) => {
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [urlInputSlot, setUrlInputSlot] = useState<number | null>(null);
  const [urlValue, setUrlValue] = useState('');
  const activeSlotRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Slot 0 = main, slots 1-4 = gallery
  const slots = [mainImage, ...Array(4).fill('').map((_, i) => gallery[i] ?? '')];

  const setSlot = (index: number, url: string) => {
    if (index === 0) { onMainChange(url); return; }
    const next = [...slots.slice(1)];
    next[index - 1] = url;
    onGalleryChange(next.filter(Boolean));
  };

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const slot = activeSlotRef.current;
    setUploadingSlot(slot);
    const url = await uploadImage(file);
    if (url) setSlot(slot, url);
    setUploadingSlot(null);
  }, [slots, onMainChange, onGalleryChange]);

  const handleDrop = useCallback(async (e: React.DragEvent, slot: number) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setUploadingSlot(slot);
    const url = await uploadImage(file);
    if (url) setSlot(slot, url);
    setUploadingSlot(null);
  }, [slots, onMainChange, onGalleryChange]);

  const clickSlot = (slot: number) => {
    activeSlotRef.current = slot;
    inputRef.current?.click();
  };

  const confirmUrl = () => {
    if (urlInputSlot !== null && urlValue.trim()) {
      setSlot(urlInputSlot, urlValue.trim());
    }
    setUrlInputSlot(null);
    setUrlValue('');
  };

  const labels = ['Principal', 'Foto 2', 'Foto 3', 'Foto 4', 'Foto 5'];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {/* Main slot — larger */}
        <div className="w-[48%]">
          <p className="text-[10px] text-primary-foreground/40 mb-1.5 font-medium uppercase tracking-wide">Foto principal</p>
          <SlotCell
            url={slots[0]}
            label={labels[0]}
            isMain
            uploading={uploadingSlot === 0}
            onUpload={() => clickSlot(0)}
            onDrop={e => handleDrop(e, 0)}
            onRemove={() => setSlot(0, '')}
            onUrlClick={() => { setUrlInputSlot(0); setUrlValue(slots[0]); }}
          />
        </div>

        {/* Gallery slots 1-4 */}
        <div className="flex-1">
          <p className="text-[10px] text-primary-foreground/40 mb-1.5 font-medium uppercase tracking-wide">Galeria (até 4 fotos)</p>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map(i => (
              <SlotCell
                key={i}
                url={slots[i]}
                label={labels[i]}
                uploading={uploadingSlot === i}
                onUpload={() => clickSlot(i)}
                onDrop={e => handleDrop(e, i)}
                onRemove={() => setSlot(i, '')}
                onUrlClick={() => { setUrlInputSlot(i); setUrlValue(slots[i]); }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* URL input inline */}
      {urlInputSlot !== null && (
        <div className="flex gap-2 items-center p-3 bg-charcoal/60 rounded-lg border border-primary-foreground/15">
          <span className="text-xs text-primary-foreground/40 flex-shrink-0">{labels[urlInputSlot]}:</span>
          <input
            autoFocus
            type="url"
            value={urlValue}
            onChange={e => setUrlValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); confirmUrl(); } if (e.key === 'Escape') { setUrlInputSlot(null); setUrlValue(''); } }}
            placeholder="https://..."
            className="flex-1 h-8 px-2 rounded bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-xs focus:outline-none focus:border-cyan transition-colors"
          />
          <button type="button" onClick={confirmUrl}
            className="px-3 h-8 bg-cyan text-charcoal text-xs font-semibold rounded hover:bg-cyan/90 transition-colors flex-shrink-0">
            OK
          </button>
          <button type="button" onClick={() => { setUrlInputSlot(null); setUrlValue(''); }}
            className="h-8 w-8 flex items-center justify-center text-primary-foreground/40 hover:text-primary-foreground transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <p className="text-[10px] text-primary-foreground/25">JPG, PNG ou WebP · máx. 5MB por imagem</p>
    </div>
  );
};

const SlotCell = ({
  url, label, isMain, uploading, onUpload, onDrop, onRemove, onUrlClick,
}: {
  url: string; label: string; isMain?: boolean; uploading: boolean;
  onUpload: () => void; onDrop: (e: React.DragEvent) => void;
  onRemove: () => void; onUrlClick: () => void;
}) => {
  const [drag, setDrag] = useState(false);

  return url ? (
    <div className="relative group">
      <img src={url} alt={label}
        className={`w-full object-cover rounded-lg border border-primary-foreground/10 ${isMain ? 'aspect-[4/3]' : 'aspect-square'}`} />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
        <button type="button" onClick={onUpload}
          className="p-1.5 bg-charcoal/80 rounded-lg text-primary-foreground/70 hover:text-cyan transition-colors" title="Trocar imagem">
          <Upload className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={onRemove}
          className="p-1.5 bg-charcoal/80 rounded-lg text-primary-foreground/70 hover:text-red-400 transition-colors" title="Remover">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <span className="absolute bottom-1 left-1.5 text-[9px] text-white/60 font-medium">{label}</span>
    </div>
  ) : (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { setDrag(false); onDrop(e); }}
      className={`${isMain ? 'aspect-[4/3]' : 'aspect-square'} rounded-lg border-2 border-dashed transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer
        ${drag ? 'border-cyan bg-cyan/5' : 'border-primary-foreground/15 hover:border-primary-foreground/30'}`}
    >
      {uploading ? (
        <Loader2 className="w-5 h-5 text-cyan animate-spin" />
      ) : (
        <>
          <button type="button" onClick={onUpload}
            className="flex flex-col items-center gap-1 text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors">
            <Upload className={isMain ? 'w-6 h-6' : 'w-4 h-4'} />
            <span className={`font-medium ${isMain ? 'text-xs' : 'text-[10px]'}`}>{label}</span>
          </button>
          <button type="button" onClick={onUrlClick}
            className="text-[9px] text-primary-foreground/25 hover:text-cyan transition-colors mt-0.5 underline underline-offset-2">
            colar URL
          </button>
        </>
      )}
    </div>
  );
};

// ── Collapsible section ──────────────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-navy-dark/40 border border-primary-foreground/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-primary-foreground/3 transition-colors"
      >
        <span className="font-heading font-semibold text-primary-foreground">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-primary-foreground/40" /> : <ChevronDown className="w-4 h-4 text-primary-foreground/40" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
};

// ── Shared field styles ──────────────────────────────────────────────────────

const inputCls = "w-full h-10 px-3 rounded-lg bg-charcoal border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-cyan transition-colors";
const labelCls = "block text-xs font-medium text-primary-foreground/50 mb-1";

// ── Spec Builder ─────────────────────────────────────────────────────────────

type SpecRowDraft = {
  key: string;
  label: string;
  value: string;
  highlight: boolean;
  enabled: boolean;
};

type SpecCatDraft = {
  uid: string;
  title: string;
  icon_name: string;
  column: 'left' | 'right';
  rows: SpecRowDraft[];
};

const SPEC_CATALOG: Record<string, { icon: string; fields: { key: string; label: string }[] }> = {
  'Sistema de Câmera': {
    icon: 'Camera',
    fields: [
      { key: 'cam_type',         label: 'Tipo de Câmera'           },
      { key: 'cam_diameter',     label: 'Diâmetro da Câmera'        },
      { key: 'cam_resolution',   label: 'Resolução de Imagem'       },
      { key: 'cam_fov',          label: 'Campo de Visão (FOV)'      },
      { key: 'cam_angle',        label: 'Ângulo de Visão'           },
      { key: 'cam_depth',        label: 'Profundidade de Campo'     },
      { key: 'cam_sensor',       label: 'Sensor de Imagem'          },
      { key: 'cam_fps',          label: 'Frame Rate'                },
      { key: 'cam_zoom',         label: 'Zoom Digital'              },
    ],
  },
  'Cabo e Sonda': {
    icon: 'Plug2',
    fields: [
      { key: 'probe_diameter',   label: 'Diâmetro da Sonda'         },
      { key: 'cable_length',     label: 'Comprimento do Cabo'       },
      { key: 'cable_material',   label: 'Material do Cabo'          },
      { key: 'cable_rigidity',   label: 'Rigidez do Cabo'           },
      { key: 'cable_bend',       label: 'Raio de Curvatura Mínimo'  },
      { key: 'probe_coating',    label: 'Revestimento da Sonda'     },
      { key: 'probe_tip',        label: 'Diâmetro da Ponta'         },
    ],
  },
  'Articulação': {
    icon: 'Wrench',
    fields: [
      { key: 'art_type',         label: 'Tipo de Articulação'       },
      { key: 'art_ways',         label: 'Número de Vias'            },
      { key: 'art_angle',        label: 'Ângulo de Articulação'     },
      { key: 'art_control',      label: 'Controle de Articulação'   },
      { key: 'art_radius',       label: 'Raio de Curvatura'         },
    ],
  },
  'Iluminação': {
    icon: 'Lightbulb',
    fields: [
      { key: 'light_type',       label: 'Tipo de Iluminação'        },
      { key: 'light_count',      label: 'Número de LEDs'            },
      { key: 'light_power',      label: 'Potência dos LEDs'         },
      { key: 'light_adjust',     label: 'Ajuste de Brilho'          },
      { key: 'light_color',      label: 'Temperatura de Cor'        },
    ],
  },
  'Monitor / Display': {
    icon: 'Monitor',
    fields: [
      { key: 'screen_type',      label: 'Tipo de Tela'              },
      { key: 'screen_size',      label: 'Tamanho da Tela'           },
      { key: 'screen_resolution',label: 'Resolução da Tela'         },
      { key: 'screen_bright',    label: 'Brilho da Tela'            },
      { key: 'screen_touch',     label: 'Touchscreen'               },
      { key: 'screen_angle',     label: 'Ângulo de Visão da Tela'   },
    ],
  },
  'Gravação e Armazenamento': {
    icon: 'Video',
    fields: [
      { key: 'rec_video_fmt',    label: 'Formato de Vídeo'          },
      { key: 'rec_photo_fmt',    label: 'Formato de Foto'           },
      { key: 'rec_video_res',    label: 'Resolução de Vídeo'        },
      { key: 'rec_photo_res',    label: 'Resolução de Foto'         },
      { key: 'rec_internal',     label: 'Armazenamento Interno'     },
      { key: 'rec_media',        label: 'Cartão de Memória'         },
      { key: 'rec_outputs',      label: 'Saídas de Vídeo'           },
    ],
  },
  'Proteção e Resistência': {
    icon: 'Droplets',
    fields: [
      { key: 'prot_ip_cam',      label: 'Proteção IP da Câmera'     },
      { key: 'prot_ip_body',     label: 'Proteção IP do Corpo'      },
      { key: 'prot_temp_op',     label: 'Temperatura de Operação'   },
      { key: 'prot_temp_store',  label: 'Temperatura de Armazenamento' },
      { key: 'prot_pressure',    label: 'Resistência à Pressão'     },
      { key: 'prot_depth',       label: 'Profundidade Máxima'       },
      { key: 'prot_material',    label: 'Material do Corpo'         },
    ],
  },
  'Alimentação': {
    icon: 'Battery',
    fields: [
      { key: 'bat_type',         label: 'Tipo de Bateria'           },
      { key: 'bat_capacity',     label: 'Capacidade da Bateria'     },
      { key: 'bat_life',         label: 'Autonomia'                 },
      { key: 'bat_voltage',      label: 'Tensão de Entrada'         },
      { key: 'bat_charge_type',  label: 'Tipo de Carregamento'      },
      { key: 'bat_charge_time',  label: 'Tempo de Recarga'          },
    ],
  },
  'Dimensões e Peso': {
    icon: 'Ruler',
    fields: [
      { key: 'dim_weight',       label: 'Peso Total'                },
      { key: 'dim_weight_unit',  label: 'Peso da Unidade Principal' },
      { key: 'dim_unit',         label: 'Dimensões da Unidade'      },
      { key: 'dim_monitor',      label: 'Dimensões do Monitor'      },
      { key: 'dim_case',         label: 'Dimensões da Maleta'       },
    ],
  },
  'Conectividade': {
    icon: 'Waves',
    fields: [
      { key: 'conn_usb',         label: 'USB'                       },
      { key: 'conn_wifi',        label: 'Wi-Fi'                     },
      { key: 'conn_bt',          label: 'Bluetooth'                 },
      { key: 'conn_app',         label: 'Aplicativo Móvel'          },
      { key: 'conn_hdmi',        label: 'Saída HDMI'                },
      { key: 'conn_av',          label: 'Saída AV'                  },
    ],
  },
  'Conteúdo da Embalagem': {
    icon: 'Package',
    fields: [
      { key: 'pkg_unit',         label: 'Unidade Principal'         },
      { key: 'pkg_cable',        label: 'Cabo'                      },
      { key: 'pkg_charger',      label: 'Carregador'                },
      { key: 'pkg_case',         label: 'Maleta / Case'             },
      { key: 'pkg_adapters',     label: 'Adaptadores'               },
      { key: 'pkg_accessories',  label: 'Acessórios Inclusos'       },
      { key: 'pkg_manual',       label: 'Manual do Usuário'         },
    ],
  },
};

type DbSpecRow  = { label: string; value: string; highlight?: string };
type DbSpecCat  = { title: string; icon_name: string; rows: DbSpecRow[] };

const draftToSpecs = (cats: SpecCatDraft[], col: 'left' | 'right'): DbSpecCat[] =>
  cats
    .filter(c => c.column === col)
    .map(c => ({
      title: c.title,
      icon_name: c.icon_name,
      rows: c.rows
        .filter(r => r.enabled && r.value.trim())
        .map(r => ({ label: r.label, value: r.value, ...(r.highlight ? { highlight: 'accent' } : {}) })),
    }))
    .filter(c => c.rows.length > 0);

const specsToCatDraft = (left: DbSpecCat[], right: DbSpecCat[]): SpecCatDraft[] => {
  const fromSide = (side: DbSpecCat[], column: 'left' | 'right'): SpecCatDraft[] =>
    side.map((c, ci) => {
      const catalog = SPEC_CATALOG[c.title];
      const labelToKey: Record<string, string> = {};
      catalog?.fields.forEach(f => { labelToKey[f.label] = f.key; });

      const dbRowKeys = new Set<string>();
      const rows: SpecRowDraft[] = (c.rows ?? []).map((r, ri) => {
        const key = labelToKey[r.label] ?? `custom_${ri}`;
        dbRowKeys.add(key);
        return { key, label: r.label, value: r.value, highlight: r.highlight === 'accent', enabled: true };
      });

      // Add missing catalog fields as disabled placeholders
      catalog?.fields.forEach(f => {
        if (!dbRowKeys.has(f.key))
          rows.push({ key: f.key, label: f.label, value: '', highlight: false, enabled: false });
      });

      return { uid: `${column}_${ci}`, title: c.title, icon_name: c.icon_name ?? 'Wrench', column, rows };
    });
  return [...fromSide(left, 'left'), ...fromSide(right, 'right')];
};

const SpecBuilder = ({ value, onChange }: { value: SpecCatDraft[]; onChange: (v: SpecCatDraft[]) => void }) => {
  const [showCatalog, setShowCatalog] = useState(false);
  const addedTitles = new Set(value.map(c => c.title));

  const addFromCatalog = (title: string) => {
    const cat = SPEC_CATALOG[title];
    if (!cat) return;
    const leftCount  = value.filter(c => c.column === 'left').length;
    const rightCount = value.filter(c => c.column === 'right').length;
    const newCat: SpecCatDraft = {
      uid: `cat_${Date.now()}`,
      title,
      icon_name: cat.icon,
      column: leftCount <= rightCount ? 'left' : 'right',
      rows: cat.fields.map(f => ({ key: f.key, label: f.label, value: '', highlight: false, enabled: true })),
    };
    onChange([...value, newCat]);
    setShowCatalog(false);
  };

  const addCustomCat = () => {
    onChange([...value, {
      uid: `custom_${Date.now()}`,
      title: 'Nova Categoria',
      icon_name: 'Wrench',
      column: 'left',
      rows: [{ key: `r_${Date.now()}`, label: '', value: '', highlight: false, enabled: true }],
    }]);
    setShowCatalog(false);
  };

  const updateCat = (uid: string, patch: Partial<SpecCatDraft>) =>
    onChange(value.map(c => c.uid === uid ? { ...c, ...patch } : c));

  const removeCat = (uid: string) => onChange(value.filter(c => c.uid !== uid));

  const updateRow = (uid: string, rkey: string, patch: Partial<SpecRowDraft>) =>
    onChange(value.map(c => c.uid !== uid ? c : {
      ...c, rows: c.rows.map(r => r.key === rkey ? { ...r, ...patch } : r),
    }));

  const addCustomRow = (uid: string) =>
    onChange(value.map(c => c.uid !== uid ? c : {
      ...c, rows: [...c.rows, { key: `r_${Date.now()}`, label: '', value: '', highlight: false, enabled: true }],
    }));

  const removeRow = (uid: string, rkey: string) =>
    onChange(value.map(c => c.uid !== uid ? c : {
      ...c, rows: c.rows.filter(r => r.key !== rkey),
    }));

  const isCustomRow = (key: string) => key.startsWith('r_') || key.startsWith('custom_');

  return (
    <div className="space-y-3">
      {value.length === 0 && (
        <p className="text-xs text-primary-foreground/30 py-3">Nenhuma categoria adicionada. Clique em "+ Adicionar categoria" abaixo.</p>
      )}

      {value.map(cat => (
        <div key={cat.uid} className="border border-primary-foreground/15 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-primary-foreground/5 border-b border-primary-foreground/10">
            <select
              className="h-8 px-2 rounded bg-charcoal border border-primary-foreground/20 text-primary-foreground text-xs focus:outline-none focus:border-cyan flex-shrink-0"
              value={cat.icon_name}
              onChange={e => updateCat(cat.uid, { icon_name: e.target.value })}
            >
              {ICON_OPTIONS.map(ico => <option key={ico.value} value={ico.value}>{ico.label}</option>)}
            </select>
            <input
              className="flex-1 h-8 px-2 rounded bg-charcoal border border-primary-foreground/20 text-primary-foreground text-sm font-semibold focus:outline-none focus:border-cyan min-w-0"
              value={cat.title}
              onChange={e => updateCat(cat.uid, { title: e.target.value })}
              placeholder="Nome da categoria"
            />
            {/* Left / Right column toggle */}
            <div className="flex rounded overflow-hidden border border-primary-foreground/20 text-[11px] font-semibold flex-shrink-0">
              {(['left', 'right'] as const).map(col => (
                <button key={col} type="button"
                  onClick={() => updateCat(cat.uid, { column: col })}
                  className={`px-2.5 py-1 transition-colors ${cat.column === col ? 'bg-cyan text-navy-dark' : 'text-primary-foreground/40 hover:text-primary-foreground'}`}
                >
                  {col === 'left' ? 'Esq' : 'Dir'}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => removeCat(cat.uid)}
              className="h-8 w-8 flex items-center justify-center text-red-400/40 hover:text-red-400 transition-colors flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Rows */}
          <div className="px-4 py-3 space-y-1">
            {cat.rows.map(row => (
              <div key={row.key} className={`flex items-center gap-2 group transition-opacity ${!row.enabled ? 'opacity-35' : ''}`}>
                <input type="checkbox" checked={row.enabled}
                  onChange={e => updateRow(cat.uid, row.key, { enabled: e.target.checked })}
                  className="w-3.5 h-3.5 accent-cyan flex-shrink-0 cursor-pointer" />
                {isCustomRow(row.key) ? (
                  <input
                    className="w-44 h-7 px-2 rounded bg-charcoal/80 border border-primary-foreground/15 text-primary-foreground/70 text-xs focus:outline-none focus:border-cyan flex-shrink-0"
                    placeholder="Nome do campo"
                    value={row.label}
                    onChange={e => updateRow(cat.uid, row.key, { label: e.target.value })}
                  />
                ) : (
                  <span className="w-44 text-xs text-primary-foreground/55 flex-shrink-0 truncate" title={row.label}>{row.label}</span>
                )}
                <input
                  className="flex-1 h-7 px-2 rounded bg-charcoal/80 border border-primary-foreground/15 text-primary-foreground text-xs focus:outline-none focus:border-cyan disabled:cursor-not-allowed min-w-0"
                  value={row.value}
                  disabled={!row.enabled}
                  onChange={e => updateRow(cat.uid, row.key, { value: e.target.value })}
                  placeholder="Valor..."
                />
                <button type="button" title="Marcar como destaque (negrito laranja)"
                  onClick={() => updateRow(cat.uid, row.key, { highlight: !row.highlight })}
                  className={`h-7 w-7 flex items-center justify-center rounded text-sm flex-shrink-0 transition-colors ${row.highlight ? 'bg-accent/15 text-accent' : 'text-primary-foreground/20 hover:text-primary-foreground/50'}`}>
                  ★
                </button>
                {isCustomRow(row.key) && (
                  <button type="button" onClick={() => removeRow(cat.uid, row.key)}
                    className="h-7 w-7 flex items-center justify-center text-red-400/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addCustomRow(cat.uid)}
              className="mt-2 flex items-center gap-1 text-[11px] text-primary-foreground/30 hover:text-cyan transition-colors">
              <Plus className="w-3 h-3" /> campo personalizado
            </button>
          </div>
        </div>
      ))}

      {/* Add category panel */}
      {showCatalog ? (
        <div className="border border-primary-foreground/15 rounded-xl p-4 bg-navy-dark/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-primary-foreground">Selecionar categoria</span>
            <button type="button" onClick={() => setShowCatalog(false)}
              className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.keys(SPEC_CATALOG).map(title => {
              const already = addedTitles.has(title);
              return (
                <button key={title} type="button" disabled={already} onClick={() => addFromCatalog(title)}
                  className={`text-left px-3 py-2 rounded-lg text-xs border transition-colors
                    ${already
                      ? 'border-primary-foreground/5 text-primary-foreground/20 cursor-not-allowed bg-primary-foreground/3'
                      : 'border-primary-foreground/15 text-primary-foreground/70 hover:border-cyan hover:text-cyan hover:bg-cyan/5'}`}>
                  {title}
                  {already && <span className="ml-1 text-[10px] opacity-60">✓</span>}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={addCustomCat}
            className="mt-3 flex items-center gap-1 text-xs text-primary-foreground/35 hover:text-accent transition-colors">
            <Plus className="w-3 h-3" /> Criar categoria personalizada
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setShowCatalog(true)}
          className="flex items-center gap-2 text-sm text-cyan hover:underline">
          <Plus className="w-4 h-4" /> Adicionar categoria de especificações
        </button>
      )}

      {value.length > 0 && (
        <p className="text-[11px] text-primary-foreground/25">
          ★ = destaque (valor em laranja na página do produto) · Esq/Dir = qual coluna na página
        </p>
      )}
    </div>
  );
};

// ── Slug helper ──────────────────────────────────────────────────────────────

const toSlug = (str: string) =>
  str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// ── Main form ────────────────────────────────────────────────────────────────

const AdminProductForm = () => {
  const { productId } = useParams<{ productId?: string }>();
  const isEdit = !!productId;
  const navigate = useNavigate();

  const [product, setProduct] = useState(emptyProduct);
  const [details, setDetails] = useState(emptyDetails);
  const [specCats, setSpecCats] = useState<SpecCatDraft[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const slugEditedRef = useRef(isEdit);
  const { lines } = useProductLines();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login');
    });
  }, [navigate]);

  // Categoria padrão do produto novo assim que as linhas carregarem
  useEffect(() => {
    if (!isEdit && !product.category && lines.length > 0) {
      setProduct(prev => ({ ...prev, category: lines[0].category }));
    }
  }, [isEdit, lines, product.category]);

  useEffect(() => {
    if (!isEdit) return;
    Promise.all([
      supabase.from('products').select('*').eq('id', productId).single(),
      supabase.from('product_details').select('*').eq('product_id', productId).single(),
    ]).then(([{ data: p }, { data: d }]) => {
      if (p) setProduct({ ...emptyProduct, ...p });
      if (d) {
        setDetails({
          ...emptyDetails,
          ...d,
          accessories_list: d.accessories_list ?? [],
          applications:     d.applications     ?? [],
          accessories:      d.accessories      ?? [],
          accessories_table: Array.isArray(d.accessories_table) ? d.accessories_table : [],
          features:         d.features         ?? [],
        });
        setSpecCats(specsToCatDraft(d.specs_left ?? [], d.specs_right ?? []));
      }
      setLoading(false);
    });
  }, [isEdit, productId]);

  const setP = (key: keyof typeof emptyProduct, val: string | boolean) =>
    setProduct(prev => ({ ...prev, [key]: val }));
  const setD = <K extends keyof DbProductDetails>(key: K, val: DbProductDetails[K]) =>
    setDetails(prev => ({ ...prev, [key]: val }));

  // ── Features helpers ──────────────────────────────────────────────────────

  const addFeature = () =>
    setD('features', [...details.features, { icon_name: 'Camera', label: '', sublabel: '' }]);

  const updateFeature = (i: number, patch: Partial<FeatureRow>) =>
    setD('features', details.features.map((f, idx) => idx === i ? { ...f, ...patch } : f));

  const removeFeature = (i: number) =>
    setD('features', details.features.filter((_, idx) => idx !== i));

  // ── Accessories table helpers ─────────────────────────────────────────────

  const accTables = details.accessories_table;

  const patchTable = (ti: number, patch: Partial<typeof accTables[0]>) =>
    setD('accessories_table', accTables.map((t, i) => i === ti ? { ...t, ...patch } : t));

  const accAddTable = () =>
    setD('accessories_table', [
      ...accTables,
      { title: '', columns: [...DEFAULT_ACC_COLUMNS], rows: [] },
    ]);

  const accRemoveTable = (ti: number) =>
    setD('accessories_table', accTables.filter((_, i) => i !== ti));

  const accRenameTitle = (ti: number, val: string) =>
    patchTable(ti, { title: val });

  const accAddColumn = (ti: number) => {
    const t = accTables[ti];
    patchTable(ti, { columns: [...t.columns, 'Nova coluna'], rows: t.rows.map(r => [...r, '']) });
  };

  const accRemoveColumn = (ti: number, ci: number) => {
    const t = accTables[ti];
    patchTable(ti, {
      columns: t.columns.filter((_, i) => i !== ci),
      rows: t.rows.map(r => r.filter((_, i) => i !== ci)),
    });
  };

  const accRenameColumn = (ti: number, ci: number, val: string) => {
    const t = accTables[ti];
    patchTable(ti, { columns: t.columns.map((c, i) => i === ci ? val : c) });
  };

  const accAddRow = (ti: number) => {
    const t = accTables[ti];
    patchTable(ti, { rows: [...t.rows, t.columns.map(() => '')] });
  };

  const accRemoveRow = (ti: number, ri: number) => {
    const t = accTables[ti];
    patchTable(ti, { rows: t.rows.filter((_, i) => i !== ri) });
  };

  const accUpdateCell = (ti: number, ri: number, ci: number, val: string) => {
    const t = accTables[ti];
    patchTable(ti, {
      rows: t.rows.map((r, i) => i === ri ? r.map((c, j) => j === ci ? val : c) : r),
    });
  };

  // ── FAQ helpers ───────────────────────────────────────────────────────────

  const addFaq = () => setD('faqs', [...details.faqs, { question: '', answer: '' }]);

  const updateFaq = (i: number, patch: Partial<FaqRow>) =>
    setD('faqs', details.faqs.map((f, idx) => idx === i ? { ...f, ...patch } : f));

  const removeFaq = (i: number) =>
    setD('faqs', details.faqs.filter((_, idx) => idx !== i));

  // ── Video helpers ─────────────────────────────────────────────────────────

  const addVideo = () => setD('videos', [...details.videos, { title: '', duration: '', url: '' }]);

  const updateVideo = (i: number, patch: Partial<VideoRow>) =>
    setD('videos', details.videos.map((v, idx) => idx === i ? { ...v, ...patch } : v));

  const removeVideo = (i: number) =>
    setD('videos', details.videos.filter((_, idx) => idx !== i));

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!product.name.trim()) { setError('O nome do produto é obrigatório.'); return; }

    const slug = product.id.trim()
      ? toSlug(product.id.trim())
      : toSlug(product.name.trim());

    if (!slug) { setError('Não foi possível gerar um slug. Preencha o nome do produto.'); return; }

    setSaving(true);

    const productPayload = {
      id: slug,
      name: product.name.trim(),
      description: product.description,
      category: product.category,
      image_url: product.image_url || null,
      gallery: product.gallery ?? [],
      cable: product.cable,
      probe: product.probe,
      camera: product.camera,
      ip: product.ip,
      active: product.active,
      seo_title: product.seo_title || null,
      seo_description: product.seo_description || null,
      spec_labels: product.spec_labels && Object.values(product.spec_labels).some(v => v)
        ? product.spec_labels
        : null,
    };

    const detailsPayload = {
      product_id: slug,
      manual_url: details.manual_url || null,
      accessories_tip: details.accessories_tip || null,
      specs_description: details.specs_description || null,
      features: details.features,
      specs_left: draftToSpecs(specCats, 'left'),
      specs_right: draftToSpecs(specCats, 'right'),
      accessories: details.accessories,
      accessories_table: details.accessories_table.length > 0 ? details.accessories_table : null,
      accessories_list: details.accessories_list,
      applications: details.applications,
      faqs: details.faqs,
      videos: details.videos,
    };

    const slugChanged = isEdit && slug !== productId;

    if (slugChanged) {
      // Insert with new slug
      const { error: insertErr } = await supabase.from('products').insert(productPayload);
      if (insertErr) {
        setError(`Erro ao renomear slug: ${insertErr.message}`);
        setSaving(false);
        return;
      }
      // Move product_details to new slug
      await supabase.from('product_details').update({ product_id: slug }).eq('product_id', productId!);
      // Upsert full details under new slug
      await supabase.from('product_details').upsert(detailsPayload, { onConflict: 'product_id' });
      // Remove old product
      await supabase.from('products').delete().eq('id', productId!);
    } else {
      const { error: productError } = isEdit
        ? await supabase.from('products').update(productPayload).eq('id', productId!)
        : await supabase.from('products').insert(productPayload);

      if (productError) {
        setError(`Erro ao salvar produto: ${productError.message}`);
        setSaving(false);
        return;
      }

      await supabase.from('product_details').upsert(detailsPayload, { onConflict: 'product_id' });
    }

    setSaving(false);
    navigate('/admin');
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
      {/* Top bar */}
      <header className="border-b border-primary-foreground/10 bg-navy-dark/50 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="font-heading font-bold text-primary-foreground">
              {isEdit ? 'Editar Produto' : 'Novo Produto'}
            </span>
          </div>
          <button
            type="submit"
            form="product-form"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-50"
          >
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

        <form id="product-form" onSubmit={handleSubmit} className="space-y-5">

          {/* ── Básico ── */}
          <Section title="Informações Básicas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Nome do Produto *</label>
                <input
                  className={inputCls}
                  value={product.name}
                  onChange={e => {
                    setP('name', e.target.value);
                    if (!slugEditedRef.current) setP('id', toSlug(e.target.value));
                  }}
                  placeholder="ex: SK3208 Endoscópio para Tubulações"
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Categoria *</label>
                <select
                  className={inputCls}
                  value={product.category}
                  onChange={e => setP('category', e.target.value)}
                >
                  {lines.map(l => <option key={l.id} value={l.category}>{l.category}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>
                Slug personalizado{!isEdit && ' (deixe em branco para gerar automaticamente do título)'}
              </label>
              <input
                className={inputCls}
                value={product.id}
                onChange={e => {
                  slugEditedRef.current = true;
                  setP('id', e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }}
                placeholder={product.name ? toSlug(product.name) : 'gerado-automaticamente-do-nome'}
              />
              <p className="text-xs text-primary-foreground/30 mt-1">
                URL: <span className="text-cyan">/{product.id || (product.name ? toSlug(product.name) : '...')}</span>
                {isEdit && product.id !== productId && (
                  <span className="ml-2 text-amber-400">⚠ Alterar o slug muda a URL do produto e quebra links existentes</span>
                )}
              </p>
            </div>

            <div>
              <label className={labelCls}>Descrição curta</label>
              <textarea
                className={`${inputCls} h-20 resize-none py-2`}
                value={product.description}
                onChange={e => setP('description', e.target.value)}
                placeholder="Descrição exibida no card do produto..."
              />
            </div>

            <div>
              <label className={labelCls}>Fotos do Produto</label>
              <GalleryUploader
                mainImage={product.image_url ?? ''}
                gallery={product.gallery ?? []}
                onMainChange={url => setP('image_url', url)}
                onGalleryChange={urls => setProduct(prev => ({ ...prev, gallery: urls }))}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['cable', 'probe', 'camera', 'ip'] as const).map(key => (
                <div key={key}>
                  <label className={labelCls}>
                    {{ cable: 'Cabo máx.', probe: 'Sonda', camera: 'Câmera', ip: 'Proteção IP' }[key]}
                  </label>
                  <input
                    className={inputCls}
                    value={product[key]}
                    onChange={e => setP(key, e.target.value)}
                    placeholder={{ cable: '30m', probe: 'Ø8mm', camera: '1080p', ip: 'IP68' }[key]}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="active"
                type="checkbox"
                checked={product.active}
                onChange={e => setP('active', e.target.checked)}
                className="w-4 h-4 accent-cyan"
              />
              <label htmlFor="active" className="text-sm text-primary-foreground/70 cursor-pointer">
                Produto ativo (visível no site)
              </label>
            </div>
          </Section>

          {/* ── SEO ── */}
          <Section title="SEO (Google / IAs)">
            <div>
              <label className={labelCls}>
                Title tag{' '}
                <span className={`text-xs font-normal ${(product.seo_title?.length ?? 0) > 60 ? 'text-red-400' : 'text-primary-foreground/40'}`}>
                  {product.seo_title?.length ?? 0}/60 caracteres
                </span>
              </label>
              <input
                className={inputCls}
                value={product.seo_title ?? ''}
                onChange={e => setP('seo_title', e.target.value)}
                placeholder={`${product.name || 'Nome do produto'} | BOROTEC Industrial`}
                maxLength={80}
              />
              <p className="text-xs text-primary-foreground/30 mt-1">
                Título exibido nos resultados do Google e IAs. Ideal: até 60 caracteres.
              </p>
            </div>
            <div>
              <label className={labelCls}>
                Meta description{' '}
                <span className={`text-xs font-normal ${(product.seo_description?.length ?? 0) > 160 ? 'text-red-400' : 'text-primary-foreground/40'}`}>
                  {product.seo_description?.length ?? 0}/155 caracteres
                </span>
              </label>
              <textarea
                className={`${inputCls} h-24 resize-y py-2`}
                value={product.seo_description ?? ''}
                onChange={e => setP('seo_description', e.target.value)}
                placeholder="Descreva o produto em ~155 caracteres. Inclua o nome, aplicação principal e um diferencial."
                maxLength={200}
              />
              <p className="text-xs text-primary-foreground/30 mt-1">
                Aparece no snippet do Google. Ideal: 120–155 caracteres. Se vazio, usa a descrição curta.
              </p>
            </div>
          </Section>

          {/* ── Labels dos badges ── */}
          <Section title="Labels dos Badges do Card">
            <p className="text-xs text-primary-foreground/40 -mt-1 mb-3">
              Personalize os rótulos exibidos nos badges de especificação. Deixe em branco para usar o padrão da linha.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {([
                { key: 'probe',  placeholder: 'Sonda'    },
                { key: 'cable',  placeholder: 'Cabo'     },
                { key: 'camera', placeholder: 'Câmera'   },
                { key: 'ip',     placeholder: 'Proteção' },
              ] as const).map(({ key, placeholder }) => (
                <div key={key}>
                  <label className={labelCls}>{placeholder}</label>
                  <input
                    className={inputCls}
                    value={product.spec_labels?.[key] ?? ''}
                    onChange={e => setProduct(prev => ({
                      ...prev,
                      spec_labels: { ...(prev.spec_labels ?? {}), [key]: e.target.value },
                    }))}
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </Section>

          {/* ── Features ── */}
          <Section title="Ícones de Destaque (Features)">
            {details.features.map((f, i) => (
              <div key={i} className="grid grid-cols-[140px_1fr_1fr_auto] gap-2 items-end">
                <div>
                  {i === 0 && <label className={labelCls}>Ícone</label>}
                  <select
                    className={inputCls}
                    value={f.icon_name}
                    onChange={e => updateFeature(i, { icon_name: e.target.value })}
                  >
                    {ICON_OPTIONS.map(ico => <option key={ico.value} value={ico.value}>{ico.label}</option>)}
                  </select>
                </div>
                <div>
                  {i === 0 && <label className={labelCls}>Label</label>}
                  <input
                    className={inputCls}
                    value={f.label}
                    onChange={e => updateFeature(i, { label: e.target.value })}
                    placeholder="ex: Câmera HD"
                  />
                </div>
                <div>
                  {i === 0 && <label className={labelCls}>Sublabel</label>}
                  <input
                    className={inputCls}
                    value={f.sublabel}
                    onChange={e => updateFeature(i, { sublabel: e.target.value })}
                    placeholder="ex: 1920×1080px"
                  />
                </div>
                <button type="button" onClick={() => removeFeature(i)} className="h-10 w-10 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addFeature} className="flex items-center gap-2 text-sm text-cyan hover:underline">
              <Plus className="w-4 h-4" /> Adicionar feature
            </button>
          </Section>

          {/* ── Manual ── */}
          <Section title="Catálogo Técnico">
            <div>
              <label className={labelCls}>URL do Catálogo Técnico (PDF)</label>
              <input
                className={inputCls}
                type="url"
                value={details.manual_url ?? ''}
                onChange={e => setD('manual_url', e.target.value)}
                placeholder="https://... link para download do manual"
              />
            </div>
          </Section>

          {/* ── Specs — visual builder ── */}
          <Section title="Especificações Técnicas">
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary-foreground/70 mb-1">
                Texto introdutório (aparece acima das especificações)
              </label>
              <textarea
                rows={3}
                className="w-full bg-primary-foreground/5 border border-primary-foreground/20 rounded-lg px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-cyan resize-none"
                placeholder="Ex: Todas as especificações são referentes ao modelo padrão. Versões customizadas disponíveis mediante consulta."
                value={details.specs_description ?? ''}
                onChange={e => setD('specs_description', e.target.value)}
              />
            </div>
            <SpecBuilder value={specCats} onChange={setSpecCats} />
          </Section>

          {/* ── Acessórios ── */}
          <Section title="Acessórios">
            {/* Bullet list */}
            <div>
              <label className={labelCls}>Lista de acessórios inclusos (um por linha)</label>
              <textarea
                className={`${inputCls} h-28 resize-y py-2`}
                value={details.accessories_list.join('\n')}
                onChange={e => setD('accessories_list', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                placeholder={"Maleta de transporte\nCarregador AC/DC\nCabo HDMI\nSuporte articulado"}
              />
            </div>

            {/* Dynamic accessories tables */}
            <div className="space-y-4">
              {accTables.map((tbl, ti) => (
                <div key={ti} className="p-4 bg-charcoal/60 rounded-xl border border-primary-foreground/10 space-y-3">
                  {/* Table header row */}
                  <div className="flex items-center gap-2">
                    <input
                      className={`${inputCls} flex-1 font-medium`}
                      value={tbl.title}
                      onChange={e => accRenameTitle(ti, e.target.value)}
                      placeholder="Título da tabela (ex: Modelos de Sonda, Acessórios Adicionais)"
                    />
                    <button
                      type="button"
                      onClick={() => accRemoveTable(ti)}
                      className="text-red-400/60 hover:text-red-400 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Column chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    {tbl.columns.map((col, ci) => (
                      <div key={ci} className="flex items-center bg-secondary/80 border border-primary-foreground/10 rounded-lg overflow-hidden">
                        <input
                          className="bg-transparent text-xs text-primary-foreground px-2 py-1.5 w-28 min-w-0 focus:outline-none"
                          value={col}
                          onChange={e => accRenameColumn(ti, ci, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => accRemoveColumn(ti, ci)}
                          className="px-1.5 text-red-400/50 hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => accAddColumn(ti)}
                      className="flex items-center gap-1 text-xs text-cyan hover:underline px-2 py-1.5"
                    >
                      <Plus className="w-3 h-3" /> Coluna
                    </button>
                  </div>

                  {/* Rows */}
                  <div className="space-y-2">
                    {tbl.rows.map((row, ri) => (
                      <div key={ri} className="flex items-center gap-2">
                        <span className="text-xs text-primary-foreground/30 w-5 flex-shrink-0 text-right">{ri + 1}</span>
                        {row.map((cell, ci) => (
                          <input
                            key={ci}
                            className={`${inputCls} flex-1 min-w-0 text-xs`}
                            value={cell}
                            placeholder={tbl.columns[ci] ?? ''}
                            onChange={e => accUpdateCell(ti, ri, ci, e.target.value)}
                          />
                        ))}
                        <button
                          type="button"
                          onClick={() => accRemoveRow(ti, ri)}
                          className="text-red-400/60 hover:text-red-400 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => accAddRow(ti)}
                    className="flex items-center gap-2 text-xs text-cyan hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar linha
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={accAddTable}
                className="flex items-center gap-2 text-sm text-cyan hover:underline"
              >
                <Plus className="w-4 h-4" /> Adicionar tabela
              </button>
            </div>

            <div>
              <label className={labelCls}>Dica / Nota (exibida abaixo das tabelas)</label>
              <input
                className={inputCls}
                value={details.accessories_tip ?? ''}
                onChange={e => setD('accessories_tip', e.target.value)}
                placeholder="ex: Consulte-nos para acessórios personalizados."
              />
            </div>
          </Section>

          {/* ── Aplicações ── */}
          <Section title="Aplicações">
            <div>
              <label className={labelCls}>Uma aplicação por linha</label>
              <textarea
                className={`${inputCls} h-32 resize-y py-2`}
                value={details.applications.join('\n')}
                onChange={e => setD('applications', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                placeholder={"Inspeção de tubulações de água\nInspeção de dutos de gás\nInspeção de esgoto"}
              />
            </div>
          </Section>

          {/* ── FAQs ── */}
          <Section title="Perguntas Frequentes (FAQ)">
            {details.faqs.map((f, i) => (
              <div key={i} className="p-3 bg-charcoal/60 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary-foreground/40 font-medium">Pergunta {i + 1}</span>
                  <button type="button" onClick={() => removeFaq(i)} className="text-red-400/60 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  className={inputCls}
                  value={f.question}
                  onChange={e => updateFaq(i, { question: e.target.value })}
                  placeholder="Pergunta..."
                />
                <textarea
                  className={`${inputCls} h-20 resize-none py-2`}
                  value={f.answer}
                  onChange={e => updateFaq(i, { answer: e.target.value })}
                  placeholder="Resposta..."
                />
              </div>
            ))}
            <button type="button" onClick={addFaq} className="flex items-center gap-2 text-sm text-cyan hover:underline">
              <Plus className="w-4 h-4" /> Adicionar pergunta
            </button>
          </Section>

          {/* ── Vídeos ── */}
          <Section title="Vídeos">
            {details.videos.map((v, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_1fr_auto] gap-2 items-end">
                <div>
                  {i === 0 && <label className={labelCls}>Título</label>}
                  <input
                    className={inputCls}
                    value={v.title}
                    onChange={e => updateVideo(i, { title: e.target.value })}
                    placeholder="Tutorial de uso"
                  />
                </div>
                <div>
                  {i === 0 && <label className={labelCls}>Duração</label>}
                  <input
                    className={inputCls}
                    value={v.duration}
                    onChange={e => updateVideo(i, { duration: e.target.value })}
                    placeholder="5:23"
                  />
                </div>
                <div>
                  {i === 0 && <label className={labelCls}>URL do vídeo</label>}
                  <input
                    className={inputCls}
                    value={v.url ?? ''}
                    onChange={e => updateVideo(i, { url: e.target.value })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <button type="button" onClick={() => removeVideo(i)} className="h-10 w-10 flex items-center justify-center text-red-400/60 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addVideo} className="flex items-center gap-2 text-sm text-cyan hover:underline">
              <Plus className="w-4 h-4" /> Adicionar vídeo
            </button>
          </Section>

          {/* ── Footer save ── */}
          <div className="flex justify-end pt-2 pb-10">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Salvando...' : 'Salvar Produto'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminProductForm;
