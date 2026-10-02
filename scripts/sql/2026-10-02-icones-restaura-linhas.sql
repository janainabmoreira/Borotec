-- Restaura os ícones das linhas que ficaram todas com 'Eye' (02/10/2026 06:40–06:42),
-- já com as trocas pedidas: Linha T -> Waypoints, Linha M -> Cog, Linha D -> Zap.
-- Linhas X, SC-A e SC-B não mudam (Factory, Aperture, Crosshair).
begin;
update product_lines set icon_name = 'Waypoints',   updated_at = now() where badge = 'Linha T';
update product_lines set icon_name = 'Bot',         updated_at = now() where badge = 'Linha R';
update product_lines set icon_name = 'Cog',         updated_at = now() where badge = 'Linha M';
update product_lines set icon_name = 'Sparkles',    updated_at = now() where badge = 'Linha E';
update product_lines set icon_name = 'Drill',       updated_at = now() where badge = 'Linha P';
update product_lines set icon_name = 'Telescope',   updated_at = now() where badge = 'Linha TC';
update product_lines set icon_name = 'Stethoscope', updated_at = now() where badge = 'Linha H';
update product_lines set icon_name = 'Zap',         updated_at = now() where badge = 'Linha D';
commit;
