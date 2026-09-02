import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { DbProductLine } from '@/types/database';

// Header/Footer montam em toda página e chamariam este fetch repetidamente
// a cada navegação — um cache simples em módulo + dedupe do fetch em voo
// evita isso sem introduzir uma lib de data-fetching nova no projeto. Uma
// aba de admin editando dados em paralelo (ou um script externo mexendo no
// banco direto) não tem como avisar essa aba pra invalidar o cache — por
// isso um TTL curto: depois de 30s o cache é tratado como velho e a
// próxima navegação busca de novo sozinha, sem precisar de refresh manual.
const CACHE_TTL_MS = 30_000;
let cache: DbProductLine[] | null = null;
let cacheTime = 0;
let inFlight: Promise<DbProductLine[]> | null = null;

function isStale() {
  return !cache || Date.now() - cacheTime > CACHE_TTL_MS;
}

async function fetchLines(): Promise<DbProductLine[]> {
  if (cache && !isStale()) return cache;
  if (inFlight) return inFlight;
  if (!isSupabaseConfigured) return cache ?? [];

  inFlight = supabase
    .from('product_lines')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .then(({ data, error }) => {
      inFlight = null;
      if (error || !data) return cache ?? [];
      cache = data as DbProductLine[];
      cacheTime = Date.now();
      return cache;
    });

  return inFlight;
}

export function useProductLines() {
  const [lines, setLines] = useState<DbProductLine[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache && isSupabaseConfigured);

  useEffect(() => {
    if (cache && !isStale()) { setLines(cache); setLoading(false); return; }
    // Stale-while-revalidate: mostra o cache velho (se existir) na hora e
    // busca de novo por trás, em vez de piscar um loading toda navegação.
    if (cache) setLines(cache);
    let cancelled = false;
    fetchLines().then((data) => {
      if (!cancelled) { setLines(data); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, []);

  return { lines, loading };
}

export type ProductSection = { slug: string; name: string; lines: DbProductLine[] };

// Não existe uma tabela separada de "seções de menu" — o menu principal e as
// páginas de índice (/boroscopios, /termografia...) são derivados dos
// valores distintos de section_slug/section_name já presentes nas linhas.
// Criar uma linha numa seção nova já "cria" a seção.
export function groupLinesBySection(lines: DbProductLine[]): ProductSection[] {
  const bySlug = new Map<string, ProductSection>();
  for (const line of lines) {
    if (!bySlug.has(line.section_slug)) {
      bySlug.set(line.section_slug, { slug: line.section_slug, name: line.section_name, lines: [] });
    }
    bySlug.get(line.section_slug)!.lines.push(line);
  }
  return Array.from(bySlug.values());
}

export function getLineByCategory(lines: DbProductLine[], category: string) {
  return lines.find((l) => l.category === category);
}

export function getLineBySlug(lines: DbProductLine[], slug: string) {
  return lines.find((l) => l.id === slug);
}

// Acesso síncrono ao cache, para código fora de componentes React (rastreio
// de cliques/pageview em useWhatsAppMessage.ts e usePageView.ts). Header e
// Footer montam em toda página e já disparam fetchLines() antes de qualquer
// clique acontecer, então o cache normalmente já está populado — quando não
// está (primeiríssimo carregamento), esses trackers caem no fallback
// genérico em vez de perder o dado.
export function getCachedLines(): DbProductLine[] {
  return cache ?? [];
}

// Chamado depois de criar/editar uma linha no admin, pra próxima navegação
// (mesma aba) buscar os dados frescos em vez de reusar o cache antigo.
export function invalidateLinesCache() {
  cache = null;
  cacheTime = 0;
}
