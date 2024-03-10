const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const CategoryRequest = require('../requests/CategoryRequest');

class CategoryController {
  async index(req, res) {
    let categoryTypes = await prisma.category_Types.findMany();
    let categories = await prisma.categories.findMany({
      include: {
        category_type: true
      }
    });
    res.render('admin/categories/index', { title: 'Categories', categories, categoryTypes });
  }

  async store(req, res, next) {
    const data = await new CategoryRequest().validate(req.body, next);
    if (!data) return;
    const { categoryName } = data;
    const slug = categoryName.toLowerCase().split(' ').join('-');

    await prisma.categories.create({
      data: {
        name: categoryName,
        slug: slug,
        category_type: {
          connect: {
            id: parseInt(req.body.category_type)
          }
        }
      }
    });
    req.session.flash = { success: 'Category Created Successfully.' };
    req.session.save(() => {
      res.redirect('/admin/category');
    });
  }

  async edit(req, res, next) {
    let categoryTypes = await prisma.category_Types.findMany();
    const data = await prisma.categories.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    });
    if (data) {
      return res.render('admin/categories/edit', {
        title: 'Edit Category',
        category: data,
        categoryTypes
      });
    }
    return res.redirect('/admin/category');
  }

  async update(req, res, next) {
    const data = await new CategoryRequest().validate(req.body, next);
    if (!data) return;
    // find conditional logic categorStoredName and
    let { categoryName } = req.body;

    await prisma.categories.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        name: categoryName,
        slug: categoryName.toLowerCase().split(' ').join('-'),
        category_type: {
          connect: {
            id: parseInt(req.body.category_type)
          }
        }
      }
    });
    req.session.flash = { success: 'Category Updated Successfully.' };
    req.session.save(() => {
      res.redirect('/admin/category');
    });
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
