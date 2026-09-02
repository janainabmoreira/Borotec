import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { DbProductLine } from '@/types/database';

// Header/Footer montam em toda página e chamariam este fetch repetidamente
// a cada navegação — um cache simples em módulo + dedupe do fetch em voo
// evita isso sem introduzir uma lib de data-fetching nova no projeto.
let cache: DbProductLine[] | null = null;
let inFlight: Promise<DbProductLine[]> | null = null;

async function fetchLines(): Promise<DbProductLine[]> {
  if (cache) return cache;
  if (inFlight) return inFlight;
  if (!isSupabaseConfigured) return [];

  inFlight = supabase
    .from('product_lines')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .then(({ data, error }) => {
      inFlight = null;
      if (error || !data) return [];
      cache = data as DbProductLine[];
      return cache;
    });

  return inFlight;
}

export function useProductLines() {
  const [lines, setLines] = useState<DbProductLine[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache && isSupabaseConfigured);

  useEffect(() => {
    if (cache) { setLines(cache); setLoading(false); return; }
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
}
