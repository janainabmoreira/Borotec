import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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
};

export function useLineProducts(category: string) {
  const [products, setProducts] = useState<LineProduct[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('active', true)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
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
          })));
        }
        setLoading(false);
      });
  }, [category]);

  return { products, loading };
}
