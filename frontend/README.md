# 🎨 AutoFlex Frontend

O frontend do AutoFlex é uma Single Page Application (SPA) moderna, construída com **React 18** e **Vite**, focada em performance e experiência do usuário.

## 🛠️ Tecnologias Principais

- **React 18**: Biblioteca JavaScript para UI.
- **Vite**: Ferramenta de build de última geração (substitui o Create React App).
- **TypeScript**: Adiciona tipagem estática ao JavaScript.
- **TailwindCSS**: Framework CSS utility-first para estilização rápida.
- **Redux Toolkit**: Gerenciamento de estado global da aplicação.
- **React Hook Form**: Gerenciamento de formulários complexos.
- **Zod**: Validação de schemas (usado em conjunto com React Hook Form).
- **Axios**: Cliente HTTP para comunicação com o Backend.
- **Cypress**: Framework de testes End-to-End.

## 📂 Arquitetura do Frontend

A estrutura foi pensada para escalar com facilidade:

```
frontend/src/
├── components/   # Componentes reutilizáveis (UI Kit)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   └── ...
├── pages/        # Telas da aplicação (Roteamento)
│   ├── Products/
│   ├── Materials/
│   └── Production/
├── store/        # Estado Global (Redux Slices)
│   ├── productSlice.ts
│   └── store.ts
├── services/     # Configuração de API (Axios)
│   └── api.ts    # Instância base do Axios
├── layout/       # Componentes estruturais
│   ├── Header.tsx
│   └── Footer.tsx
└── types/        # Definições de Tipos TypeScript
```

## 🚀 Como Rodar o Frontend

### Pré-requisitos

- Node.js 18+ instalado
- O Backend deve estar rodando (para que as requisições funcionem)

### 1. Instalar Dependências

No diretório `frontend`, execute:

```bash
npm install
```

### 2. Rodar em Modo Dev

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

> O Frontend estará acessível em: `http://localhost:5173`

## 📦 Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes scripts:

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria a versão de produção na pasta `dist`.
- `npm run lint`: Verifica erros de linting no código.
- `npm run preview`: Visualiza a versão de produção localmente.
- `npx cypress open`: Abre a interface de testes do Cypress.

## 🧩 Componentes Principais

### `GenericTable`

Um componente de tabela reutilizável que aceita dados genéricos e renderiza colunas dinamicamente. Usado nas telas de **Produtos** e **Matérias-Primas**.

### `Modal`

Gerenciador de janelas modais para criação e edição de itens, garantindo que o usuário mantenha o foco na tarefa atual.

### `KPI Cards`

Cards informativos no topo das páginas que mostram resumos rápidos (Total de Produtos, Valor em Estoque, etc.).

## 🔄 Gerenciamento de Estado (Redux)

Utilizamos o **Redux Toolkit** para gerenciar o estado global. Isso evita o "prop drilling" (passar propriedades por muitos níveis).

- **productSlice**: Armazena a lista de produtos e status de carregamento.
- **materialSlice**: Armazena o estoque de matérias-primas.
- **productionSlice**: Armazena as sugestões de produção calculadas.

## 📡 Integração com API

A comunicação com o backend é feita através do **Axios**, configurado em `src/services/api.ts`.

```typescript
// Exemplo de chamada:
const response = await api.get("/products");
```

A URL base da API é definida via variáveis de ambiente (`VITE_API_URL`) ou padrão para `http://localhost:8080`.
