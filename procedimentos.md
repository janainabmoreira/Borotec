# Procedimentos — BOROTEC Industrial

Registro simples de tudo que foi configurado e implementado no projeto.

---

## 1. Rastreamento de páginas SPA (virtualPageView)

**Problema:** O site é uma Single Page Application (React). O Google Tag Manager só dispara automaticamente no primeiro carregamento da página. Quando o usuário navega entre páginas pelo menu (ex: Home → Produtos), o browser não recarrega — então o GTM não registrava a troca de página. Resultado: a página `/produtos` aparecia como "Sem tag" no GTM.

**Solução no código (`src/App.tsx`):** Foi criado o componente `GTMRouteTracker` que escuta cada mudança de rota e envia um evento para o GTM:

```ts
window.dataLayer.push({
  event: 'virtualPageView',
  page: location.pathname + location.search,
});
```

**Solução no GTM:**
- Criado acionador: **SPA - Troca de Página**
  - Tipo: Evento personalizado
  - Nome do evento: `virtualPageView`
- Adicionado esse acionador nas tags: **Google Tag - GA4** e **Google Ads Remarketing**

---

## 2. Tag de Remarketing do Google Ads

**O que é:** A tag de remarketing informa ao Google Ads quem visitou o site, permitindo criar listas de público para reimpactar visitantes com anúncios.

**Configuração no GTM:**
- Criada tag: **Google Ads - Remarketing**
  - Tipo: Remarketing do Google Ads
  - ID de conversão: `17974974395`
  - Acionadores: **Visualização de página (All Pages)** + **SPA - Troca de Página**

---

## 3. Conversão do botão WhatsApp Hero

**O que é:** O botão "Fale no WhatsApp" no hero da homepage não estava sendo rastreado como conversão no Google Ads.

**Solução no código (`src/components/HeroSection.tsx`):** Foi adicionado um `onClick` no botão que dispara um evento personalizado para o GTM:

```ts
onClick={() => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'whatsapp_hero_click' });
}}
```

> **Por que evento personalizado e não clique CSS?**
> Em aplicações React, triggers de clique baseados em seletores CSS do GTM não funcionam de forma confiável. O método correto é usar `dataLayer.push` diretamente no código.

**Configuração no GTM:**
- Criado acionador: **Clique - WhatsApp Hero**
  - Tipo: Evento personalizado
  - Nome do evento: `whatsapp_hero_click`
- Criada tag: **Google Ads - Conversão - WhatsApp Hero**
  - Tipo: Acompanhamento de conversões do Google Ads
  - ID de conversão: `17974974395`
  - Rótulo: gerado pelo Google Ads (conversão: `Botao_WhatsApp_Hero`)
  - Acionador: **Clique - WhatsApp Hero**

---

## 4. Resumo das tags ativas no GTM

| Tag | Acionador |
|-----|-----------|
| Google Tag - GA4 | All Pages + SPA - Troca de Página |
| Google Ads Remarketing | All Pages + SPA - Troca de Página |
| Tag do Google AW-17974974395 | All Pages |
| Vinculador de conversões | All Pages |
| Google Ads - Conversão - WhatsApp Hero | Evento `whatsapp_hero_click` |
| Google Ads - Conversão - WhatsApp Flutuante | Evento personalizado |
| Google Ads - Conversão - WhatsApp Produto | Evento personalizado |
| Google Ads - Conversão - WhatsApp Carrinho | Evento personalizado |
| Google Ads - Conversão - Formulário Contato | Envio do formulário |

---

## 5. IDs de rastreamento

| Serviço | ID |
|---------|-----|
| Google Tag Manager | GTM-MXZJ8GV9 |
| Google Analytics 4 | G-R1YZ5L9X39 |
| Google Ads | AW-17974974395 |

---

## 6. Como fazer deploy após alterações no código

Sempre que houver mudança no código-fonte:

```bash
# 1. Gerar build de produção
npm run build

# 2. Abrir FileZilla e conectar ao servidor
# 3. Navegar até public_html no servidor (lado direito)
# 4. Selecionar todo o conteúdo da pasta dist/ (lado esquerdo)
# 5. Arrastar para public_html, sobrescrevendo os arquivos
```

---

## 7. Área administrativa (pendente)

Foi planejada uma área administrativa para o cliente com:
- Gerenciamento de produtos (adicionar, editar, remover)
- Visualização de leads recebidos pelo formulário
- Dashboard com páginas mais acessadas por data/período

**Tecnologia definida:** Supabase (banco de dados, autenticação e storage de imagens em nuvem — funciona com a hospedagem KingHost existente).

**Status:** Pausado. Para retomar, criar projeto no Supabase em supabase.com e rodar o SQL de criação de tabelas documentado na conversa.
