const prisma = require("../prisma/prismaClient");

const getAll = () => prisma.author.findMany();

const getById = (id) => prisma.author.findUnique({ where: { id } });

const getBooks = (id) => prisma.book.findMany({ where: { authorId: id } });

const create = (data) => prisma.author.create({ data });

const update = (id, data) => prisma.author.update({ where: { id }, data });

const remove = async (id) => {
  const count = await prisma.book.count({ where: { authorId: id } });
  if (count > 0) throw { status: 409, message: "Não é possível apagar um autor com livros associados" };
  return prisma.author.delete({ where: { id } });
};

module.exports = { getAll, getById, getBooks, create, update, remove };
