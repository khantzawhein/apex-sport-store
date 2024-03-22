const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class DashboardController {
  async dashboard(req, res, next) {
    const productCount = await prisma.products.count();
    const categoryCount = await prisma.categories.count();
    const inquiryCount = await prisma.inquiries.count();
    const saleCount = await prisma.sales.count();
    res.render('admin/dashboard', { title: 'Dashboard', productCount, categoryCount, inquiryCount, saleCount });
  }
}

module.exports = new DashboardController();
