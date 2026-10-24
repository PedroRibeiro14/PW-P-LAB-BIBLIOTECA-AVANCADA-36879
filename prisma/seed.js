require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("neon.tech") ? { rejectUnauthorized: false } : false,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const [orwell, rowling, tolkien, kafka, dostoevsky] = await Promise.all([
    prisma.author.create({ data: { name: "George Orwell", nationality: "British", birthYear: 1903 } }),
    prisma.author.create({ data: { name: "J.K. Rowling", nationality: "British", birthYear: 1965 } }),
    prisma.author.create({ data: { name: "J.R.R. Tolkien", nationality: "British", birthYear: 1892 } }),
    prisma.author.create({ data: { name: "Franz Kafka", nationality: "Czech", birthYear: 1883 } }),
    prisma.author.create({ data: { name: "Fyodor Dostoevsky", nationality: "Russian", birthYear: 1821 } }),
  ]);

  await prisma.book.createMany({
    data: [
      { title: "1984", year: 1949, genre: "dystopian", available: true, authorId: orwell.id },
      { title: "Animal Farm", year: 1945, genre: "satire", available: true, authorId: orwell.id },
      { title: "Homage to Catalonia", year: 1938, genre: "memoir", available: false, authorId: orwell.id },
      { title: "Harry Potter and the Philosopher's Stone", year: 1997, genre: "fantasy", available: true, authorId: rowling.id },
      { title: "Harry Potter and the Chamber of Secrets", year: 1998, genre: "fantasy", available: true, authorId: rowling.id },
      { title: "Harry Potter and the Prisoner of Azkaban", year: 1999, genre: "fantasy", available: false, authorId: rowling.id },
      { title: "The Hobbit", year: 1937, genre: "fantasy", available: true, authorId: tolkien.id },
      { title: "The Lord of the Rings", year: 1954, genre: "fantasy", available: true, authorId: tolkien.id },
      { title: "The Silmarillion", year: 1977, genre: "fantasy", available: false, authorId: tolkien.id },
      { title: "The Metamorphosis", year: 1915, genre: "fiction", available: true, authorId: kafka.id },
      { title: "The Trial", year: 1925, genre: "fiction", available: true, authorId: kafka.id },
      { title: "The Castle", year: 1926, genre: "fiction", available: false, authorId: kafka.id },
      { title: "Crime and Punishment", year: 1866, genre: "fiction", available: true, authorId: dostoevsky.id },
      { title: "The Idiot", year: 1869, genre: "fiction", available: true, authorId: dostoevsky.id },
      { title: "The Brothers Karamazov", year: 1880, genre: "fiction", available: false, authorId: dostoevsky.id },
    ],
  });

  console.log("✅ Seed executado com sucesso");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
