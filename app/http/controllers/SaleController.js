const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SaleController {
  async index(req, res) {
    const sales = await prisma.sales.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
    res.render('admin/sales/index', {
      title: 'Sales',
      sales
    });
  }
}

module.exports = new SaleController();
