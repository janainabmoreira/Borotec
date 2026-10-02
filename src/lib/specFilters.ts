// Filtros da página de linha montados a partir das especificações do produto:
// cada linha de spec marcada com `filter: true` vira um grupo de filtro cujo
// nome é o próprio label da spec — assim o rótulo nunca descasa do valor,
// como acontecia com os 4 campos fixos (sonda/cabo/câmera/proteção) numa
// linha de termografia.

// filter_value: versão curta do valor só para o filtro ("<40mK" em vez de
// "<40mK (@30°C)"), senão cada produto vira uma opção diferente.
export type SpecRow = { label: string; value: string; highlight?: string; filter?: boolean; filter_value?: string };
export type SpecCategory = { title: string; icon_name: string; rows: SpecRow[] };
export type SpecFilterValue = { label: string; value: string };

// Mais que isso deixa a coluna lateral comprida demais.
export const MAX_SPEC_FILTERS = 5;

// "Resolução IR" e "resolucao ir " precisam cair no mesmo grupo.
export const specFilterKey = (label: string) =>
  label.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase().replace(/\s+/g, ' ');

export function extractSpecFilters(left: SpecCategory[] | null, right: SpecCategory[] | null): SpecFilterValue[] {
  return [...(left ?? []), ...(right ?? [])]
    .flatMap(c => c.rows ?? [])
    .map(r => ({ label: r.label?.trim() ?? '', value: (r.filter_value?.trim() || r.value?.trim()) ?? '', filter: r.filter }))
    .filter(r => r.filter && r.label && r.value)
    .map(({ label, value }) => ({ label, value }));
}

// Ordena "2 m, 5 m, 10 m" pelo número em vez de alfabeticamente.
const collator = new Intl.Collator('pt-BR', { numeric: true, sensitivity: 'base' });
export const naturalSort = (values: string[]) => [...values].sort(collator.compare);
