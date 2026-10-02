-- Ícones das linhas de Termografia no menu "O que você precisa inspecionar?"
-- (Linha D continua com Zap).
begin;
update product_lines set icon_name = 'Factory',   updated_at = now() where id = 'linha-x-inspecao-industrial';
update product_lines set icon_name = 'Aperture',  updated_at = now() where id = 'inspecao-avancada';
update product_lines set icon_name = 'Crosshair', updated_at = now() where id = 'inspecao-de-precisao';
commit;
