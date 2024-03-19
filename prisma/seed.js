const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  const admin = await prisma.admin.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Admin',
      username: 'admin',
      password: bcrypt.hashSync('password', 10)
    }
  });

  const inquiry = await prisma.inquiries.create({
    data: {
      name: 'John Doe',
      email: 'kzh702@gmail.com',
      phone: '123-456-7890',
      message: 'Hello, I am interested in your product.'
    }
  });

  const categoryTypes = ['Shop', 'Brands', 'Accessories', 'Sportswear'];

  for (const type of categoryTypes) {
    await prisma.category_Types.create({
      data: {
        name: type,
        slug: type.replace(/\s/g, '-').toLowerCase()
      }
    });
  }

  console.log({ admin, inquiry, categoryTypes });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
