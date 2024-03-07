const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class ProductController {
  async index(req, res, next) {
    const products = await prisma.products.findMany();
    res.render('admin/products/index', { title: 'Product List', products });
  }

  async create(req, res, next) {
    const categories = await prisma.categories.findMany();
    res.render('admin/products/create', {
      title: 'Create Product',
      categories
    });
  }

  store(req, res, next) {
    res.send('store');
  }

  edit(req, res, next) {
    res.render('admin/products/edit');
  }

  update(req, res, next) {
    res.send('update');
  }

  delete(req, res, next) {
    res.send('delete');
  }
}

module.exports = new ProductController();
