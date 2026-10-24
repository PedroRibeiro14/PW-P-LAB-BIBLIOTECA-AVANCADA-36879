require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authorRoutes = require("./routes/author.routes");
const bookRoutes = require("./routes/book.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const bookCtrl = require("./controllers/book.controller");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.get("/stats", bookCtrl.getStats);
app.get("/stats/genres", bookCtrl.getStatsByGenre);
app.get("/authors/top", bookCtrl.getTopAuthors);
app.post("/authors-with-books", bookCtrl.createWithBooks);

app.use((req, res) => res.status(404).json({ message: "Rota não encontrada" }));
app.use(errorMiddleware);

const PORT = process.env.SERVER_PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`✅ Servidor a correr em http://localhost:${PORT}`));
}

module.exports = app;
