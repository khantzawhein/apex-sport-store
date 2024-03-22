const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class InquiryController {
  async index(req, res) {
    const inquiries = await prisma.inquiries.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
    res.render('admin/inquiries/index', {
      title: 'Inquiries',
      inquiries
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    await prisma.inquiries.delete({
      where: {
        id: parseInt(id)
      }
    });
    req.session.flash = { success: 'Inquiry deleted successfully!' };
    req.session.save(() => res.redirect('/admin/inquiries'));
  }
}

module.exports = new InquiryController();
