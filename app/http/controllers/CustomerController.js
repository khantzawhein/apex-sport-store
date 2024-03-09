const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CustomerController {
  async index(req, res) {
    const customers = await prisma.customers.findMany();
    res.render('admin/customers/index', {
      title: 'Customers',
      customers
    });
  }

  edit(req, res) {
    res.render('admin/admins/edit');
  }
}

module.exports = new CustomerController();
