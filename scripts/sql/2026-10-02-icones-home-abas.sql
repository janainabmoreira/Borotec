-- Ícones conforme instrucao-abas-home-categorias.md (os demais já estão certos):
-- Linha T: Waypoints -> Cylinder (tubulação) | Linha P: Drill -> Droplets (água)
begin;
update product_lines set icon_name = 'Cylinder', updated_at = now() where badge = 'Linha T';
update product_lines set icon_name = 'Droplets', updated_at = now() where badge = 'Linha P';
commit;
