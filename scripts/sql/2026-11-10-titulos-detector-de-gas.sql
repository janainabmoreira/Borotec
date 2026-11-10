-- Títulos SEO das linhas Multigás e Monogás (aprovados em 10/11/2026).
-- Antes: 62 e 65 caracteres; depois: 51 e 54 (limite ~60).
-- Rodar no SQL Editor do Supabase. Depois, republicar o site (o title fica
-- gravado no HTML pré-renderizado).

update product_lines
set seo_title = 'Detector Multigás Portátil de 4 a 8 Gases | Borotec',
    updated_at = now()
where path = '/detector-de-gas/linha-multigas/detector-multigas-portatil';

update product_lines
set seo_title = 'Detector Monogás Portátil: H2S, CO, O2 e LEL | Borotec',
    updated_at = now()
where path = '/detector-de-gas/linha-monogas/detector-monogas-portatil';

-- Conferência: devem voltar 2 linhas com os títulos novos.
select path, seo_title, length(seo_title) as caracteres
from product_lines
where section_slug = 'detector-de-gas'
order by path;
