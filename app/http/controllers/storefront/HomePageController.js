const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class HomePageController {
  async index(req, res, next) {
    const productFilter = {
      orderBy: {
        created_at: 'desc'
      },
      include: {
        product_images: {
          select: {
            image_path: true
          }
        }
      }
    };
    const newProducts = await prisma.products.findMany({
      where: {
        is_new_product: true
      },
      ...productFilter
    });

    const featuredProducts = await prisma.products.findMany({
      where: {
        is_featured_product: true
      },
      ...productFilter
    });
    res.render('storefront/index', { newProducts, featuredProducts, title: 'Home' });
  }
}

module.exports = new HomePageController();
