# Borotec Oficial

## Contexto do Projeto

Este projeto foi originalmente criado pela plataforma [Lovable](https://lovable.dev/) por terceiros e entregue ao cliente em forma de arquivos. A partir de agora, toda manutenção e atualização do sistema será feita diretamente no código-fonte e publicada no servidor via **FTP**.

## Fluxo de Trabalho

```
Edição do código  →  Commit no GitHub  →  Upload via FTP para o servidor
```

1. Alterações são feitas localmente nos arquivos do projeto
2. O código atualizado é versionado e salvo no repositório GitHub
3. Os arquivos de produção (pasta `/dist`) são enviados ao servidor via FTP

## Como gerar o build para envio ao servidor

```sh
# Instalar as dependências (apenas na primeira vez)
npm install

# Gerar os arquivos de produção na pasta /dist
npm run build
```

Os arquivos gerados na pasta `/dist` são os que devem ser enviados ao servidor via FTP.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento local |
| `npm run build` | Gera o build de produção (pasta `/dist`) |
| `npm run build:dev` | Gera o build em modo desenvolvimento |
| `npm run preview` | Visualiza o build localmente antes de enviar |
| `npm run lint` | Executa o verificador de código (ESLint) |

> **Dica:** Use o arquivo `borotec.cmd` para acessar um menu interativo com todos os comandos acima.

## Tecnologias utilizadas

- [Vite](https://vitejs.dev/) — Empacotador e servidor de desenvolvimento
- [React](https://react.dev/) — Biblioteca de interface
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [shadcn/ui](https://ui.shadcn.com/) — Componentes de interface
- [Tailwind CSS](https://tailwindcss.com/) — Estilização

## Estrutura de pastas

```
Borotec_oficial/
├── src/          # Código-fonte da aplicação
├── public/       # Arquivos públicos estáticos
├── dist/         # Build de produção (enviar via FTP)
├── borotec.cmd   # Menu de comandos rápidos
└── index.html    # Entrada da aplicação
```

## Rastreamento e Analytics

### Google Tag Manager — GTM-MXZJ8GV9

Instalado no `index.html`. Gerencia todas as tags de analytics e conversão.

**Rastreamento SPA:** o componente `GTMRouteTracker` em `src/App.tsx` dispara o evento `virtualPageView` a cada troca de rota, garantindo que todas as páginas sejam rastreadas corretamente mesmo sem recarregamento da página.

```ts
window.dataLayer.push({
  event: 'virtualPageView',
  page: location.pathname + location.search,
});
```

### Tags configuradas no GTM

| Tag | Tipo | Acionador |
|-----|------|-----------|
| Google Tag - GA4 | GA4 | All Pages + SPA - Troca de Página |
| Google Ads Remarketing | Remarketing | All Pages + SPA - Troca de Página |
| Google Ads - Conversão - WhatsApp Hero | Conversão Google Ads | Evento `whatsapp_hero_click` |
| Google Ads - Conversão - WhatsApp Flutuante | Conversão Google Ads | Evento personalizado |
| Google Ads - Conversão - WhatsApp Produto | Conversão Google Ads | Evento personalizado |
| Google Ads - Conversão - WhatsApp Carrinho | Conversão Google Ads | Evento personalizado |
| Google Ads - Conversão - Formulário Contato | Conversão Google Ads | Envio do formulário |
| Tag do Google AW-17974974395 | Google Ads | All Pages |
| Vinculador de conversões | Vinculador | All Pages |

### Eventos personalizados via dataLayer

Os botões de WhatsApp usam `dataLayer.push` diretamente (mais confiável que triggers de clique CSS em SPAs React):

| Evento | Arquivo | Descrição |
|--------|---------|-----------|
| `whatsapp_hero_click` | `src/components/HeroSection.tsx` | Botão "Fale no WhatsApp" no hero da home |

### IDs de rastreamento

| Serviço | ID |
|---------|-----|
| Google Tag Manager | GTM-MXZJ8GV9 |
| Google Analytics 4 | G-R1YZ5L9X39 |
| Google Ads | AW-17974974395 |
