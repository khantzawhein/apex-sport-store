const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoryController {
  async index(req, res) {
    let categories = await prisma.categories.findMany();
    res.render('admin/categories/index', { categories });
  }

  async store(req, res, next) {
    const { categoryName } = req.body;
    const slug = categoryName.toLowerCase().split(' ').join('-');

    await prisma.categories.create({
      data: {
        name: categoryName,
        slug: slug
      }
    });
    res.redirect('/admin/category');
  }

  async edit(req, res, next) {
    console.log(req.params.id);
    await prisma.categories.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    }).then((category) => {

      res.render('admin/categories/edit', { category });
    });
  }

  async update(req, res, next) {
    // find conditional logic categorStoredName and
    let { categoryEditName } = req.body;

    await prisma.categories.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        name: categoryEditName,
        slug: categoryEditName.toLowerCase().split(' ').join('-')
      }
    });
    res.redirect('/admin/category');
  }

  async delete(req, res, next) {
    await prisma.categories.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });
    req.session.flash = { success: 'Category Deleted Successfully' };
    req.session.save(() => {
      res.redirect('/admin/category');
    });
  }
}

module.exports = new CategoryController();