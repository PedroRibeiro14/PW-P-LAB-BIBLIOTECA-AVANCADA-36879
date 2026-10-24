const service = require("../services/book.service");

const getAll = async (req, res, next) => {
  try {
    res.json(await service.getAll(req.query));
  } catch (e) { next(e); }
};

const getById = async (req, res, next) => {
  try {
    const book = await service.getById(req.params.id);
    if (!book) return res.status(404).json({ message: "Livro não encontrado" });
    res.json(book);
  } catch (e) { next(e); }
};

const search = async (req, res, next) => {
  try {
    res.json(await service.search(req.query.title || ""));
  } catch (e) { next(e); }
};

const create = async (req, res, next) => {
  try {
    res.status(201).json(await service.create(req.body));
  } catch (e) {
    if (e.status) return res.status(e.status).json({ message: e.message });
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const book = await service.getById(req.params.id);
    if (!book) return res.status(404).json({ message: "Livro não encontrado" });
    res.json(await service.update(req.params.id, req.body));
  } catch (e) {
    if (e.status) return res.status(e.status).json({ message: e.message });
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const book = await service.getById(req.params.id);
    if (!book) return res.status(404).json({ message: "Livro não encontrado" });
    await service.remove(req.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
};

const getStats = async (req, res, next) => {
  try {
    res.json(await service.getStats());
  } catch (e) { next(e); }
};

const getStatsByGenre = async (req, res, next) => {
  try {
    res.json(await service.getStatsByGenre());
  } catch (e) { next(e); }
};

const getTopAuthors = async (req, res, next) => {
  try {
    res.json(await service.getTopAuthors());
  } catch (e) { next(e); }
};

const createWithBooks = async (req, res, next) => {
  try {
    const { name, books } = req.body;
    if (!name || !books?.length) return res.status(400).json({ message: "name e books são obrigatórios" });
    res.status(201).json(await service.createWithBooks(req.body));
  } catch (e) { next(e); }
};

module.exports = { getAll, getById, search, create, update, remove, getStats, getStatsByGenre, getTopAuthors, createWithBooks };
