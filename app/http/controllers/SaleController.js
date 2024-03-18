const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SaleController {
  async index(req, res) {
    const sales = await prisma.sales.findMany({
      orderBy: {
        created_at: 'desc'
      },
      include: {
        customer: true
      }
    });
    res.render('admin/sales/index', {
      title: 'Sales',
      sales
    });
  }

  async show(req, res) {
    try {
      const saleId = req.params.id;
      const sale = await prisma.sales.findUnique({
        where: {
          id: parseInt(saleId)
        },
        include: {
          customer: true,
          sale_items: {
            include: {
              product: {
                include: {
                  product_images: true
                }
              }
            }
          }
        }
      });
      res.render('admin/sales/show', {
        title: 'Sale Details',
        sale
      });
    } catch (error) {
      console.log(error);
      res.redirect('/admin/sales');
    }
  }
}

module.exports = new SaleController();
