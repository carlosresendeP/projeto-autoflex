# 🎨 Frontend do AutoFlex: A Vitrine da Produção

> **Interface construída para ser Rápida, Bonita e Funcional**

Este é o guia definitivo para o frontend em React. Aqui explicamos as decisões de design, a estrutura de pastas e como estender a interface.

---

## 🛠️ Por dentro da Stack (Decisões Técnicas)

### 1. Vite vs Create React App

Usamos o **Vite** porque ele usa ES Modules nativos no navegador.

- **Resultado**: O servidor sobe em < 300ms, contra 30s+ do CRA.

### 2. Redux Toolkit

Por que um gerenciador de estado global?

- O AutoFlex tem dados complexos compartilhados: quando você atualiza um **Produto**, a tela de **Sugestão de Produção** precisa saber disso instantaneamente. O Redux garante essa sincronia sem precisar recarregar a página.

### 3. Zod + React Hook Form

- Validamos tudo no cliente antes de enviar para o servidor.
- **Zod**: Cria o schema (regras).
- **React Hook Form**: Gerencia os inputs sem re-renderizar o componente inteiro a cada digitação.

---

## 📂 Anatomia do Frontend

Entenda onde cada peça do quebra-cabeça se encaixa em `src/`:

```bash

src/
├── assets/          # Imagens, ícones e fontes globais
├── components/      # Blocos de UI reutilizáveis (Botões, Inputs, Cards)
├── layout/          # Estruturas de página (Sidebar, Header, Wrappers)
├── pages/           # Telas completas da aplicação (ex: Home, Produtos)
├── routes/          # Definição das rotas (URL -> Componente)
├── schemas/         # Validação de dados com Zod
├── services/        # Comunicação com a API (Axios, Fetchers)
├── store/           # Estado global com Redux (Slices, Store)
├── types/           # Tipos TypeScript compartilhados
├── utils/           # Funções auxiliares e formatadores
├── App.tsx          # Componente raiz
├── main.tsx         # Ponto de entrada (Mount do React no DOM)
└── index.css        # Estilos globais e variáveis CSS
```

---

## 🚀 Scripts de Desenvolvimento

No seu dia a dia, você usará estes comandos no terminal (`frontend/`):

| Comando           | O que ele faz?                                                |
| :---------------- | :------------------------------------------------------------ |
| `npm run dev`     | **Inicia o servidor local**. É aqui que a mágica acontece.    |
| `npm run build`   | **Compila para Produção**. Gera a pasta `dist` otimizada.     |
| `npm run preview` | **Testa o Build**. Roda localmente a versão final gerada.     |
| `npm run lint`    | **Caça Bugs**. O ESLint analisa seu código em busca de erros. |

---

## 📡 Integração com o Backend

A API está configurada em `src/services/api.ts`.
Se precisar mudar a URL do backend (ex: deploy), crie um arquivo `.env` na raiz do `frontend`:

```env
VITE_API_URL=http://localhost:8080
```

### Exemplo de uso no código:

```typescript
import { api } from "../services/api";

// Buscando produtos
const carregarProdutos = async () => {
  const { data } = await api.get("/products");
  return data; // Já vem tipado!
};
```

---

## 🧪 Testes E2E (Cypress)

Garantimos que o usuário consegue completar os fluxos principais.

Para rodar os testes visualmente:

```bash
npx cypress open
```

1.  Escolha **E2E Testing**.
2.  Escolha **Chrome** (ou o navegador de sua preferência).
3.  Clique em **product-flow.cy.ts** para ver o robô trabalhando.
