# Borotec Industrial — Próximas Ações de SEO

**Data da análise:** 08/05/2026  
**Site:** https://borotec.com.br  
**Stack:** React + Vite + react-helmet-async + pré-renderização estática

---

## O que já está implementado

| Item | Detalhe |
|------|---------|
| Meta tags por página | `title`, `description`, `canonical` em todas as rotas via `react-helmet-async` |
| Open Graph + Twitter Cards | Presentes em todas as páginas com imagem, dimensões e locale `pt_BR` |
| Schema.org estruturado | `LocalBusiness`, `Product`, `Article`, `BreadcrumbList`, `FAQPage` |
| `sitemap.xml` | Completo — 6 páginas estáticas + 7 posts + 20+ produtos |
| `robots.txt` | Configurado com referência ao sitemap |
| HTTPS forçado | Redirect 301 via `.htaccess` |
| Google Tag Manager | GTM-MXZJ8GV9 instalado + eventos `Botao_Whatsapp_produto` e `Formulario_contato` |
| Pré-renderização estática | Todas as rotas têm `index.html` próprio em `/dist/` |
| Blog técnico | 7 artigos com FAQ estruturado e links internos para produtos |
| `lang="pt-BR"` | Declarado no `<html>` do documento raiz |
| `loading="lazy"` | Aplicado em imagens de blog e produtos |
| Formulário de contato | Integrado ao Web3Forms com envio real por e-mail |
| Google Maps | Embed na página de contato com endereço físico |

---

## Próximas Ações

### Prioridade Alta — Erros ativos que prejudicam o site agora

---

#### 1. Criar e subir as imagens dos artigos do blog

**Problema:** A pasta `/public/blog/` está vazia. Os 7 artigos publicados referenciam imagens `.webp` que não existem no servidor, resultando em imagens quebradas em todas as páginas do blog.

**Arquivos faltando:**
- `/public/blog/boroscopio-industrial-inspecao.webp`
- `/public/blog/inspecao-tubulacoes-industriais.webp`
- `/public/blog/como-escolher-boroscopio-industrial.webp`
- `/public/blog/medicao-3d-videoscopio-industrial.webp`
- `/public/blog/robo-inspecao-tubulacoes.webp`
- `/public/blog/boroscopio-atex-iecex-area-classificada.webp`
- `/public/blog/termografia-industrial-manutencao-preditiva.webp`

**Impacto:** Imagens quebradas penalizam o ranking, eliminam o preview ao compartilhar no WhatsApp e LinkedIn, e prejudicam a experiência do usuário.

**Ação:** Criar ou fotografar imagens representativas para cada artigo no formato `1200×630px`, exportar em `.webp` e subir na pasta `/public/blog/`.

---

#### 2. Unificar a og:image

**Problema:** O `index.html` raiz referencia `/og-image.png`, enquanto todas as páginas geradas pelo React usam `/og-borotec.jpg`. São dois nomes diferentes — é preciso confirmar qual arquivo existe no servidor e padronizar.

**Ação:** Verificar qual arquivo está presente no servidor e atualizar `index.html` para usar o mesmo nome que as páginas internas (`/og-borotec.jpg`).

---

#### 3. Criar imagens reais por produto

**Problema:** A página de detalhe de produto usa um sistema de fallback rudimentar que exibe a mesma imagem genérica para grupos inteiros de produtos. Mais de 20 produtos diferentes compartilham apenas 3 imagens.

**Impacto:** Google Imagens é uma fonte significativa de tráfego B2B para equipamentos industriais. Alt text descritivo com keyword + imagem real do produto são fatores diretos de ranking.

**Ação:** Fotografar ou solicitar ao fabricante imagens individuais de cada produto. Cada imagem deve ter `alt` descritivo (ex.: `"Videoscópio ATEX Série K EX para áreas classificadas Zona 1"`).

---

### Prioridade Média — Melhorias de estrutura técnica

---

#### 4. Google Search Console — Submissão e monitoramento

**Problema:** O sitemap está pronto mas não há confirmação de envio ao Google Search Console, nem monitoramento ativo de erros de indexação ou Core Web Vitals.

**Ação:**
1. Verificar propriedade `borotec.com.br` no Search Console
2. Submeter `/sitemap.xml`
3. Configurar alertas de cobertura e desempenho
4. Gerar relatório mensal de palavras-chave, cliques e impressões

**Entregável recorrente:** Relatório mensal com posições, páginas indexadas e erros corrigidos.

---

#### 5. Schema `WebSite` com SearchAction (Sitelinks Search Box)

**Problema:** Não há schema `WebSite` com `SearchAction` no site. Esse schema ativa a caixa de busca interna do site diretamente no resultado do Google quando alguém busca pela marca "Borotec".

**Ação:** Adicionar o seguinte bloco JSON-LD na página inicial:

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

#### 6. Schema `AggregateRating` nos produtos

**Problema:** Nenhum produto tem schema de avaliação. Rich snippets com estrelas douradas aumentam o CTR (taxa de cliques) nos resultados de busca em 15–30%.

**Ação:** Adicionar `AggregateRating` ao schema `Product` de cada produto, inicialmente com avaliações coletadas internamente ou importadas de clientes.

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "12"
}
```

---

#### 7. `dateModified` nos artigos do blog

**Problema:** O schema `Article` de cada post tem `datePublished` mas não tem `dateModified`. O Google usa essa data para avaliar se o conteúdo está atualizado — artigos sem atualização explícita são rebaixados em buscas informacionais.

**Ação:** Adicionar o campo `dateModified` ao schema de todos os posts. Para posts antigos, usar a data atual como primeira atualização formal.

---

#### 8. Meta `keywords` por página

**Problema:** Apenas o `index.html` global tem a meta `keywords`. Cada página gerenciada pelo React (`Helmet`) não define keywords próprias.

**Ação:** Adicionar `<meta name="keywords" ...>` específico em cada página. Exemplos:

- Produto ATEX → `"boroscópio ATEX, videoscópio área classificada, IECEx industrial"`
- Blog tubulações → `"inspeção tubulações industriais, endoscópio tubulação, NR-13"`
- Página Sobre → `"BOROTEC Industrial, metrologia óptica Brasil, fabricante boroscópio"`

---

### Prioridade Média — Performance e Core Web Vitals

---

#### 9. Otimização do vídeo da hero section

**Problema:** O arquivo `hero-video.mp4` é carregado junto com a página inicial, impactando diretamente o LCP (Largest Contentful Paint) — um dos três Core Web Vitals avaliados pelo Google como fator de ranking.

**Ação:**
- Adicionar `preload="none"` no elemento `<video>`
- Carregar o vídeo apenas após o evento `load` da página (lazy load condicional)
- Comprimir o arquivo com HandBrake ou ffmpeg (alvo: abaixo de 3MB)
- Considerar substituição por imagem estática em dispositivos móveis

---

#### 10. `preconnect` e `dns-prefetch` para domínios externos

**Problema:** O `<head>` não tem hints de pré-conexão para os domínios externos usados pelo site. Isso adiciona latência de DNS + TCP + TLS a cada recurso externo na primeira visita.

**Ação:** Adicionar no `index.html`:

```html
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://api.web3forms.com" />
<link rel="dns-prefetch" href="https://wa.me" />
<link rel="dns-prefetch" href="https://maps.googleapis.com" />
```

---

#### 11. Atributos `width` e `height` nas imagens dinâmicas

**Problema:** Imagens de produtos e blog são renderizadas sem dimensões fixas declaradas no HTML. Isso causa CLS (Cumulative Layout Shift) — a página "pula" enquanto as imagens carregam, penalizando o ranking.

**Ação:** Definir `width` e `height` explícitos em todos os elementos `<img>` que não usam `aspect-ratio` CSS controlado.

---

#### 12. Cache de longa duração para assets estáticos no `.htaccess`

**Problema:** O `.htaccess` atual apenas força HTTPS e trata rotas do React SPA. Não há headers de `Cache-Control` para imagens, JavaScript e CSS, o que faz o browser re-baixar esses arquivos a cada visita.

**Ação:** Adicionar ao `.htaccess`:

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

#### 13. Landing pages por categoria de produto

**Oportunidade:** Criar páginas dedicadas por linha de produto com H1 otimizado, texto técnico e schema próprio. Cada categoria representa um cluster de palavras-chave de alta intenção de compra.

**Páginas sugeridas:**
- `/boroscopios-atex` — "boroscópio ATEX", "videoscópio área classificada", "IECEx industrial"
- `/videoscopios-industriais` — "videoscópio industrial", "inspeção visual remota"
- `/robos-inspecao-tubulacoes` — "robô inspeção tubulação", "CCTV inspeção esgoto"
- `/boroscopios-alta-temperatura` — "boroscópio alta temperatura", "inspeção turbinas"
- `/medicao-3d-industrial` — "medição 3D boroscópio", "videoscópio estereoscópico"

---

#### 14. Plano de conteúdo para o blog (mínimo 2 artigos/mês)

**Situação atual:** 7 artigos publicados. Volume insuficiente para competir em buscas técnicas industriais de cauda longa.

**Pautas sugeridas com alta demanda de busca:**
- "Inspeção de caldeiras pela NR-13 — prazos e equipamentos"
- "Como fazer inspeção boroscópica em turbinas a gás"
- "Diferença entre CCTV e videoscópio para inspeção de tubulações"
- "Boroscópio vs ultrassom — quando usar cada técnica"
- "Inspeção de poços de petróleo: equipamentos obrigatórios"
- "Manutenção preditiva na petroquímica: guia completo"

**Entregável:** 2 artigos/mês com SEO on-page completo (H1, H2, keywords, schema, links internos e externos).

---

#### 15. Google Business Profile (antigo Google Meu Negócio)

**Situação:** A empresa tem endereço físico em São Paulo cadastrado no schema do site, mas sem confirmação de perfil verificado no Google.

**Impacto:** Perfil verificado ativa o painel de conhecimento da empresa nos resultados de busca, exibe avaliações de clientes e posiciona a empresa no Google Maps para buscas locais como "boroscópio industrial São Paulo".

**Ação:** Verificar ou criar o perfil em `business.google.com`, adicionar fotos, produtos, horário e link para o site.

---

#### 16. Estratégia de backlinks

**Situação:** Sem links externos de autoridade o Google não tem como confirmar a relevância do domínio no nicho industrial.

**Ações sugeridas:**
- Publicar artigos assinados em portais como Manutenção&Tecnologia, Indústria Hoje, Manutenção Online
- Cadastrar a empresa em diretórios industriais (ABRAMAN, IBP, Sindipeças)
- Parceria de conteúdo com distribuidores e integradores industriais
- Press releases em portais de notícias sobre lançamentos de produtos

**Meta:** 5–10 backlinks de domínios com DA > 30 por trimestre.

---

#### 17. Newsletter do blog funcional

**Situação:** O formulário de newsletter na página do Blog existe na interface mas não tem backend — o botão "Inscrever-se" não faz nada.

**Impacto:** Perda de leads qualificados (técnicos e engenheiros de manutenção que leram o conteúdo e demonstraram interesse).

**Ação:** Integrar com Brevo (antigo Sendinblue) ou Mailchimp via API. Custo zero até 300 contatos/dia.

---

## Resumo executivo

| Ação | Esforço | Impacto SEO | Prioridade |
|------|---------|-------------|-----------|
| Imagens do blog | Baixo | Alto — erros ativos | 🔴 Alta |
| og:image unificada | Baixo | Médio | 🔴 Alta |
| Imagens reais por produto | Médio | Alto | 🔴 Alta |
| Google Search Console | Baixo | Alto | 🟡 Média |
| Schema WebSite + SearchAction | Baixo | Alto (rich snippet) | 🟡 Média |
| Schema AggregateRating | Médio | Alto (estrelas no Google) | 🟡 Média |
| `dateModified` nos artigos | Baixo | Médio | 🟡 Média |
| Meta keywords por página | Baixo | Médio | 🟡 Média |
| Otimização do vídeo hero | Médio | Alto (Core Web Vitals) | 🟡 Média |
| `preconnect` / `dns-prefetch` | Baixo | Médio | 🟡 Média |
| `width`/`height` nas imagens | Médio | Médio (CLS) | 🟡 Média |
| Cache de assets no .htaccess | Baixo | Médio | 🟡 Média |
| Landing pages por categoria | Alto | Alto (tráfego orgânico) | 🟢 Baixa |
| Blog 2 artigos/mês | Alto — recorrente | Alto (longo prazo) | 🟢 Baixa |
| Google Business Profile | Baixo | Alto (SEO local) | 🟢 Baixa |
| Estratégia de backlinks | Alto — recorrente | Alto (autoridade) | 🟢 Baixa |
| Newsletter funcional | Médio | Indireto (engajamento) | 🟢 Baixa |
