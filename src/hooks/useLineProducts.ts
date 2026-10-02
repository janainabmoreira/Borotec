import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { extractSpecFilters, type SpecCategory, type SpecFilterValue } from '@/lib/specFilters';

export type SpecLabels = { probe?: string; cable?: string; camera?: string; ip?: string };

export type LineProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  cable: string;
  probe: string;
  camera: string;
  ip: string;
  specLabels?: SpecLabels;
  specFilters: SpecFilterValue[];
};

export function useLineProducts(category: string) {
  const [products, setProducts] = useState<LineProduct[]>([]);
  // Categoria cujo fetch já terminou. Comparar com a atual (em vez de um
  // boolean) evita reportar "carregado" no mesmo render em que a categoria
  // muda — o prerender tiraria o snapshot antes da lista nova chegar.
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  const loading = isSupabaseConfigured && loadedFor !== category;

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('active', true)
        .order('created_at', { ascending: true });

      if (error || !data) {
        if (!cancelled) { setProducts([]); setLoadedFor(category); }
        return;
      }

      // Specs ficam em product_details; só as marcadas como filtro interessam aqui.
      const filtersById: Record<string, SpecFilterValue[]> = {};
      if (data.length > 0) {
        const { data: details } = await supabase
          .from('product_details')
          .select('product_id, specs_left, specs_right')
          .in('product_id', data.map((p) => p.id));
        details?.forEach((d) => {
          filtersById[d.product_id] = extractSpecFilters(
            d.specs_left as SpecCategory[] | null,
            d.specs_right as SpecCategory[] | null,
          );
        });
      }

      if (cancelled) return;
      setProducts(data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? '',
        image: p.image_url ?? '',
        cable: p.cable ?? '',
        probe: p.probe ?? '',
        camera: p.camera ?? '',
        ip: p.ip ?? '',
        specLabels: (p.spec_labels as SpecLabels | null) ?? undefined,
        specFilters: filtersById[p.id] ?? [],
      })));
      setLoadedFor(category);
    })();

    return () => { cancelled = true; };
  }, [category]);

  return { products, loading };
}
