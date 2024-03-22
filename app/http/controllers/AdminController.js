const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AdminController {
  async index(req, res) {
    const admins = await prisma.admin.findMany();
    res.render('admin/admins/index', {
      title: 'Admins',
      admins
    });
  }

  create(req, res) {
    res.render('admin/admins/create');
  }

  edit(req, res) {
    res.render('admin/admins/edit');
  }

  async delete(req, res) {
    const { id } = req.params;
    await prisma.admin.delete({
      where: {
        id: parseInt(id)
      }
    });
    req.session.flash = { success: 'Admin deleted successfully' };

    req.session.save(() => {
      res.redirect('/admin/admins');
    });
  }
}

module.exports = new AdminController();
