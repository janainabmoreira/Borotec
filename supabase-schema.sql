-- =====================================================
-- BOROTEC — Schema Supabase
-- Cole este SQL no SQL Editor do seu projeto Supabase
-- =====================================================

-- Tabela de eventos do formulário de contato
CREATE TABLE IF NOT EXISTS form_events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type  TEXT NOT NULL, -- 'start' | 'submit_attempt' | 'submit_success' | 'submit_error'
  session_id  TEXT,
  utm_source  TEXT,
  utm_medium  TEXT,
  utm_campaign TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE form_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_insert_form_events" ON form_events FOR INSERT TO anon WITH CHECK (true);

-- Tabela principal de produtos
CREATE TABLE IF NOT EXISTS products (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  category    TEXT NOT NULL DEFAULT 'Linha T - Tubulações',
  image_url   TEXT,
  gallery     JSONB NOT NULL DEFAULT '[]',
  cable       TEXT NOT NULL DEFAULT '',
  probe       TEXT NOT NULL DEFAULT '',
  camera      TEXT NOT NULL DEFAULT '',
  ip          TEXT NOT NULL DEFAULT '',
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de detalhes do produto (specs, FAQs, vídeos, etc.)
CREATE TABLE IF NOT EXISTS product_details (
  product_id      TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  manual_url      TEXT,
  accessories_tip TEXT,
  features        JSONB NOT NULL DEFAULT '[]',
  specs_left      JSONB NOT NULL DEFAULT '[]',
  specs_right     JSONB NOT NULL DEFAULT '[]',
  accessories     JSONB NOT NULL DEFAULT '[]',
  applications    TEXT[] NOT NULL DEFAULT '{}',
  faqs            JSONB NOT NULL DEFAULT '[]',
  videos          JSONB NOT NULL DEFAULT '[]'
);

-- Atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================

ALTER TABLE products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode LER produtos ativos
CREATE POLICY "public_read_products"
  ON products FOR SELECT
  USING (active = true);

CREATE POLICY "public_read_product_details"
  ON product_details FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM products p WHERE p.id = product_id AND p.active = true)
  );

-- Usuários autenticados (admin) podem gerenciar tudo
CREATE POLICY "admin_all_products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "admin_all_product_details"
  ON product_details FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- Dados iniciais — Linha T
-- =====================================================

INSERT INTO products (id, name, description, category, image_url, cable, probe, camera, ip) VALUES
(
  'sk3208',
  'SK3208 Endoscópio para Tubulações',
  'Endoscópio profissional para inspeção de tubulações industriais. Sistema completo com câmera HD e cabo reforçado de fibra.',
  'Linha T - Tubulações',
  NULL,
  '30m', 'Ø8mm', '720p', 'IP68'
),
(
  'sk3610',
  'SK3610 Endoscópio Profissional',
  'Endoscópio versátil para tubulações industriais de médio e grande porte. Alta resolução Full HD com tela LCD integrada.',
  'Linha T - Tubulações',
  NULL,
  '60m', 'Ø8mm', '1080p', 'IP68'
),
(
  'sk3828',
  'SK3828 Endoscópio Industrial 100m',
  'Endoscópio de alta performance para inspeções em tubulações de longa extensão. Sonda robusta e câmera de alta definição.',
  'Linha T - Tubulações',
  NULL,
  '100m', 'Ø10mm', '1080p', 'IP68'
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Tabela de artigos do blog
-- =====================================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  excerpt    TEXT NOT NULL DEFAULT '',
  category   TEXT NOT NULL DEFAULT 'Guia Técnico',
  author     TEXT NOT NULL DEFAULT '',
  date       DATE NOT NULL DEFAULT NOW()::DATE,
  read_time  TEXT NOT NULL DEFAULT '',
  image      TEXT,
  content    TEXT NOT NULL DEFAULT '',
  faqs       JSONB NOT NULL DEFAULT '[]',
  active     BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_blog_posts"
  ON blog_posts FOR SELECT
  USING (active = true);

CREATE POLICY "admin_all_blog_posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- Tabela de comentários do blog
-- =====================================================

CREATE TABLE IF NOT EXISTS blog_comments (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id     TEXT NOT NULL,
  post_title  TEXT,
  author_name TEXT NOT NULL,
  message     TEXT NOT NULL,
  reply       TEXT,
  published   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  replied_at  TIMESTAMPTZ
);

ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Visitantes podem inserir e ler comentários publicados
CREATE POLICY "allow_insert_blog_comments"
  ON blog_comments FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "allow_read_published_comments"
  ON blog_comments FOR SELECT TO anon
  USING (published = true);

-- Admin pode gerenciar tudo
CREATE POLICY "admin_all_blog_comments"
  ON blog_comments FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- =====================================================
-- Para criar o usuário admin, acesse no Supabase:
-- Authentication > Users > Add User
-- E-mail: admin@borotec.com.br  |  Senha: (sua senha segura)
-- =====================================================

-- =====================================================
-- Tabela de linhas de produto (Boroscópios: Tubulações, Robôs, etc.)
-- Cada linha vira um card na Home, um card em /boroscopios, um item no
-- menu "Aplicações", um link no rodapé e uma página própria com filtros.
-- Antes disso, cada um desses lugares tinha seu próprio array fixo no
-- código — agora tudo lê daqui, e uma linha nova pode ser criada pelo
-- admin sem precisar de alteração de código.
-- =====================================================

-- Strings usam "dollar-quoting" ($q$...$q$) em vez de aspas simples de
-- propósito: colar SQL com aspas simples num editor via navegador às vezes
-- sofre substituição por aspas tipográficas curvas (' -> '), o que quebra o
-- parser. Dollar-quoting não usa aspas, então não tem esse risco.
DROP TABLE IF EXISTS product_lines CASCADE;

CREATE TABLE IF NOT EXISTS product_lines (
  id                TEXT PRIMARY KEY,              -- slug sem barra: 'linha-h', 'termografia'
  badge             TEXT NOT NULL,                  -- "Linha H" — texto curto do selo
  name              TEXT NOT NULL,                  -- "Hospitalar" — título do card / H1
  category          TEXT NOT NULL UNIQUE,           -- string exata usada em products.category
  path              TEXT NOT NULL UNIQUE,            -- '/linha-h'
  section_slug      TEXT NOT NULL DEFAULT $q$boroscopios$q$,  -- item de menu principal: '/boroscopios', '/termografia'...
  section_name      TEXT NOT NULL DEFAULT $q$Boroscópios$q$,  -- nome do item de menu
  icon_name         TEXT NOT NULL DEFAULT $q$Wrench$q$,  -- nome de ícone (ver src/lib/iconMap.ts)
  accent            TEXT NOT NULL DEFAULT $q$cyan$q$,    -- cor: cyan|accent|purple|yellow|teal|orange|emerald|blue|rose
  image_url         TEXT,                            -- opcional; sem foto = ícone grande no card
  card_description  TEXT NOT NULL,                   -- card na Home + em /boroscopios (mesma copy)
  menu_description  TEXT,                            -- texto curto do dropdown "Aplicações"; se vazio usa card_description
  hero_description  TEXT NOT NULL,                   -- parágrafo abaixo do título na página da linha
  seo_title         TEXT,
  seo_description   TEXT,
  filter_labels JSONB NOT NULL DEFAULT $q${"probe":"Sonda","cable":"Cabo","camera":"Câmera","ip":"Proteção"}$q$,
  card_labels   JSONB NOT NULL DEFAULT $q${"probe":"Sonda","cable":"Cabo","camera":"Câmera","ip":"Proteção"}$q$,
  sort_order  INT NOT NULL DEFAULT 0,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER product_lines_updated_at
  BEFORE UPDATE ON product_lines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE product_lines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_product_lines"
  ON product_lines FOR SELECT
  USING (active = true);

CREATE POLICY "admin_all_product_lines"
  ON product_lines FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Migração das 7 linhas que hoje são hardcoded no código para a tabela.
-- Copy extraída literalmente de cada src/pages/Line*.tsx (card_description
-- vem de Categories.tsx, que é a versão mais curta/canônica — a Home e a
-- página da própria linha tinham cada uma sua própria variação de texto;
-- ficam unificadas aqui na mesma linha do espírito do que já foi feito
-- para a Linha H).
INSERT INTO product_lines
  (id, badge, name, category, path, icon_name, accent, card_description, menu_description, hero_description, seo_title, seo_description, filter_labels, card_labels, sort_order)
VALUES
(
  $q$linha-t$q$, $q$Linha T$q$, $q$Tubulações e Dutos$q$, $q$Linha T - Tubulações$q$, $q$/linha-t$q$, $q$Pipette$q$, $q$cyan$q$,
  $q$Boroscópios e endoscópios especializados para inspeção de tubulações industriais de diversos diâmetros.$q$,
  $q$Boroscópios e endoscópios para tubulações industriais de todos os diâmetros$q$,
  $q$Boroscópios e endoscópios especializados para inspeção de tubulações industriais de todos os diâmetros. Sondas flexíveis com câmeras HD e Full HD, IP68.$q$,
  $q$Boroscópios para Tubulações e Dutos | Linha T | BOROTEC Industrial$q$,
  $q$Endoscópios e boroscópios para inspeção de tubulações industriais. Sondas Ø6mm a Ø10mm, cabo até 150m, câmera HD/Full HD, IP68. Todo o Brasil.$q$,
  $q${"probe":"Diâm. da sonda","cable":"Cabo máx.","camera":"Resolução","ip":"Proteção IP"}$q$,
  $q${"probe":"Sonda","cable":"Cabo máx.","camera":"Câmera","ip":"Proteção"}$q$,
  1
),
(
  $q$linha-r$q$, $q$Linha R$q$, $q$Acesso Autônomo em Dutos$q$, $q$Linha R - Acesso Autônomo$q$, $q$/linha-r$q$, $q$Bot$q$, $q$accent$q$,
  $q$Robôs de inspeção autônomos para tubulações de grande porte e ambientes de difícil acesso.$q$,
  $q$Robôs de inspeção para tubulações de grande porte e difícil acesso$q$,
  $q$Sistemas robóticos para acesso e inspeção em dutos, espaços confinados e ambientes de difícil acesso. Câmeras articuladas com controle total na palma da mão.$q$,
  $q$Robôs de Inspeção Autônoma | Linha R | BOROTEC Industrial$q$,
  $q$Robôs de inspeção industrial para acesso autônomo em dutos e espaços confinados. Câmeras de 3,9mm a 8mm, articulação 4 vias, IP68, até 20m de cabo.$q$,
  $q${"probe":"Diâmetro da câmera","cable":"Comprimento do cabo","camera":"Qualidade da imagem","ip":"Resistência"}$q$,
  $q${"probe":"Câmera","cable":"Cabo","camera":"Imagem","ip":"Proteção"}$q$,
  2
),
(
  $q$linha-m$q$, $q$Linha M$q$, $q$Máquinas e Motores$q$, $q$Linha M - Máquinas e Motores$q$, $q$/linha-m$q$, $q$Cpu$q$, $q$purple$q$,
  $q$Endoscópios industriais para inspeção de máquinas, motores e equipamentos mecânicos.$q$,
  $q$Endoscópios industriais para motores, compressores e equipamentos mecânicos$q$,
  $q$Videoscópios e boroscópios industriais para inspeção interna de motores, turbinas, compressores e equipamentos de alta precisão. Sondas ultra-slim com câmeras HD e Full HD.$q$,
  $q$Boroscópios para Máquinas e Motores | Linha M | BOROTEC Industrial$q$,
  $q$Videoscópios e boroscópios industriais para inspeção de máquinas, motores, turbinas e compressores. Sondas de Ø4mm a Ø8mm, câmera até 1080p, IP67.$q$,
  $q${"probe":"Diâmetro da sonda","cable":"Comprimento","camera":"Resolução","ip":"Proteção IP"}$q$,
  $q${"probe":"Sonda","cable":"Cabo","camera":"Câmera","ip":"Proteção"}$q$,
  3
),
(
  $q$linha-e$q$, $q$Linha E$q$, $q$Aplicações Especiais$q$, $q$Linha E - Aplicações Especiais$q$, $q$/linha-e$q$, $q$Sparkles$q$, $q$yellow$q$,
  $q$Equipamentos com funções especiais: medição 3D, termografia, UV, área classificada e alta temperatura.$q$,
  $q$Medição 3D, termografia, UV, área classificada e alta temperatura$q$,
  $q$Videoscópios com tecnologias exclusivas para aplicações críticas e especializadas. Câmera 3D estéreo com medição dimensional sem contato para inspeções de alta precisão.$q$,
  $q$Videoscópios para Aplicações Especiais | Linha E | BOROTEC Industrial$q$,
  $q$Videoscópios de aplicação especial com tecnologia 3D estéreo para medição dimensional sem contato. Soluções avançadas para inspeções críticas industriais.$q$,
  $q${"probe":"Diâmetro da sonda","cable":"Cabo","camera":"Resolução","ip":"Proteção IP"}$q$,
  $q${"probe":"Sonda","cable":"Cabo","camera":"Câmera","ip":"Proteção"}$q$,
  4
),
(
  $q$linha-p$q$, $q$Linha P$q$, $q$Poços e Subaquático$q$, $q$Linha P - Poços e Subaquático$q$, $q$/linha-p$q$, $q$Drill$q$, $q$teal$q$,
  $q$Sistemas de inspeção para poços artesianos, poços de petróleo e aplicações subaquáticas.$q$,
  $q$Inspeção em poços artesianos, poços de petróleo e aplicações subaquáticas$q$,
  $q$Câmeras submersíveis de alto desempenho para inspeção de poços artesianos, reservatórios e ambientes subaquáticos. Certificação IP68 com cabos de até 100 metros.$q$,
  $q$Câmeras para Poços e Subaquático | Linha P | BOROTEC Industrial$q$,
  $q$Câmeras submersíveis para inspeção de poços artesianos, reservatórios e ambientes subaquáticos. IP68, cabo de até 100m, câmera Full HD com LEDs potentes.$q$,
  $q${"probe":"Câmera","cable":"Comprimento","camera":"Resolução","ip":"Proteção IP"}$q$,
  $q${"probe":"Câmera","cable":"Cabo","camera":"Resolução","ip":"Proteção"}$q$,
  5
),
(
  $q$linha-tc$q$, $q$Linha TC$q$, $q$Altura e Difícil Acesso$q$, $q$Linha TC - Altura e Difícil Acesso$q$, $q$/linha-tc$q$, $q$Telescope$q$, $q$orange$q$,
  $q$Câmeras telescópicas para inspeção em altura e locais de difícil alcance.$q$,
  $q$Câmeras telescópicas para inspeção em altura e locais de difícil alcance$q$,
  $q$Câmeras telescópicas com haste extensível para inspeção em altura, telhados, vigas e estruturas elevadas sem necessidade de andaimes ou trabalho em altura.$q$,
  $q$Câmeras Telescópicas para Altura e Difícil Acesso | Linha TC | BOROTEC Industrial$q$,
  $q$Câmeras telescópicas com haste extensível de até 5m para inspeção em altura, telhados e estruturas elevadas. Pan-tilt 360°, câmera Full HD, IP65.$q$,
  $q${"probe":"Câmera","cable":"Comprimento da haste","camera":"Resolução","ip":"Proteção IP"}$q$,
  $q${"probe":"Câmera","cable":"Haste","camera":"Resolução","ip":"Proteção"}$q$,
  6
),
(
  $q$linha-h$q$, $q$Linha H$q$, $q$Hospitalar$q$, $q$Linha H - Hospitalar$q$, $q$/linha-h$q$, $q$Stethoscope$q$, $q$emerald$q$,
  $q$Videolaringoscópios, boroscópios e câmeras flexíveis para procedimentos clínicos, intubação de vias aéreas, inspeção de equipamentos hospitalares e manutenção médica.$q$,
  $q$Videolaringoscópios, boroscópios e câmeras flexíveis para intubação de vias aéreas, procedimentos clínicos e inspeção de equipamentos hospitalares.$q$,
  $q$Videolaringoscópios, boroscópios e câmeras flexíveis para procedimentos clínicos, intubação de vias aéreas, inspeção de equipamentos hospitalares e manutenção médica.$q$,
  $q$Boroscópios Hospitalar | Linha H | BOROTEC Industrial$q$,
  $q$Boroscópios para inspeção em equipamentos hospitalares, autoclaves, tubulações de gases medicinais e manutenção de equipamentos médicos e veterinários.$q$,
  $q${"probe":"Diâm. da sonda","cable":"Cabo máx.","camera":"Resolução","ip":"Proteção IP"}$q$,
  $q${"probe":"Sonda","cable":"Cabo","camera":"Câmera","ip":"Proteção"}$q$,
  7
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Seções de menu (Boroscópios, Termografia, ...)
-- Cada linha agora pertence a uma "seção" — o item de menu principal sob o
-- qual ela aparece. Todas as linhas existentes já nascem em "Boroscópios"
-- (os valores DEFAULT cobrem as 7 linhas migradas acima automaticamente,
-- sem precisar de um UPDATE). Criar uma linha nova com uma seção que ainda
-- não existe (ex: "Termografia") já cria a seção — não tem uma tabela
-- separada pra isso, o menu principal e a página /<secao> são montados a
-- partir dos valores distintos de section_slug presentes aqui.
-- =====================================================
ALTER TABLE product_lines ADD COLUMN IF NOT EXISTS section_slug TEXT NOT NULL DEFAULT $q$boroscopios$q$;
ALTER TABLE product_lines ADD COLUMN IF NOT EXISTS section_name TEXT NOT NULL DEFAULT $q$Boroscópios$q$;
