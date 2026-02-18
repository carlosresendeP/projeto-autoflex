# 🧠 AutoFlex Backend

O backend do AutoFlex é uma API RESTful robusta construída com **Java 17** e **Quarkus**, utilizando **Hibernate Panache** para persistência e **PostgreSQL** como banco de dados.

## 🛠️ Tecnologias e Ferramentas

- **Linguagem**: Java 17+
- **Framework**: Quarkus 3.x ("Supersonic Subatomic Java")
- **Banco de Dados**: PostgreSQL 14+
- **ORM**: Hibernate ORM with Panache
- **API**: RESTEasy Reactive (JAX-RS)
- **Build Tool**: Maven

## 📂 Estrutura de Pastas

A estrutura do projeto segue os princípios do Quarkus para micros serviços, mantendo o código limpo e organizado:

```
backend/src/main/java/com/autoflex/
├── models/       # Entidades JPA (Mapeamento do Banco de Dados)
│   ├── Product.java
│   ├── RawMaterial.java
│   └── Composition.java
├── resources/    # Controladores REST (Endpoints da API)
│   ├── ProductResource.java
│   └── ...
├── services/     # Regras de Negócio e Lógica Complexa
│   └── ProductionService.java
└── dto/          # Data Transfer Objects (Objetos de retorno)
```

## 🚀 Como Rodar o Backend

### Pré-requisitos

- Java JDK 17+ instalado
- Docker rodando (para o banco de dados)

### 1. Subir o Banco de Dados

Se você ainda não criou o container do banco, execute:

```bash
docker run --name autoflex-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=autoflex -p 5432:5432 -d postgres
```

### 2. Executar em Modo Dev

Navegue até a pasta `backend` e execute:

```bash
# Windows (CMD/PowerShell)
.\mvnw quarkus:dev
# Ou se tiver o CLI do Quarkus instalado:
quarkus dev
```

> O sistema iniciará na porta **8080**.
> O console do desenvolvedor (Dev UI) estará disponível em: `http://localhost:8080/q/dev`

## 🔌 Endpoints da API

Aqui está a lista completa dos endpoints disponíveis para integração.

### 📦 Produtos (`/products`)

| Método   | Endpoint         | Descrição               | Corpo da Requisição (JSON)       |
| :------- | :--------------- | :---------------------- | :------------------------------- |
| `GET`    | `/products`      | Lista todos os produtos | -                                |
| `POST`   | `/products`      | Cria um novo produto    | `{"name": "...", "value": 10.5}` |
| `PUT`    | `/products/{id}` | Atualiza um produto     | `{"name": "Novo Nome"}`          |
| `DELETE` | `/products/{id}` | Remove um produto       | -                                |

### 🧱 Matérias-Primas (`/materials`)

| Método   | Endpoint          | Descrição                      | Corpo da Requisição (JSON)              |
| :------- | :---------------- | :----------------------------- | :-------------------------------------- |
| `GET`    | `/materials`      | Lista todas as matérias-primas | -                                       |
| `POST`   | `/materials`      | Cria nova matéria-prima        | `{"name": "...", "stockQuantity": 100}` |
| `PUT`    | `/materials/{id}` | Atualiza estoque/nome          | `{"stockQuantity": 50}`                 |
| `DELETE` | `/materials/{id}` | Remove matéria-prima           | -                                       |

### ⚗️ Composições / Receitas (`/compositions`)

Define do que cada produto é feito.

| Método   | Endpoint             | Descrição                     | Corpo da Requisição (JSON)                                                |
| :------- | :------------------- | :---------------------------- | :------------------------------------------------------------------------ |
| `GET`    | `/compositions`      | Lista todas as receitas       | -                                                                         |
| `POST`   | `/compositions`      | Cria vínculo Produto-Material | `{"product": {"id": 1}, "rawMaterial": {"id": 2}, "quantityRequired": 5}` |
| `PUT`    | `/compositions/{id}` | Atualiza quantidades          | `{"quantityRequired": 10}`                                                |
| `DELETE` | `/compositions/{id}` | Remove o vínculo              | -                                                                         |

### 💡 Produção (`/suggestions`)

| Método | Endpoint       | Descrição                                           | Retorno                                              |
| :----- | :------------- | :-------------------------------------------------- | :--------------------------------------------------- |
| `GET`  | `/suggestions` | Calcula a melhor produção com base no estoque atual | Lista de sugestões com Qtd Possível e Valor Estimado |

## ⚙️ Configuração (.env)

O Quarkus gerencia as configurações no arquivo `src/main/resources/application.properties`.
Para mudar a conexão do banco em produção, você pode usar variáveis de ambiente:

```properties
QUARKUS_DATASOURCE_JDBC_URL=jdbc:postgresql://localhost:5432/autoflex
QUARKUS_DATASOURCE_USERNAME=postgres
QUARKUS_DATASOURCE_PASSWORD=postgres
```
