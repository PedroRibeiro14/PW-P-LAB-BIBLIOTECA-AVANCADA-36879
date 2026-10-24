const prisma = require("../prisma/prismaClient");

const getAll = ({ page = 1, limit = 10, sort } = {}) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);
  const orderBy = sort ? { [sort]: "asc" } : undefined;
  return prisma.book.findMany({ skip, take, orderBy, include: { author: true } });
};

const getById = (id) => prisma.book.findUnique({ where: { id }, include: { author: true } });

const search = (title) =>
  prisma.book.findMany({
    where: { title: { contains: title, mode: "insensitive" } },
    include: { author: true },
  });

const create = async ({ title, year, genre, authorId, available }) => {
  if (!title || !year || !genre || !authorId) throw { status: 400, message: "Campos obrigatórios em falta" };
  if (isNaN(year)) throw { status: 400, message: "O campo year deve ser numérico" };
  const author = await prisma.author.findUnique({ where: { id: authorId } });
  if (!author) throw { status: 400, message: "O autor indicado não existe" };
  return prisma.book.create({ data: { title, year: parseInt(year), genre, authorId, available: available ?? true } });
};

const update = async (id, { title, year, genre, authorId, available }) => {
  if (authorId) {
    const author = await prisma.author.findUnique({ where: { id: authorId } });
    if (!author) throw { status: 400, message: "O autor indicado não existe" };
  }
  return prisma.book.update({ where: { id }, data: { title, year: year ? parseInt(year) : undefined, genre, authorId, available } });
};

const remove = (id) => prisma.book.delete({ where: { id } });

const getStats = async () => {
  const [totalBooks, totalAuthors, availableBooks, borrowedBooks] = await Promise.all([
    prisma.book.count(),
    prisma.author.count(),
    prisma.book.count({ where: { available: true } }),
    prisma.book.count({ where: { available: false } }),
  ]);
  return { totalBooks, totalAuthors, availableBooks, borrowedBooks };
};

const getStatsByGenre = async () => {
  const groups = await prisma.book.groupBy({ by: ["genre"], _count: { genre: true } });
  return groups.reduce((acc, g) => ({ ...acc, [g.genre]: g._count.genre }), {});
};

const getTopAuthors = () =>
  prisma.author.findMany({
    include: { _count: { select: { books: true } } },
    orderBy: { books: { _count: "desc" } },
  });

const createWithBooks = ({ name, nationality, birthYear, books }) =>
  prisma.$transaction(async (tx) => {
    const author = await tx.author.create({ data: { name, nationality, birthYear } });
    await tx.book.createMany({ data: books.map((b) => ({ ...b, authorId: author.id })) });
    return tx.author.findUnique({ where: { id: author.id }, include: { books: true } });
  });

module.exports = { getAll, getById, search, create, update, remove, getStats, getStatsByGenre, getTopAuthors, createWithBooks };
