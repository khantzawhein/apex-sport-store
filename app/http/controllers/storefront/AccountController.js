const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AccountController {
  async index(req, res, next) {
    const customer = req.session.customer;
    const sales = await prisma.sales.findMany({
      where: {
        customer_id: customer.id
      },
      include: {
        sale_items: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });
    res.render('storefront/account/index', { title: 'Your Account', sales });
  }
}

module.exports = new AccountController();
