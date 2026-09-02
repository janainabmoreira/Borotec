import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { type SpecGroup, type AccessoryRow } from '@/data/productDetails';
import { useWhatsAppMessage } from '@/hooks/useWhatsAppMessage';
import { useUTMCapture } from '@/hooks/useUTMCapture';
import { useGclidCapture } from '@/hooks/useGclidCapture';
import { usePrerenderSignal } from '@/hooks/usePrerenderSignal';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useProductLines } from '@/hooks/useProductLines';
import { ICON_MAP } from '@/lib/iconMap';
import {
  ArrowLeft, Plus, Check, MessageCircle, ChevronRight,
  Camera, Battery, Monitor, Briefcase, ChevronLeft,
  FileText, Download, X, Clock,
  Trophy, Wrench, GraduationCap, ShieldCheck, User, Phone, Mail,
  Send, Building2, Loader2,
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = '5925cc10-7d22-4eff-a5eb-242540505331';

// ── Icon thumbnails ───────────────────────────────────────────────────────────

const thumbItems = [
  { icon: Camera,    label: 'Vista'   },
  { icon: Battery,   label: 'Bateria' },
  { icon: Monitor,   label: 'Display' },
  { icon: Briefcase, label: 'Kit'     },
];

// ── Trust badges (Accessories tab) ───────────────────────────────────────────

const trustBadges = [
  { icon: Trophy,        title: 'Equipamentos de alta qualidade',    sub: 'Testados e certificados'       },
  { icon: Wrench,        title: 'Assistência técnica especializada', sub: 'Atendimento em todo o Brasil'  },
  { icon: GraduationCap, title: 'Treinamento e suporte técnico',     sub: 'Capacitação inclusa na compra' },
  { icon: ShieldCheck,   title: 'Garantia e confiabilidade',         sub: '12 meses com suporte dedicado' },
];

// ── Manual lead modal ─────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '5511932876195';

const ManualModal = ({ productName, manualUrl, onClose }: { productName: string; manualUrl?: string; onClose: () => void }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const utms = useUTMCapture();
  const gclid = useGclidCapture();

  const allFilled = form.name.trim() !== '' && form.phone.trim() !== '' && form.email.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFilled) return;

    supabase.from('leads').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: `Catálogo: ${productName}`,
      message: `Solicitação de catálogo técnico – ${window.location.pathname}`,
      utm_source: utms.utm_source || null,
      utm_medium: utms.utm_medium || null,
      utm_campaign: utms.utm_campaign || null,
      utm_term: utms.utm_term || null,
      utm_content: utms.utm_content || null,
      gclid: gclid || null,
    }).then(() => {});

    if (manualUrl) {
      window.open(manualUrl, '_blank');
    } else {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
      const msg = encodeURIComponent(
        `${greeting}! Gostaria de receber o catálogo técnico *${productName}*.\n\nNome: ${form.name}\nTelefone: ${form.phone}\nE-mail: ${form.email}`
      );
      window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${msg}`, '_blank');
    }
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-charcoal border border-primary-foreground/15 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/15 rounded-xl flex items-center justify-center">
              <FileText className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-primary-foreground">Catálogo Técnico</p>
              <p className="font-body text-xs text-primary-foreground/40">{manualUrl ? 'Preencha para liberar o download' : 'Preencha para solicitar'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary-foreground/10 transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground/50" />
          </button>
        </div>

        {submitted ? (
          /* Success state */
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="font-heading font-bold text-lg text-primary-foreground mb-2">
              {manualUrl ? 'Download iniciado!' : 'Solicitação enviada!'}
            </h3>
            <p className="font-body text-sm text-primary-foreground/60 mb-6">
              {manualUrl
                ? 'O catálogo técnico foi aberto em uma nova aba. Salve o PDF no seu dispositivo.'
                : 'Sua solicitação foi encaminhada via WhatsApp. Nossa equipe enviará o manual em breve.'}
            </p>
            <Button variant="outline" className="w-full" onClick={onClose}>Fechar</Button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <p className="font-body text-xs text-primary-foreground/50 leading-relaxed">
              Para receber o manual do <span className="text-primary-foreground font-medium">{productName}</span>,
              preencha seus dados e nossa equipe te enviará diretamente.
            </p>

            {/* Nome */}
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-primary-foreground/70">Nome completo *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Seu nome"
                  className="w-full pl-9 pr-4 py-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 focus:bg-primary-foreground/10 transition-colors"
                />
              </div>
            </div>

            {/* Telefone */}
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-primary-foreground/70">Telefone / WhatsApp *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30 pointer-events-none" />
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                  className="w-full pl-9 pr-4 py-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 focus:bg-primary-foreground/10 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-primary-foreground/70">E-mail *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="seu@email.com"
                  className="w-full pl-9 pr-4 py-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 focus:bg-primary-foreground/10 transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              disabled={!allFilled}
              className="w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              {manualUrl
                ? <><Download className="w-4 h-4 mr-2" />{allFilled ? 'Baixar Catálogo Técnico' : 'Preencha todos os campos'}</>
                : <><MessageCircle className="w-4 h-4 mr-2" />{allFilled ? 'Solicitar Catálogo via WhatsApp' : 'Preencha todos os campos'}</>
              }
            </Button>

            <p className="font-body text-[10px] text-primary-foreground/30 text-center">
              Seus dados são usados apenas para envio do manual. Sem spam.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

// ── Quote modal ───────────────────────────────────────────────────────────────

const QuoteModal = ({ productName, productId, onClose }: { productName: string; productId: string; onClose: () => void }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const utms = useUTMCapture();
  const gclid = useGclidCapture();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Orçamento] ${productName}`,
          from_name: form.name,
          email: form.email,
          phone: form.phone || 'Não informado',
          company: form.company || 'Não informada',
          produto: productName,
          produto_url: `https://borotec.com.br/produtos/${productId}`,
          origem: utms.utm_source || 'direto',
          utm_medium: utms.utm_medium || null,
          utm_campaign: utms.utm_campaign || null,
          gclid: gclid || null,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();

      supabase.from('leads').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        subject: `Orçamento: ${productName}`,
        message: `Solicitação de orçamento para o produto ${productName} (${productId})`,
        utm_source: utms.utm_source || null,
        utm_medium: utms.utm_medium || null,
        utm_campaign: utms.utm_campaign || null,
        utm_term: utms.utm_term || null,
        utm_content: utms.utm_content || null,
        gclid: gclid || null,
      }).then(() => {});

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'Formulario_orcamento_produto' });

      setSubmitted(true);
    } catch {
      setError('Não foi possível enviar. Tente novamente ou use o WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-charcoal border border-primary-foreground/15 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/15 rounded-xl flex items-center justify-center">
              <Send className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-primary-foreground">Solicitar Orçamento</p>
              <p className="font-body text-xs text-primary-foreground/40">Resposta em até 1 dia útil por e-mail</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary-foreground/10 transition-colors">
            <X className="w-4 h-4 text-primary-foreground/50" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="font-heading font-bold text-lg text-primary-foreground mb-2">Orçamento solicitado!</h3>
            <p className="font-body text-sm text-primary-foreground/60 mb-1">
              Enviamos a confirmação para <span className="text-primary-foreground font-medium">{form.email}</span>.
            </p>
            <p className="font-body text-sm text-primary-foreground/50 mb-6">
              Nossa equipe responde em até 1 dia útil.
            </p>
            <Button variant="outline" className="w-full" onClick={onClose}>Fechar</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <p className="font-body text-xs text-primary-foreground/50 leading-relaxed">
              Preencha seus dados para receber o orçamento do{' '}
              <span className="text-primary-foreground font-medium">{productName}</span> por e-mail.
            </p>

            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-primary-foreground/70">Nome completo *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30 pointer-events-none" />
                <input type="text" required value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Seu nome"
                  className="w-full pl-9 pr-4 py-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-primary-foreground/70">E-mail *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30 pointer-events-none" />
                <input type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="seu@email.com"
                  className="w-full pl-9 pr-4 py-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-body text-xs font-medium text-primary-foreground/70">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30 pointer-events-none" />
                  <input type="tel" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-9 pr-3 py-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 transition-colors" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="font-body text-xs font-medium text-primary-foreground/70">Empresa</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30 pointer-events-none" />
                  <input type="text" value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="Nome da empresa"
                    className="w-full pl-9 pr-3 py-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 transition-colors" />
                </div>
              </div>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <Button type="submit" variant="cta" size="lg" className="w-full mt-2" disabled={sending}>
              {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {sending ? 'Enviando...' : 'Solicitar Orçamento por E-mail'}
            </Button>

            <p className="font-body text-[10px] text-primary-foreground/30 text-center">
              Sem spam. Seus dados são usados apenas para envio do orçamento.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

// ── Spec table ────────────────────────────────────────────────────────────────

const SpecTable = ({ groups }: { groups: SpecGroup[] }) => (
  <div className="space-y-4">
    {groups.map((group, i) => {
      const Icon = group.icon;
      return (
        <div key={`${group.title}-${i}`} className="rounded-xl overflow-hidden border border-primary-foreground/10">
          <div className="flex items-center gap-2.5 px-5 py-3 bg-primary-foreground/10">
            <Icon className="w-4 h-4 text-cyan flex-shrink-0" />
            <span className="font-heading font-bold text-xs tracking-widest text-primary-foreground/70 uppercase">
              {group.title}
            </span>
          </div>
          <div>
            {group.rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 px-5 py-3 ${i % 2 === 0 ? 'bg-primary-foreground/[0.03]' : ''}`}
              >
                <span className="font-body text-sm text-primary-foreground/50 flex-shrink-0 w-32 sm:w-44">
                  {row.label}
                </span>
                <span className={`font-body text-sm font-medium text-right ${
                  row.highlight === 'accent' ? 'text-accent'
                  : row.highlight === 'green' ? 'text-emerald-400'
                  : 'text-primary-foreground'
                }`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

// ── Accessories table ─────────────────────────────────────────────────────────

const legacyAccHeaders: { label: string; key: keyof AccessoryRow }[] = [
  { label: 'Modelo',             key: 'model'         },
  { label: 'Diâmetro da câmera', key: 'probeDiameter' },
  { label: 'Rigidez da sonda',   key: 'rigidity'      },
  { label: 'Diâmetro do cabo',   key: 'cableDiameter' },
  { label: 'Tipo de câmera',     key: 'cameraType'    },
  { label: 'Revestimento',       key: 'coating'       },
  { label: 'Comprimento',        key: 'length'        },
];

const AccSingleTable = ({ tbl }: { tbl: { title: string; columns: string[]; rows: string[][] } }) => (
  <div className="space-y-3">
    {tbl.title && (
      <div className="flex items-center gap-3">
        <div className="w-1 h-4 bg-accent rounded-full" />
        <h4 className="font-heading font-bold text-sm text-primary-foreground">{tbl.title}</h4>
      </div>
    )}
    <div className="overflow-x-auto rounded-xl border border-primary-foreground/10">
      <table className="w-full text-sm font-body" style={{ minWidth: `${Math.max(400, tbl.columns.length * 120)}px` }}>
        <thead>
          <tr className="bg-primary-foreground/10 border-b border-primary-foreground/10">
            {tbl.columns.map((col, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold text-primary-foreground/60 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbl.rows.map((row, ri) => (
            <tr key={ri} className={`border-b border-primary-foreground/[0.06] last:border-b-0 ${ri % 2 === 1 ? 'bg-primary-foreground/[0.03]' : ''}`}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 whitespace-nowrap ${ci === 0 ? 'text-accent font-semibold' : 'text-primary-foreground/70'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AccessoriesTable = ({
  tables,
  rows,
  list,
  tip,
}: {
  tables?: Array<{ title: string; columns: string[]; rows: string[][] }>;
  rows: AccessoryRow[];
  list?: string[];
  tip: string;
}) => {
  const hasDynamic = tables && tables.some(t => t.rows.length > 0);

  return (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="w-1 h-5 bg-accent rounded-full" />
      <h3 className="font-heading font-bold text-base text-primary-foreground">
        Acessórios e modelos compatíveis
      </h3>
    </div>

    {hasDynamic
      ? (
        <div className="space-y-6">
          {tables!.filter(t => t.rows.length > 0).map((tbl, i) => (
            <AccSingleTable key={i} tbl={tbl} />
          ))}
        </div>
      )
      : rows.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-primary-foreground/10">
          <table className="w-full text-sm font-body" style={{ minWidth: '700px' }}>
            <thead>
              <tr className="bg-primary-foreground/10 border-b border-primary-foreground/10">
                {legacyAccHeaders.map(h => (
                  <th key={h.key} className="px-4 py-3 text-left font-semibold text-primary-foreground/60 whitespace-nowrap">
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.model} className={`border-b border-primary-foreground/[0.06] last:border-b-0 ${i % 2 === 1 ? 'bg-primary-foreground/[0.03]' : ''}`}>
                  {legacyAccHeaders.map(h => (
                    <td key={h.key} className={`px-4 py-3 whitespace-nowrap ${h.key === 'model' ? 'text-accent font-semibold' : 'text-primary-foreground/70'}`}>
                      {row[h.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    {list && list.length > 0 && (
      <ul className="space-y-1.5">
        {list.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm font-body text-primary-foreground/75">
            <span className="text-accent font-bold flex-shrink-0 mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    )}

    {tip && (
      <div className="flex items-start gap-3 px-4 py-3 bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl">
        <span className="text-accent font-bold text-xs flex-shrink-0 mt-0.5">✦</span>
        <p className="font-body text-xs text-primary-foreground/60 leading-relaxed">
          <span className="font-semibold text-primary-foreground/80">Como escolher? </span>
          {tip}{' '}
          <Link to="/contato" className="text-accent hover:underline">Fale com um especialista →</Link>
        </p>
      </div>
    )}

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-primary-foreground/10">
      {trustBadges.map(({ icon: Icon, title, sub }) => (
        <div key={title} className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-foreground/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-primary-foreground/50" />
          </div>
          <div>
            <p className="font-heading font-bold text-xs text-primary-foreground leading-tight">{title}</p>
            <p className="font-body text-[10px] text-primary-foreground/40 leading-tight">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

// ── FAQ accordion ─────────────────────────────────────────────────────────────

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl overflow-hidden border transition-colors ${open ? 'border-accent/30' : 'border-primary-foreground/10'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-primary-foreground/5 transition-colors"
      >
        <span className="font-heading font-semibold text-sm text-primary-foreground">{question}</span>
        {open
          ? <X className="w-4 h-4 text-accent flex-shrink-0" />
          : <Plus className="w-4 h-4 text-accent flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-primary-foreground/10">
          <p className="font-body text-sm text-primary-foreground/60 leading-relaxed pt-3">{answer}</p>
        </div>
      )}
    </div>
  );
};

// ── Video card ────────────────────────────────────────────────────────────────

const VideoCard = ({ title, duration, url }: { title: string; duration: string; url?: string }) => (
  <a
    href={url || '#'}
    target={url ? '_blank' : undefined}
    rel="noopener noreferrer"
    onClick={e => { if (!url) e.preventDefault(); }}
    className="group rounded-2xl overflow-hidden border border-primary-foreground/10 hover:border-accent/30 transition-all"
  >
    <div className="relative aspect-video bg-primary-foreground/[0.06] flex items-center justify-center">
      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        <svg className="w-5 h-5 text-accent-foreground ml-0.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
    <div className="px-4 py-3 bg-primary-foreground/5">
      <p className="font-heading font-semibold text-sm text-primary-foreground leading-snug line-clamp-2 mb-1">
        {title}
      </p>
      <div className="flex items-center gap-1.5 text-primary-foreground/40">
        <Clock className="w-3 h-3" />
        <span className="font-body text-xs">{duration}</span>
      </div>
    </div>
  </a>
);

// ── Tabs ──────────────────────────────────────────────────────────────────────

const TABS = ['Especificações Técnicas', 'Acessórios Compatíveis', 'Aplicações', 'FAQ', 'Vídeos'] as const;
type Tab = typeof TABS[number];

// ── Page ─────────────────────────────────────────────────────────────────────

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { openWhatsApp } = useWhatsAppMessage();
  const [activeTab, setActiveTab] = useState<Tab>('Especificações Técnicas');
  const [activeThumb, setActiveThumb] = useState(0);
  const [gallery, setGallery] = useState<string[]>([]);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [dbProduct, setDbProduct] = useState<typeof staticProducts[0] | null>(null);
  const [dbDetail, setDbDetail] = useState<typeof productDetailsMap[string] | null>(null);
  const [loadingDb, setLoadingDb] = useState(!!productId && !!isSupabaseConfigured);
  const [notFound, setNotFound] = useState(false);
  const { lines } = useProductLines();
  usePrerenderSignal(!loadingDb);

  // Always try Supabase first — DB product overrides any static version with same ID
  useEffect(() => {
    if (!productId || !isSupabaseConfigured) return;
    setLoadingDb(true);
    setNotFound(false);
    Promise.all([
      supabase.from('products').select('*').eq('id', productId).eq('active', true).single(),
      supabase.from('product_details').select('*').eq('product_id', productId).single(),
    ]).then(([{ data: p }, { data: d }]) => {
      if (p) {
        setDbProduct({
          id: p.id,
          name: p.name,
          category: p.category,
          image: p.image_url ?? '',
          description: p.description ?? '',
          specs: { Cabo: p.cable, Sonda: p.probe, Câmera: p.camera, Proteção: p.ip },
          seoTitle: p.seo_title ?? undefined,
          seoDescription: p.seo_description ?? undefined,
        });
        setGallery(p.gallery ?? []);
        setActiveThumb(-1);
        if (d) setDbDetail({
          features: (d.features ?? []).map((f: { icon_name: string; label: string; sublabel: string }) => ({
            icon: ICON_MAP[f.icon_name] ?? Wrench,
            label: f.label,
            sublabel: f.sublabel,
          })),
          specs: {
            left: (d.specs_left ?? []).map((c: { title: string; icon_name: string; rows: { label: string; value: string; highlight?: string }[] }) => ({
              title: c.title,
              icon: ICON_MAP[c.icon_name] ?? Wrench,
              rows: c.rows,
            })),
            right: (d.specs_right ?? []).map((c: { title: string; icon_name: string; rows: { label: string; value: string; highlight?: string }[] }) => ({
              title: c.title,
              icon: ICON_MAP[c.icon_name] ?? Wrench,
              rows: c.rows,
            })),
          },
          accessories: d.accessories ?? [],
          accessoriesTable: d.accessories_table ?? undefined,
          accessoriesList: d.accessories_list ?? [],
          applications: d.applications ?? [],
          faqs: d.faqs ?? [],
          videos: d.videos ?? [],
          manualUrl: d.manual_url ?? undefined,
          accessoriesTip: d.accessories_tip ?? undefined,
          specsDescription: d.specs_description ?? undefined,
        });
      } else {
        setNotFound(true);
      }
      setLoadingDb(false);
    }).catch(() => {
      setNotFound(true);
      setLoadingDb(false);
    });
  }, [productId]);

  const product = dbProduct ?? null;
  const detail = dbDetail ?? undefined;

  if (loadingDb) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan animate-spin" />
      </div>
    );
  }

  if (!product || notFound) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-6xl font-black text-cyan mb-4">404</p>
          <h1 className="font-heading text-2xl font-bold text-primary-foreground mb-6">Produto não encontrado</h1>
          <Button variant="cta" asChild><Link to="/">Voltar ao Início</Link></Button>
        </div>
      </div>
    );
  }

  // Canonical is the product's line route (/linha-t/:id etc.), not /produtos/:id.
  // /produtos/:id still works as an alias for active products (no redirect —
  // by design, so it doesn't need updating in .htaccess every time a product
  // is added/removed); it just isn't the URL search engines should index.
  const productLine = lines.find((l) => l.category === product.category);
  const linePath = productLine?.path;
  const productUrl = linePath
    ? `https://borotec.com.br${linePath}/${product.id}`
    : `https://borotec.com.br/produtos/${product.id}`;
  const absoluteImage = product.image?.startsWith('http')
    ? product.image
    : `https://borotec.com.br${product.image}`;
  const metaTitle = product.seoTitle || `${product.name} | BOROTEC Industrial`;
  const metaDescription = (product.seoDescription || `${product.description} Solicite orçamento.`).slice(0, 160);

  const handleWhatsApp = () => {
    openWhatsApp('produto', product.name);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'Botao_Whatsapp_produto' });
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: absoluteImage,
    sku: product.id,
    brand: { '@type': 'Brand', name: 'BOROTEC Industrial' },
    category: product.category,
    url: productUrl,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'BRL',
      priceValidUntil: '2027-12-31',
      seller: { '@type': 'Organization', name: 'BOROTEC Industrial', url: 'https://borotec.com.br' },
    },
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={productUrl} />
        {/* Open Graph */}
        <meta property="og:site_name" content="BOROTEC Industrial" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={absoluteImage} />
        <meta property="og:image:alt" content={product.name} />
        <meta property="og:locale" content="pt_BR" />
        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={absoluteImage} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-charcoal">
        <Header />

        <main className="pt-20">
          {/* Breadcrumb */}
          <div className="border-b border-primary-foreground/10">
            <div className="container-wide mx-auto px-4 md:px-8 py-3">
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/50">
                <Link to="/" className="hover:text-cyan transition-colors">Início</Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/boroscopios" className="hover:text-cyan transition-colors">Boroscópios</Link>
                {productLine && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <Link to={productLine.path} className="hover:text-cyan transition-colors">
                      {productLine.name}
                    </Link>
                  </>
                )}
                <ChevronRight className="w-4 h-4" />
                <span className="text-cyan truncate">{product.name}</span>
              </nav>
            </div>
          </div>

          {/* ── Hero ── */}
          <section className="py-10 md:py-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative container-wide mx-auto px-4 md:px-8">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-primary-foreground/50 hover:text-cyan transition-colors mb-8 text-sm font-body"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-10 xl:gap-16 items-start">

                {/* ── Left: image gallery ── */}
                {(() => {
                  const displayImage = activeThumb >= 0 ? gallery[activeThumb] : product.image;
                  return (
                    <div className="space-y-3">
                      {/* ── Zoom estilo Amazon ── */}
                      <div className="relative">
                        {/* Imagem principal + lupa */}
                        <div
                          ref={imgContainerRef}
                          className="relative aspect-[4/3] bg-primary-foreground/5 rounded-2xl overflow-hidden border border-primary-foreground/10 cursor-crosshair select-none"
                          onMouseMove={e => {
                            const rect = imgContainerRef.current!.getBoundingClientRect();
                            const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                            const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                            setZoomPos({ x, y });
                          }}
                          onMouseLeave={() => setZoomPos(null)}
                        >
                          <img
                            src={displayImage || product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                          {/* Retículo da lupa */}
                          {zoomPos && (
                            <div
                              className="absolute border-2 border-accent/80 bg-white/10 pointer-events-none"
                              style={{
                                width: '30%',
                                height: '30%',
                                left: `${Math.max(0, Math.min(70, zoomPos.x - 15))}%`,
                                top:  `${Math.max(0, Math.min(70, zoomPos.y - 15))}%`,
                              }}
                            />
                          )}
                          <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-charcoal/60 backdrop-blur-sm pointer-events-none">
                            <p className="font-body text-xs text-primary-foreground/50 text-center">{product.name}</p>
                          </div>
                        </div>

                        {/* Painel ampliado — aparece à direita */}
                        {zoomPos && (
                          <div
                            className="absolute top-0 left-[calc(100%+12px)] w-full aspect-[4/3] rounded-2xl border border-accent/40 overflow-hidden shadow-2xl z-50 bg-primary-foreground/5"
                            style={{
                              backgroundImage: `url(${displayImage || product.image})`,
                              backgroundSize: '300% 300%',
                              backgroundPosition: `${Math.max(0, Math.min(100, (zoomPos.x - 15) / 70 * 100))}% ${Math.max(0, Math.min(100, (zoomPos.y - 15) / 70 * 100))}%`,
                              backgroundRepeat: 'no-repeat',
                            }}
                          />
                        )}
                      </div>

                      {gallery.length > 0 && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveThumb(t => Math.max(-1, t - 1))}
                            disabled={activeThumb <= -1}
                            className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors disabled:opacity-30"
                          >
                            <ChevronLeft className="w-4 h-4 text-primary-foreground/60" />
                          </button>

                          <div className="flex gap-2 flex-1">
                            {gallery.map((src, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveThumb(activeThumb === i ? -1 : i)}
                                className={`flex-1 aspect-square max-h-28 min-w-0 rounded-xl border-2 overflow-hidden transition-all ${
                                  activeThumb === i
                                    ? 'border-accent ring-1 ring-accent/40'
                                    : 'border-primary-foreground/10 hover:border-primary-foreground/30'
                                }`}
                              >
                                <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => setActiveThumb(t => Math.min(gallery.length - 1, t + 1))}
                            disabled={activeThumb === gallery.length - 1}
                            className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors disabled:opacity-30"
                          >
                            <ChevronRight className="w-4 h-4 text-primary-foreground/60" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* ── Right: product info ── */}
                <div className="flex flex-col gap-5">
                  <span className="self-start px-3 py-1 border border-primary-foreground/20 text-primary-foreground/70 text-xs font-semibold font-body rounded-full">
                    {product.category}
                  </span>

                  <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground leading-tight">
                    {product.name}
                  </h1>

                  <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
                    {product.description}
                  </p>

                  {detail?.features && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-t border-b border-primary-foreground/10">
                      {detail.features.map(({ icon: Icon, label, sublabel }) => (
                        <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                          <Icon className="w-5 h-5 text-primary-foreground/40" />
                          <span className="font-heading font-bold text-xs text-primary-foreground leading-tight">{label}</span>
                          <span className="font-body text-[10px] text-primary-foreground/40 leading-tight">{sublabel}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Button
                      variant="cta"
                      size="xl"
                      className="w-full"
                      onClick={() => setQuoteModalOpen(true)}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Solicitar Orçamento por E-mail
                    </Button>
                    <Button
                      variant="whatsapp"
                      size="xl"
                      className="w-full whatsapp-btn whatsapp-produto"
                      onClick={handleWhatsApp}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Falar com o Especialista
                    </Button>
                  </div>

                  <button
                    onClick={() => setManualModalOpen(true)}
                    className="flex items-center gap-3 px-4 py-3.5 w-full bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl hover:border-accent/30 hover:bg-primary-foreground/10 transition-all group cursor-pointer text-left"
                  >
                    <div className="w-9 h-9 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-primary-foreground/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-semibold text-sm text-primary-foreground">Catálogo Técnico</p>
                      <p className="font-body text-xs text-primary-foreground/40">Download / Solicitar catálogo técnico</p>
                    </div>
                    <Download className="w-4 h-4 text-primary-foreground/30 group-hover:text-accent transition-colors flex-shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Tabs nav ── */}
          <div className="sticky top-20 z-30 bg-charcoal border-y border-primary-foreground/10">
            <div className="container-wide mx-auto px-4 md:px-8">
              <div className="flex overflow-x-auto">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 px-5 py-4 font-body text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-accent text-accent'
                        : 'border-transparent text-primary-foreground/50 hover:text-primary-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Tab content ── */}
          <section className="section-padding bg-charcoal [&]:pt-8">
            <div className="container-wide mx-auto">

              {/* Especificações Técnicas */}
              {activeTab === 'Especificações Técnicas' && detail && (
                <div className="space-y-6">
                  {detail.specsDescription && (
                    <p className="text-sm text-primary-foreground/60 leading-relaxed border-l-2 border-cyan pl-4">
                      {detail.specsDescription}
                    </p>
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SpecTable groups={detail.specs.left} />
                    <SpecTable groups={detail.specs.right} />
                  </div>
                </div>
              )}
              {activeTab === 'Especificações Técnicas' && !detail && (
                <div className="bg-primary-foreground/5 rounded-2xl border border-primary-foreground/10 overflow-hidden">
                  {product.specs && Object.keys(product.specs).length > 0
                    ? Object.entries(product.specs).map(([key, value], i) => (
                        <div key={key} className={`flex justify-between gap-4 px-6 py-3 ${i % 2 === 0 ? 'bg-primary-foreground/5' : ''}`}>
                          <span className="font-body text-sm text-primary-foreground/50">{key}</span>
                          <span className="font-body text-sm text-primary-foreground font-medium text-right">{value}</span>
                        </div>
                      ))
                    : <p className="px-6 py-8 text-center font-body text-primary-foreground/40">Especificações disponíveis mediante solicitação.</p>}
                </div>
              )}

              {/* Acessórios Compatíveis */}
              {activeTab === 'Acessórios Compatíveis' && (
                (detail?.accessoriesTable?.some(t => t.rows.length > 0) || detail?.accessories?.length || detail?.accessoriesList?.length)
                  ? <AccessoriesTable tables={detail.accessoriesTable} rows={detail.accessories ?? []} list={detail.accessoriesList} tip={detail.accessoriesTip ?? ''} />
                  : <p className="font-body text-primary-foreground/40 text-sm">Lista disponível mediante solicitação.</p>
              )}

              {/* Aplicações */}
              {activeTab === 'Aplicações' && (
                <div>
                  {detail?.applications?.length
                    ? <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {detail.applications.map((app, i) => (
                          <li key={i} className="flex items-start gap-3 p-4 bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="font-body text-sm text-primary-foreground">{app}</span>
                          </li>
                        ))}
                      </ul>
                    : <p className="font-body text-primary-foreground/40 text-sm">Consulte nossa equipe.</p>}
                </div>
              )}

              {/* FAQ */}
              {activeTab === 'FAQ' && (
                <div className="max-w-2xl space-y-3">
                  {detail?.faqs?.length
                    ? detail.faqs.map(faq => <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />)
                    : <p className="font-body text-primary-foreground/40 text-sm">Dúvidas? Entre em contato.</p>}
                </div>
              )}

              {/* Vídeos */}
              {activeTab === 'Vídeos' && (
                detail?.videos?.length
                  ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {detail.videos.map(v => <VideoCard key={v.title} {...v} />)}
                    </div>
                  : <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mb-4">
                        <Camera className="w-8 h-8 text-primary-foreground/30" />
                      </div>
                      <p className="font-heading font-bold text-lg text-primary-foreground/50 mb-1">Vídeos em breve</p>
                      <p className="font-body text-sm text-primary-foreground/30">Fale com nosso especialista para uma demonstração.</p>
                    </div>
              )}

            </div>
          </section>
        </main>

        <Footer />
      </div>

      {quoteModalOpen && (
        <QuoteModal productName={product.name} productId={product.id} onClose={() => setQuoteModalOpen(false)} />
      )}
      {manualModalOpen && (
        <ManualModal productName={product.name} manualUrl={detail?.manualUrl} onClose={() => setManualModalOpen(false)} />
      )}
    </>
  );
};

export default ProductDetail;
