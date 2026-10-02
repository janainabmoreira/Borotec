-- Ícones das linhas de Boroscópios no menu "O que você precisa inspecionar?"
-- Linha T: Pipette (conta-gotas) -> Waypoints (percurso em dutos)
-- Linha M: Cpu (chip) -> Cog (engrenagem)
begin;
update product_lines set icon_name = 'Waypoints', updated_at = now() where badge = 'Linha T' and icon_name = 'Pipette';
update product_lines set icon_name = 'Cog',       updated_at = now() where badge = 'Linha M' and icon_name = 'Cpu';
commit;
