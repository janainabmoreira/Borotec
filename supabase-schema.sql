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
