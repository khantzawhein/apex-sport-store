const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const EditCustomerRequest = require('../requests/EditCustomerRequest');

class CustomerController {
  async index(req, res) {
    const customers = await prisma.customers.findMany();
    res.render('admin/customers/index', {
      title: 'Customers',
      customers
    });
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await prisma.customers.findUniqueOrThrow({
        where: {
          id: parseInt(id)
        }
      });
      res.render('admin/customers/edit', {
        title: 'Edit Customer',
        customer
      });
    } catch (error) {
      req.session.flash = { error: 'Customer not found' };
      req.session.save(() => res.redirect('/admin/customers'));
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    await prisma.customers.delete({
      where: {
        id: parseInt(id)
      }
    });
    req.session.flash = { success: 'Customer deleted successfully' };
    req.session.save(() => res.redirect('/admin/customers'));
  }

  async update(req, res, next) {
    const { id } = req.params;
    const value = await new EditCustomerRequest(req).validate(req.body, next);
    if (!value) return;
    await prisma.customers.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name: value.name,
        email: value.email,
        phone: value.phone,
        address: value.address
      }
    });
    req.session.flash = { success: 'Customer updated successfully' };
    req.session.save(() => res.redirect('/admin/customers'));
  }
}

module.exports = new CustomerController();
