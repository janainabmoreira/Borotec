# Borotec Industrial — Próximas Ações de SEO

**Data da análise:** 08/05/2026 (revisada após leitura completa do código)  
**Site:** https://borotec.com.br  
**Stack:** React + Vite + react-helmet-async + pré-renderização estática

---

## O que já está implementado corretamente

| Item | Detalhe |
|------|---------|
| Meta tags por página | `title`, `description`, `canonical` em todas as rotas via `react-helmet-async` |
| Open Graph + Twitter Cards | Presentes em todas as páginas com imagem, dimensões e locale `pt_BR` |
| Schema.org estruturado | `LocalBusiness`, `Product`, `Article`, `BreadcrumbList`, `FAQPage` |
| `sitemap.xml` | Completo — 6 páginas estáticas + 7 posts + 20+ produtos |
| `robots.txt` | Configurado com referência ao sitemap |
| HTTPS forçado | Redirect 301 via `.htaccess` |
| Google Tag Manager | GTM-MXZJ8GV9 instalado + eventos `Botao_Whatsapp_produto`, `Formulario_contato`, `whatsapp_hero_click` |
| Pré-renderização estática | Todas as rotas têm `index.html` próprio em `/dist/` |
| Blog técnico | 7 artigos com FAQ estruturado e links internos para produtos |
| `lang="pt-BR"` | Declarado no `<html>` do documento raiz |
| `loading="lazy"` | Aplicado em imagens de blog e produtos |
| `preload="none"` no vídeo | Hero video já configurado para não bloquear carregamento |
| Imagens reais por produto | Cada produto tem `.webp` próprio em `src/assets/` |
| Formulário de contato | Integrado ao Web3Forms com envio real por e-mail |
| Google Maps | Embed na página de contato com endereço físico |
| Política de Privacidade | Página com `noindex` configurado + conteúdo LGPD completo |

---

## Próximas Ações

### Prioridade Alta — Erros ativos que prejudicam o site agora

---

#### 1. Imagens do blog ausentes (erro crítico)

**Problema:** A pasta `/public/blog/` está vazia. Todos os 7 artigos referenciam imagens `.webp` que não existem, causando imagens quebradas em todas as páginas do blog e og:image inválido ao compartilhar.

**Arquivos faltando:**
- `/public/blog/boroscopio-industrial-inspecao.webp`
- `/public/blog/inspecao-tubulacoes-industriais.webp`
- `/public/blog/como-escolher-boroscopio-industrial.webp`
- `/public/blog/medicao-3d-videoscopio-industrial.webp`
- `/public/blog/robo-inspecao-tubulacoes.webp`
- `/public/blog/boroscopio-atex-iecex-area-classificada.webp`
- `/public/blog/termografia-industrial-manutencao-preditiva.webp`

**Ação:** Criar imagens `1200×630px` em `.webp` para cada artigo e subir em `/public/blog/`.

---

#### 2. og:image dos posts usa URL relativa, não absoluta

**Problema:** A página de cada post do blog passa `post.image` diretamente para a meta og:image — esse valor é `/blog/nome-da-imagem.webp` (relativo). Plataformas como LinkedIn, WhatsApp e Facebook exigem URL absoluta (`https://borotec.com.br/blog/...`) para exibir o preview corretamente.

**Arquivo:** `src/pages/BlogPost.tsx:88`

**Ação:** Prefixar a imagem do post com o domínio base:
```tsx
<meta property="og:image" content={`https://borotec.com.br${post.image}`} />
```

---

#### 3. Inconsistência de NAP — telefone e e-mail divergem entre páginas

**Problema:** NAP (Name, Address, Phone) inconsistente é um dos principais fatores que prejudicam SEO local. O site tem dois telefones e dois e-mails diferentes em lugares distintos:

| Local | Telefone | E-mail |
|-------|----------|--------|
| Schema LocalBusiness (`Index.tsx`) | `+55-11-93287-6195` | `contato@borotec.com.br` |
| Página de Contato | `(11) 4002-8922` | `contato@borotec.com.br` |
| Footer | `(11) 93287-6195` | `vendas@borotec.com.br` |

**Ação:** Definir um único telefone e um único e-mail principal e padronizar em todos os locais: schema, página de contato, footer e Privacy Policy.

---

#### 4. Links de redes sociais no footer são placeholders (`href="#"`)

**Problema:** Os ícones de LinkedIn, Instagram e YouTube no footer apontam para `href="#"`. Isso faz o Google não conseguir rastrear os perfis sociais da empresa e invalida os `sameAs` declarados no schema `LocalBusiness`.

**Arquivo:** `src/components/Footer.tsx:35-44`

**Ação:** Substituir `href="#"` pelas URLs reais dos perfis sociais da BOROTEC e garantir que coincidam com os valores em `sameAs` no schema.

---

#### 5. og:image global inconsistente entre `index.html` e as páginas React

**Problema:** O `index.html` raiz referencia `/og-image.png`, mas todas as páginas controladas pelo React Helmet usam `/og-borotec.jpg`. São dois arquivos diferentes — se `/og-image.png` não existir no servidor, o preview no Google aparece sem imagem ao primeiro acesso (antes do React ser executado).

**Ação:** Padronizar para `/og-borotec.jpg` em `index.html` linha 30.

---

### Prioridade Média — Problemas de estrutura e conteúdo

---

#### 6. Categorias "Linha P - Poços" e "Linha TC - Telescópicos" não têm produtos

**Problema:** O menu de navegação e a página `/categorias` exibem 6 linhas de produto. As duas últimas — Linha P (Poços) e Linha TC (Telescópicos) — têm **zero produtos** em `products.ts`. Ao clicar, o usuário vê uma página vazia com "0 produtos encontrados".

**Impacto SEO:** Páginas de categoria vazias são consideradas thin content e podem ser penalizadas. Além disso, o sitemap lista essas categorias como se tivessem conteúdo.

**Ação:** Ou adicionar os produtos dessas linhas ao catálogo, ou remover essas categorias do menu e da página de categorias até que tenham produtos reais.

---

#### 7. Especificações técnicas dos produtos são incompletas (thin content)

**Problema:** As páginas de produto são a principal entrada de tráfego orgânico em SEO B2B industrial. A maioria dos produtos tem specs extremamente genéricas — apenas Modelo, Aplicação e Linha — sem dados técnicos reais como diâmetro da sonda, comprimento do cabo, resolução da câmera, IP rating, temperatura de operação, etc.

**Exemplos do problema em `products.ts`:**
- SK3208: specs com 3 campos genéricos
- SK3808: "Sistema avançado de inspeção para tubulações de grande porte" (sem dados mensuráveis)

**Impacto:** Páginas de produto com conteúdo raso competem mal com fabricantes concorrentes que detalham especificações técnicas completas.

**Ação:** Preencher os specs de cada produto com dados reais do fabricante: diâmetro, comprimento, resolução, campo de visão, IP, temperatura, etc.

---

#### 8. Alt text das imagens de categoria é muito genérico

**Problema:** A página `/categorias` usa `alt={category.name}` nas imagens, resultando em alt texts como `"Linha T"`, `"Linha R"` — sem contexto para o Google Imagens.

**Arquivo:** `src/pages/Categories.tsx:143`

**Ação:** Substituir pelo `subtitle` descritivo ou escrever alt específico:
```tsx
alt={`${category.name} — ${category.subtitle}: ${category.description.slice(0, 80)}`}
// Resultado: "Linha T — Tubulações: Boroscópios e endoscópios especializados para inspeção..."
```

---

#### 9. Links de produtos no footer não filtram por categoria

**Problema:** A seção "Produtos" no footer lista "Endoscópios Rígidos", "Videoscópios", "Boroscópios" e "Fontes de Luz", mas todos apontam para `/produtos` (a página genérica sem filtro). Isso desperdiça oportunidade de anchor text com keywords e de enviar PageRank para páginas de categoria específicas.

**Arquivo:** `src/components/Footer.tsx:67-79`

**Ação:** Atualizar os links para URLs com filtro de categoria:
```tsx
{ label: 'Videoscópios', path: '/produtos?categoria=Linha%20M%20-%20M%C3%A1quinas' }
{ label: 'Robôs de Inspeção', path: '/produtos?categoria=Linha%20R%20-%20Rob%C3%B4s' }
```

---

#### 10. CNPJ ausente na Política de Privacidade

**Problema:** A página de Política de Privacidade exibe `CNPJ: a confirmar` — um placeholder não substituído. Além de parecer descuidado, o CNPJ é relevante para sinais de confiança (E-E-A-T) junto ao Google.

**Arquivo:** `src/pages/PrivacyPolicy.tsx:64`

**Ação:** Substituir `a confirmar` pelo CNPJ real da BOROTEC Industrial.

---

#### 11. Schema `WebSite` com SearchAction ausente

**Problema:** Falta o schema `WebSite` com `SearchAction`, que ativa a caixa de busca interna do site diretamente no resultado do Google quando alguém pesquisa pela marca.

**Ação:** Adicionar em `src/pages/Index.tsx` junto com o schema existente:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://borotec.com.br",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://borotec.com.br/produtos?busca={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

#### 12. Schema `AggregateRating` ausente nos produtos

**Problema:** Nenhum produto tem schema de avaliação. Rich snippets com estrelas douradas aumentam o CTR em 15–30% nos resultados de busca.

**Ação:** Adicionar `AggregateRating` ao schema `Product` em `src/pages/ProductDetail.tsx`:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "12"
}
```

---

#### 13. `dateModified` ausente nos artigos

**Problema:** O schema `Article` tem `datePublished` mas não `dateModified`. O Google usa essa data para avaliar atualidade do conteúdo.

**Arquivo:** `src/pages/BlogPost.tsx:44`

**Ação:** Adicionar o campo `dateModified` ao tipo `BlogPost` em `src/data/blog.ts` e incluir no schema.

---

#### 14. Meta `keywords` ausente nas páginas individuais

**Problema:** Apenas o `index.html` global tem meta `keywords`. As páginas controladas pelo Helmet não definem keywords próprias por página.

**Ação:** Adicionar `<meta name="keywords">` específico em cada Helmet. Exemplos:
- Produto ATEX → `"boroscópio ATEX, videoscópio área classificada, IECEx industrial"`
- Blog tubulações → `"inspeção tubulações industriais, endoscópio tubulação, NR-13"`
- Categorias → `"linha de produtos boroscópio, tipos de videoscópio industrial"`

---

### Prioridade Média — Performance e Core Web Vitals

---

#### 15. Comprimir o vídeo da hero section

**Situação:** O `preload="none"` já está configurado corretamente. O problema restante é o tamanho do arquivo: `hero-video.mp4` pode prejudicar o carregamento em conexões lentas quando o usuário fizer scroll ou interagir com a página.

**Ação:**
- Comprimir com ffmpeg (alvo: abaixo de 3MB): `ffmpeg -i hero-video.mp4 -vcodec libx264 -crf 28 hero-video-compressed.mp4`
- Adicionar versão `.webm` para Chrome/Firefox (melhor compressão)
- Em mobile, substituir o vídeo por `hero-bg.webp` (imagem estática já existente em `src/assets/`)

---

#### 16. `preconnect` e `dns-prefetch` para domínios externos

**Problema:** O `<head>` não tem hints de pré-conexão, adicionando latência DNS + TCP + TLS a cada recurso externo na primeira visita.

**Ação:** Adicionar em `index.html` antes do fechamento de `</head>`:

```html
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://api.web3forms.com" />
<link rel="dns-prefetch" href="https://maps.googleapis.com" />
```

---

#### 17. Cache de longa duração para assets estáticos no `.htaccess`

**Problema:** O `.htaccess` não tem headers de `Cache-Control`, fazendo o browser re-baixar imagens, JS e CSS a cada visita.

**Ação:** Adicionar em `public/.htaccess`:

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

### Prioridade Baixa — Conteúdo e SEO off-page

---

#### 18. Google Search Console — submissão e monitoramento

**Ação:**
1. Verificar propriedade `borotec.com.br`
2. Submeter `/sitemap.xml`
3. Monitorar cobertura, erros de indexação e Core Web Vitals

**Entregável recorrente:** Relatório mensal de posições, impressões e cliques.

---

#### 19. Landing pages por categoria de produto (SEO de nicho)

**Oportunidade:** Páginas dedicadas por linha com H1 otimizado, texto técnico e schema próprio capturam tráfego de palavras-chave de alta intenção de compra.

**Páginas sugeridas:**
- `/boroscopios-atex` — "boroscópio ATEX", "videoscópio área classificada", "IECEx industrial"
- `/videoscopios-industriais` — "videoscópio industrial", "inspeção visual remota"
- `/robos-inspecao-tubulacoes` — "robô inspeção tubulação", "câmera CCTV esgoto"
- `/boroscopios-alta-temperatura` — "boroscópio alta temperatura", "inspeção turbinas a gás"
- `/medicao-3d-industrial` — "medição 3D boroscópio", "videoscópio estereoscópico"

---

#### 20. Plano de conteúdo — blog (mínimo 2 artigos/mês)

**Situação atual:** 7 artigos. Volume insuficiente para competir em buscas técnicas industriais.

**Pautas sugeridas:**
- "Inspeção de caldeiras pela NR-13 — prazos e equipamentos"
- "Como inspecionar turbinas a gás por boroscopia"
- "Diferença entre CCTV e videoscópio para tubulações"
- "Boroscópio vs ultrassom — quando usar cada técnica"
- "Inspeção de poços de petróleo: equipamentos obrigatórios"
- "Manutenção preditiva na petroquímica: guia completo"

---

#### 21. Google Business Profile (antigo Google Meu Negócio)

**Impacto:** Ativa o painel de conhecimento nos resultados de busca e posiciona a empresa no Google Maps para buscas locais como "boroscópio industrial São Paulo".

**Ação:** Verificar ou criar perfil em `business.google.com` com fotos, produtos, horário e link para o site.

---

#### 22. Estratégia de backlinks

**Ações:**
- Artigos em portais industriais: Manutenção&Tecnologia, Indústria Hoje, Manutenção Online
- Cadastro em diretórios: ABRAMAN, IBP, Sindipeças
- Parceria de conteúdo com distribuidores e integradores industriais

**Meta:** 5–10 backlinks de domínios com DA > 30 por trimestre.

---

#### 23. Newsletter do blog funcional

**Situação:** O formulário existe na interface mas não tem backend — o botão "Inscrever-se" não faz nada.

**Ação:** Integrar com Brevo ou Mailchimp. Custo zero até 300 contatos/dia.

---

## Resumo executivo

| # | Ação | Esforço | Impacto SEO | Prioridade |
|---|------|---------|-------------|-----------|
| 1 | Imagens do blog (ausentes) | Baixo | Alto — erro crítico | 🔴 Alta |
| 2 | og:image blog: URL relativa → absoluta | Baixo | Alto | 🔴 Alta |
| 3 | Corrigir NAP (telefone e e-mail) | Baixo | Alto — SEO local | 🔴 Alta |
| 4 | Links redes sociais no footer | Baixo | Médio | 🔴 Alta |
| 5 | og:image inconsistente no index.html | Baixo | Médio | 🔴 Alta |
| 6 | Categorias vazias (Poços e Telescópicos) | Médio | Alto | 🟡 Média |
| 7 | Specs técnicas dos produtos (thin content) | Alto | Alto | 🟡 Média |
| 8 | Alt text das imagens de categoria | Baixo | Baixo | 🟡 Média |
| 9 | Links do footer → categorias filtradas | Baixo | Médio | 🟡 Média |
| 10 | CNPJ na Privacy Policy | Baixo | Baixo (confiança) | 🟡 Média |
| 11 | Schema WebSite + SearchAction | Baixo | Alto (rich snippet) | 🟡 Média |
| 12 | Schema AggregateRating nos produtos | Médio | Alto (estrelas Google) | 🟡 Média |
| 13 | `dateModified` nos artigos | Baixo | Médio | 🟡 Média |
| 14 | Meta keywords por página | Baixo | Médio | 🟡 Média |
| 15 | Compressão do vídeo hero | Médio | Médio (performance) | 🟡 Média |
| 16 | `preconnect` / `dns-prefetch` | Baixo | Médio | 🟡 Média |
| 17 | Cache de assets no .htaccess | Baixo | Médio | 🟡 Média |
| 18 | Google Search Console | Baixo | Alto | 🟢 Baixa |
| 19 | Landing pages por categoria | Alto | Alto (tráfego) | 🟢 Baixa |
| 20 | Blog 2 artigos/mês | Alto — recorrente | Alto (longo prazo) | 🟢 Baixa |
| 21 | Google Business Profile | Baixo | Alto (SEO local) | 🟢 Baixa |
| 22 | Estratégia de backlinks | Alto — recorrente | Alto (autoridade) | 🟢 Baixa |
| 23 | Newsletter funcional | Médio | Indireto | 🟢 Baixa |
