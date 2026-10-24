const service = require("../services/author.service");

const getAll = async (req, res, next) => {
  try {
    res.json(await service.getAll());
  } catch (e) { next(e); }
};

const getById = async (req, res, next) => {
  try {
    const author = await service.getById(req.params.id);
    if (!author) return res.status(404).json({ message: "Autor não encontrado" });
    res.json(author);
  } catch (e) { next(e); }
};

const getBooks = async (req, res, next) => {
  try {
    const author = await service.getById(req.params.id);
    if (!author) return res.status(404).json({ message: "Autor não encontrado" });
    res.json(await service.getBooks(req.params.id));
  } catch (e) { next(e); }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "O campo name é obrigatório" });
    res.status(201).json(await service.create(req.body));
  } catch (e) { next(e); }
};

const update = async (req, res, next) => {
  try {
    const author = await service.getById(req.params.id);
    if (!author) return res.status(404).json({ message: "Autor não encontrado" });
    res.json(await service.update(req.params.id, req.body));
  } catch (e) { next(e); }
};

const remove = async (req, res, next) => {
  try {
    const author = await service.getById(req.params.id);
    if (!author) return res.status(404).json({ message: "Autor não encontrado" });
    await service.remove(req.params.id);
    res.status(204).send();
  } catch (e) {
    if (e.status) return res.status(e.status).json({ message: e.message });
    next(e);
  }
};

module.exports = { getAll, getById, getBooks, create, update, remove };
