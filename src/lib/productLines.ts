// Resolve a URL canônica de um produto a partir da lista de linhas
// carregada via useProductLines() — product cards, resultados de busca e
// o canonical do ProductDetail devem todos resolver para a mesma URL.
// Linhas agora vêm do banco (tabela product_lines), não de um mapa fixo
// no código — por isso recebe `lines` como parâmetro em vez de importar
// um Record estático.
import type { DbProductLine } from '@/types/database';

export function getProductPath(lines: DbProductLine[], category: string, id: string): string {
  const line = lines.find((l) => l.category === category);
  return line ? `${line.path}/${id}` : `/produtos/${id}`;
}
