# AutoFlex: Sistema de Gestão 

> **Otimize seu estoque. Maximize sua produção.**

Bem-vindo ao **AutoFlex**, uma solução completa de _Inventory Management_ desenvolvida para indústrias que precisam de inteligência na hora de produzir. Este projeto é uma **aplicação Full Stack** moderna que não apenas controla o que você tem, mas diz o que você deve fazer com isso.

![Status do Projeto](https://img.shields.io/badge/Status-Conclu%C3%ADdo-green) ![Docker](https://img.shields.io/badge/Docker-Enabled-blue) ![Java](https://img.shields.io/badge/Java-17-orange) ![Quarkus](https://img.shields.io/badge/Quarkus-2.16-orange) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

---

## 📋 Sobre o Projeto

O **AutoFlex** resolve um problema clássico da manufatura: o desperdício de potencial. Muitas vezes, uma fábrica tem insumos parados no estoque que poderiam virar produtos acabados e gerar receita imediata.

### 💡 O Diferencial: "Sugestão Inteligente"

O coração do sistema é o algoritmo de sugestão. Ele analisa:

1.  **Produto** (Mesa)
2.  **Materia prima** (Madeira de carvalho)
3.  **Composição** (10 de Mesa de Carvalho R$200,00)

O sistema cruza esses dados e informa: _"Produza 10 Mesas hoje e fature R$ 2.000,00"_.

---

## 🏗️ Arquitetura e Tecnologias

O projeto foi construído sobre uma arquitetura de microsserviços simulada, pronta para escalar.

### 🧠 Backend (A Inteligência)

- **Java 17 & Quarkus**: Escolhido pela performance nativa e inicialização em milissegundos.
- **Hibernate Panache**: Simplifica a camada de dados (Repository Pattern).
- **PostgreSQL**: Banco relacional robusto para integridade dos dados.
- **Docker**: Todo o ambiente de banco rodando em containers.

### 🎨 Frontend (A Experiência)

- **React 18 & Vite**: Velocidade extrema de carregamento.
- **Redux Toolkit**: Gerenciamento de estado global centralizado.
- **TailwindCSS**: Design system moderno e responsivo.
- **Zod & React Hook Form**: Validação de dados rigorosa no client-side.

---

## 🚀 PASSO A PASSO: Guia de Execução

Siga este roteiro detalhado para rodar o projeto do zero na sua máquina.

### 🛑 1. Verificando Pré-requisitos

Antes de começar, abra seu terminal e verifique se você tem as ferramentas necessárias.

```bash
# Verifique o Java (Deve ser versão 17 ou superior)
java -version

# Verifique o Node.js (Deve ser versão 18 ou superior)
node -v

# Verifique o Docker (Deve estar instalado e rodando)
docker --version
```

> _Se algum comando falhar, instale a ferramenta correspondente antes de prosseguir._

### 🛠️ 2. Configurando o Banco de Dados (Docker)

Não instale o PostgreSQL na sua máquina! Vamos usar a magia do Docker.

Abra o terminal e execute:

```bash
docker run --name autoflex-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=autoflex -p 5432:5432 -d postgres
```

**O que isso faz?**

- Cria um banco PostgreSQL isolado.
- Define usuário/senha como `postgres`/`postgres`.
- Cria o database `autoflex` automaticamente.
- Libera a porta `5432` para nosso Backend conectar.

### 🔌 3. Iniciando o Backend

Abra um terminal, entre na pasta `backend` e rode:

```bash
cd backend
quarkus dev
```

> Aguarde a mensagem: `Profile dev activated`.
> A API estará rodando em: `http://localhost:8080`

### 🖥️ 4. Iniciando o Frontend

Mantenha o terminal do backend aberto. Abra **outro terminal**, vá na pasta `frontend` e rode:

```bash
cd frontend
npm install  # Instala as dependências (React, Tailwind, etc)
npm run dev  # Inicia o servidor local
```

> O sistema abrirá em: `http://localhost:5173`

---

## 📚 Documentação Técnica Profissional

Para desenvolvedores que querem entender os detalhes internos, preparei documentações específicas:

| Área         | Conteúdo                                                    | Link                                               |
| :----------- | :---------------------------------------------------------- | :------------------------------------------------- |
| **Backend**  | Lista completa de Endpoints (JSON), Camadas e Configuração. | [**Ler README do Backend**](./backend/README.md)   |
| **Frontend** | Estrutura de Pastas, Componentes Visuais e Redux.           | [**Ler README do Frontend**](./frontend/README.md) |

---

## ✅ Checklist de Funcionalidades (MVP)

Tudo o que foi entregue nesta versão 1.0:

- [x] **Cadastro de Produtos** (CRUD)
- [x] **Gestão de Matérias-Primas** (Estoque)
- [x] **Criação de Receitas/Composições**
- [x] **Algoritmo de Sugestão de Produção**
- [x] **Relatórios/Dashboard**
- [x] **Testes E2E com Cypress**

---

## ❓ Dúvidas Comuns

**"O banco de dados não conecta!"**

- Verifique se o Docker Desktop está aberto.
- Rode `docker ps` e veja se o container `autoflex-db` está com status `Up`.

**"Posso mudar a porta do frontend?"**

- Sim, edite o arquivo `vite.config.ts`.

---

## 📝 Autor

Desenvolvido por **Carlos Paula**.
_Projeto criado para o projeto de teste técnico._
