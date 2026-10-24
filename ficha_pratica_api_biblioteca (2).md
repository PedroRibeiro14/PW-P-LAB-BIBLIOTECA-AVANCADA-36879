![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![dotenv](https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

# 🚀 Ficha de exercicios P -> CRUD com ORM (prisma)

---

## Unidade Curricular: Programação Web  
Curso: Tecnologias e Programação de Sistemas de Informação  
Instituição: IPVC — Escola Superior de Tecnologia e Gestão  
Ano Letivo: 2025-2026  

### Docentes
Célia Soares (P)  
Email: celiasoares@estg.ipvc.pt  

Marcelo Antunes Fernandes (Docente Responsável - T)  
Email: fernandesmarcelo@estg.ipvc.pt  

---

# 📑 Índice

1. [Objetivo](#-objetivo)
2. [Contexto](#-contexto)
3. [Setup Inicial](#️-setup-inicial)
4. [Estrutura do Projeto](#-estrutura-do-projeto)
5. [.gitignore](#-gitignore)
6. [package.json — Scripts](#-packagejson--scripts)
7. [.env](#-env)
8. [Prisma ORM — Base de Dados](#️-prisma-orm--base-de-dados)
9. [schema.prisma](#-schemaprisma)
10. [Arquitetura MVC](#️-arquitetura-mvc)
11. [Prisma Client](#-prisma-client)
12. [server.js Base](#-serverjs-base)
13. [Middleware de Erro Global](#️-middleware-de-erro-global)
14. [Seed da Base de Dados](#-seed-da-base-de-dados)
15. [Paginação](#-paginação)
16. [Ordenação](#-ordenação)
17. [Pesquisa Avançada](#-pesquisa-avançada)
18. [Estatísticas](#-estatísticas)
19. [Validação de Dados](#-validação-de-dados)
20. [Testar com Postman](#-testar-com-postman)
21. [Deploy no Vercel](#️-deploy-no-vercel)
22. [LAB — API Biblioteca Avançada](#-lab--api-biblioteca-avançada)
23. [Desafios Extra](#-desafios-extra)
24. [Glossário](#-glossário)
25. [Recursos Úteis](#-recursos-úteis)

---

# 📌 Objetivo

Criar uma API mais avançada em **Node.js + Express + Prisma + PostgreSQL**, aplicando uma estrutura mais próxima de um projeto backend real.

Nesta ficha pretende-se desenvolver:

- arquitetura **MVC**
- separação entre **routes**, **controllers** e **services**
- utilização de **Prisma ORM** com **PostgreSQL**
- **paginação**
- **ordenação**
- **pesquisa**
- **estatísticas**
- **middleware de erro global**
- **seed da base de dados**

No final, os estudantes deverão compreender melhor:

- organização de código backend
- separação de responsabilidades
- modelação relacional com ORM
- queries mais avançadas
- validação
- deploy

---

# 📚 Contexto

Vamos desenvolver uma **API de Biblioteca**.

A aplicação deverá permitir:

- gerir **autores**
- gerir **livros**
- listar livros de um autor
- pesquisar livros por título
- paginar resultados
- ordenar listagens
- consultar estatísticas da biblioteca

### Relação principal

Um **autor** pode ter **vários livros**.

---

# 🛠️ Setup Inicial

Criar repositório:

```bash
PW-P-LAB-BIBLIOTECA-AVANCADA-{{numero-de-aluno}}
```

Instalar Node.js:

https://nodejs.org/en

Confirmar instalação:

```bash
node -v
npm -v
```

Inicializar o projeto:

```bash
npm init -y
```

Instalar dependências de produção:

```bash
npm install express cors dotenv morgan @prisma/client @prisma/adapter-pg pg
```

Instalar dependências de desenvolvimento:

```bash
npm install prisma nodemon --save-dev
```

Inicializar Prisma:

```bash
npx prisma init
```

---

# 🗂️ Estrutura do Projeto

Após o setup, o projeto deverá ter uma estrutura semelhante à seguinte:

```bash
PW-P-LAB-BIBLIOTECA-AVANCADA-{{numero-de-aluno}}/
├── node_modules/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── controllers/
│   │   ├── author.controller.js
│   │   └── book.controller.js
│   ├── services/
│   │   ├── author.service.js
│   │   └── book.service.js
│   ├── routes/
│   │   ├── author.routes.js
│   │   └── book.routes.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   ├── prisma/
│   │   └── prismaClient.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

> 💡 **Dica:** Esta estrutura é mais próxima da organização usada em projetos profissionais.

---

# 🚫 .gitignore

Criar um ficheiro `.gitignore` na raiz do projeto com o seguinte conteúdo:

```gitignore
# Dependências
node_modules/

# Variáveis de ambiente
.env

# Logs
logs/
*.log
npm-debug.log*

# Sistema operativo
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Vercel
.vercel/

# Prisma
generated/
```

> ⚠️ **Importante:** O ficheiro `.env` contém dados sensíveis e não deve ser enviado para o GitHub.

---

# 📋 package.json — Scripts

Adicionar os seguintes scripts ao `package.json`:

```json
{
  "name": "pw-p-lab-biblioteca-avancada",
  "version": "1.0.0",
  "description": "API Biblioteca Avançada - Programação Web",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "seed": "node prisma/seed.js"
  },
  "keywords": ["api", "express", "node", "prisma", "postgresql"],
  "author": "O teu nome",
  "license": "ISC"
}
```

| Script | Comando | Descrição |
|--------|---------|-----------|
| `start` | `npm start` | Inicia o servidor |
| `dev` | `npm run dev` | Inicia o servidor com Nodemon |
| `seed` | `npm run seed` | Executa o seed da base de dados |

Para correr em modo de desenvolvimento:

```bash
npm run dev
```

---

# 🌱 .env

Criar o ficheiro `.env` com o seguinte conteúdo:

```env
SERVER_PORT=4242
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/library_db?schema=public"
```

### Explicação da `DATABASE_URL`

| Parte | Significado |
|-------|-------------|
| `postgresql` | Tipo de base de dados |
| `postgres:postgres` | Utilizador e password |
| `localhost:5432` | Host e porta |
| `library_db` | Nome da base de dados |
| `schema=public` | Schema utilizado |

---

# 🗄️ Prisma ORM — Base de Dados

O **Prisma** é o ORM utilizado para comunicar com a base de dados PostgreSQL.

Em vez de escrever queries SQL manualmente, usamos métodos como:

```js
prisma.book.findMany()
prisma.author.create()
prisma.book.count()
```

### Fluxo geral

```text
Cliente (Postman/Browser)
        │
        ▼
   Pedido HTTP
        │
        ▼
┌────────────────────┐
│    Express.js      │
│   (Routes/CTRL)    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│      Service       │
│  Lógica de negócio │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Prisma Client    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    PostgreSQL      │
└────────────────────┘
```

---

# 📄 schema.prisma

No ficheiro `prisma/schema.prisma`, configurar:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model Author {
  id          String  @id @default(uuid())
  name        String
  nationality String?
  birthYear   Int?
  books       Book[]
}

model Book {
  id        String   @id @default(uuid())
  title     String
  year      Int
  genre     String
  available Boolean  @default(true)
  authorId  String
  author    Author   @relation(fields: [authorId], references: [id])
}
```

### Explicação dos modelos

| Model | Campo | Tipo | Descrição |
|------|------|------|-----------|
| `Author` | `id` | `String` | UUID do autor |
| `Author` | `name` | `String` | Nome do autor |
| `Author` | `nationality` | `String?` | Nacionalidade |
| `Author` | `birthYear` | `Int?` | Ano de nascimento |
| `Book` | `id` | `String` | UUID do livro |
| `Book` | `title` | `String` | Título do livro |
| `Book` | `year` | `Int` | Ano de publicação |
| `Book` | `genre` | `String` | Género literário |
| `Book` | `available` | `Boolean` | Estado de disponibilidade |
| `Book` | `authorId` | `String` | ID do autor |
| `Book` | `author` | `Author` | Relação com o autor |

Sincronizar o schema com a base de dados:

```bash
npx prisma db push
```

Gerar o Prisma Client:

```bash
npx prisma generate
```

---

# 🧱 Arquitetura MVC

Nesta ficha, o código já não deve ficar concentrado num único ficheiro.

A aplicação deverá ser organizada da seguinte forma:

## Routes

Responsáveis por definir os endpoints.

Exemplo:

```js
const express = require("express");
const router = express.Router();
const { getAllBooks, createBook } = require("../controllers/book.controller");

router.get("/", getAllBooks);
router.post("/", createBook);

module.exports = router;
```

## Controllers

Recebem `req` e `res`, chamam os services e devolvem a resposta.

Exemplo:

```js
const bookService = require("../services/book.service");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks(req.query);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks
};
```

## Services

Contêm a lógica de negócio e a comunicação com a base de dados.

Exemplo:

```js
const prisma = require("../prisma/prismaClient");

const getAllBooks = async () => {
  return prisma.book.findMany();
};

module.exports = {
  getAllBooks
};
```

> 💡 **Resumo:**  
> - `routes` definem os caminhos  
> - `controllers` tratam o pedido e a resposta  
> - `services` tratam da lógica e do acesso aos dados  

---

# 🔌 Prisma Client

Criar ficheiro:

```bash
src/prisma/prismaClient.js
```

Conteúdo:

```js
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
```

---

# 📄 server.js Base

Criar o ficheiro `src/server.js` com a configuração base da aplicação:

```js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authorRoutes = require("./routes/author.routes");
const bookRoutes = require("./routes/book.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware global de erro
app.use(errorMiddleware);

const PORT = process.env.SERVER_PORT || 3000;

// Para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
  });
}

// Para a Vercel
module.exports = app;
```

---

# 🛡️ Middleware de Erro Global

Criar ficheiro:

```bash
src/middlewares/error.middleware.js
```

Conteúdo:

```js
module.exports = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Erro interno do servidor"
  });
};
```

> 💡 Este middleware centraliza o tratamento de erros inesperados.

---

# 🌱 Seed da Base de Dados

Criar ficheiro:

```bash
prisma/seed.js
```

Exemplo base:

```js
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const author1 = await prisma.author.create({
    data: {
      name: "George Orwell",
      nationality: "British",
      birthYear: 1903
    }
  });

  const author2 = await prisma.author.create({
    data: {
      name: "J.K. Rowling",
      nationality: "British",
      birthYear: 1965
    }
  });

  await prisma.book.createMany({
    data: [
      {
        title: "1984",
        year: 1949,
        genre: "dystopian",
        available: true,
        authorId: author1.id
      },
      {
        title: "Animal Farm",
        year: 1945,
        genre: "satire",
        available: true,
        authorId: author1.id
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        year: 1997,
        genre: "fantasy",
        available: true,
        authorId: author2.id
      }
    ]
  });

  console.log("✅ Seed executado com sucesso");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Executar:

```bash
npm run seed
```

---

# 📄 Paginação

Modificar o endpoint `GET /books` para suportar paginação.

Exemplo:

```bash
GET /books?page=1&limit=10
```

Lógica típica:

```js
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;

const skip = (page - 1) * limit;
const take = limit;
```

Exemplo com Prisma:

```js
const books = await prisma.book.findMany({
  skip,
  take
});
```

---

# ↕️ Ordenação

Permitir ordenar os resultados por campos como `title` ou `year`.

Exemplo:

```bash
GET /books?sort=year
GET /books?sort=title
```

Exemplo com Prisma:

```js
const books = await prisma.book.findMany({
  orderBy: {
    year: "asc"
  }
});
```

---

# 🔍 Pesquisa Avançada

Criar endpoint:

```bash
GET /books/search?title=harry
```

Exemplo com Prisma:

```js
const books = await prisma.book.findMany({
  where: {
    title: {
      contains: req.query.title,
      mode: "insensitive"
    }
  }
});
```

> 💡 `contains` permite procurar parte de uma string.  
> 💡 `mode: "insensitive"` ignora maiúsculas/minúsculas.

---

# 📊 Estatísticas

Criar endpoint:

```bash
GET /stats
```

Resposta esperada:

```json
{
  "totalBooks": 20,
  "totalAuthors": 5,
  "availableBooks": 14,
  "borrowedBooks": 6
}
```

Exemplo de implementação:

```js
const totalBooks = await prisma.book.count();
const totalAuthors = await prisma.author.count();
const availableBooks = await prisma.book.count({
  where: { available: true }
});
const borrowedBooks = await prisma.book.count({
  where: { available: false }
});
```

---

# ✅ Validação de Dados

Antes de criar ou atualizar livros, validar:

- `title` obrigatório
- `year` obrigatório e numérico
- `genre` obrigatório
- `authorId` obrigatório
- `authorId` deve existir na base de dados

Exemplo simples:

```js
if (!title || !year || !genre || !authorId) {
  return res.status(400).json({
    message: "Campos obrigatórios em falta"
  });
}
```

Validar se o autor existe:

```js
const author = await prisma.author.findUnique({
  where: { id: authorId }
});

if (!author) {
  return res.status(400).json({
    message: "O autor indicado não existe"
  });
}
```

---

# 🧪 Testar com Postman

Criar uma Collection chamada:

```bash
PW-BIBLIOTECA-API-AVANCADA
```

Testar pelo menos os seguintes endpoints:

## Authors
- `GET /authors`
- `GET /authors/:id`
- `POST /authors`
- `PUT /authors/:id`
- `DELETE /authors/:id`
- `GET /authors/:id/books`

## Books
- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`
- `GET /books/search?title=...`
- `GET /books?page=1&limit=5`
- `GET /books?sort=year`

## Stats
- `GET /stats`

> 💡 Testar também respostas de erro: `400`, `404`, `409` e `500`.

---

# ☁️ Deploy no Vercel

Criar o ficheiro `vercel.json` na raiz do projeto:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

Fazer deploy:

```bash
npm install -g vercel
vercel login
vercel
```

Entregar:

- link do repositório GitHub
- URL da API publicada

---

# 🧪 LAB — API Biblioteca Avançada

## Enunciado

Desenvolver uma API REST para gestão de uma biblioteca utilizando:

- Node.js
- Express
- Prisma ORM
- PostgreSQL

A aplicação deverá seguir arquitetura **MVC** e implementar as funcionalidades descritas abaixo.

---

## 1 — CRUD de Autores

Implementar:

- `GET /authors`
- `GET /authors/:id`
- `POST /authors`
- `PUT /authors/:id`
- `DELETE /authors/:id`

### Regras

- `name` é obrigatório
- se o autor não existir, devolver `404 Not Found`
- não permitir apagar um autor que tenha livros associados
- nesse caso, devolver `409 Conflict`

---

## 2 — CRUD de Livros

Implementar:

- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`

### Regras

- `title`, `year`, `genre` e `authorId` são obrigatórios
- `year` deve ser numérico
- `authorId` deve existir
- devolver `404 Not Found` se o livro não existir
- `DELETE` deverá devolver `204 No Content`

---

## 3 — Relações

Implementar:

- `GET /authors/:id/books`

Este endpoint deve listar todos os livros de um autor.

---

## 4 — Paginação

Modificar `GET /books` para suportar:

- `page`
- `limit`

Exemplo:

```bash
GET /books?page=1&limit=10
```

---

## 5 — Ordenação

Modificar `GET /books` para suportar:

- `sort=title`
- `sort=year`

---

## 6 — Pesquisa

Implementar:

```bash
GET /books/search?title=harry
```

Pesquisar livros por parte do título.

---

## 7 — Estatísticas

Implementar:

```bash
GET /stats
```

Este endpoint deve retornar:

- total de livros
- total de autores
- total de livros disponíveis
- total de livros indisponíveis

---

## 8 — Seed

Criar um seed com:

- pelo menos **5 autores**
- pelo menos **15 livros**

---

## 9 — Testes

Testar todos os endpoints no **Postman**.

---

## 10 — Deploy

Fazer deploy na **Vercel**.

---

# ⭐ Desafios Extra

## Desafio 1 — Incluir autor nos livros

No endpoint:

```bash
GET /books
```

retornar também os dados do autor.

Exemplo com Prisma:

```js
include: {
  author: true
}
```

---

## Desafio 2 — Detalhe de autor com livros

No endpoint:

```bash
GET /authors/:id
```

retornar:

- dados do autor
- lista dos seus livros

---

## Desafio 3 — Top autores

Criar endpoint:

```bash
GET /authors/top
```

Deve devolver os autores com maior número de livros.

---

## Desafio 4 — Estatísticas por género

Criar endpoint:

```bash
GET /stats/genres
```

Exemplo de resposta:

```json
{
  "fantasy": 4,
  "dystopian": 3,
  "satire": 2
}
```

---

## Desafio 5 — Transação Prisma

Criar endpoint:

```bash
POST /authors-with-books
```

Deve criar:

- 1 autor
- vários livros associados

numa única operação lógica.

---

# 📖 Glossário

| Termo | Definição |
|-------|-----------|
| **MVC** | Model-View-Controller — padrão de organização de código |
| **Controller** | Responsável por receber pedidos e devolver respostas |
| **Service** | Camada de lógica de negócio |
| **ORM** | Object-Relational Mapping |
| **Seed** | Script que insere dados iniciais na base de dados |
| **Paginação** | Divisão de resultados em páginas |
| **Ordenação** | Organização dos dados por um campo |
| **Query** | Parâmetros enviados na URL |
| **Prisma** | ORM moderno para Node.js |
| **PostgreSQL** | Base de dados relacional |

---

# 🔗 Recursos Úteis

| Recurso | Link |
|---------|------|
| Documentação Node.js | https://nodejs.org/docs/latest/api/ |
| Documentação Express | https://expressjs.com/ |
| Prisma Docs | https://www.prisma.io/docs |
| PostgreSQL Docs | https://www.postgresql.org/docs/ |
| Postman Learning | https://learning.postman.com/ |
| Vercel Docs | https://vercel.com/docs |
| HTTP Status Codes | https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status |
| MDN Web Docs | https://developer.mozilla.org/pt-BR/ |

---

# 🎯 Entrega

Cada grupo/aluno deverá entregar:

- repositório GitHub
- ficheiro `README.md` devidamente preenchido
- coleção do Postman
- URL da API publicada na Vercel

---

# ✅ Fim

Bom trabalho e boa implementação 🚀
