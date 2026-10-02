-- Remove a tabela "Qual modelo escolher" (e o subtítulo dela) do texto de
-- introdução dos produtos. Mantém o restante do texto, incluindo a tabela de
-- versões do BT-8300, se existir. Só altera textos que contêm a tabela.
begin;

update product_details
set specs_description = regexp_replace(specs_description, '\s*### Qual modelo escolher[\s\S]*$', '')
where specs_description like '%### Qual modelo escolher%';

commit;
