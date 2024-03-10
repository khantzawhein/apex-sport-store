const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function handle(req, res, next) {
  res.locals.categoryTypes = await prisma.category_Types.findMany({
    include: {
      categories: true
    }
  });

  next();
}

module.exports = handle;
