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
