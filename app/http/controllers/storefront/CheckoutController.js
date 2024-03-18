const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CheckoutController {
  async store(req, res, next) {
    let cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect('/cart');
    }

    const products = await prisma.products.findMany({
      where: {
        id: {
          in: cart.map((item) => item.product_id)
        }
      }
    });

    cart = cart.filter(async (item) => {
      const product = products.find((p) => p.id === item.product_id);
      return product && item.quantity > 0;
    });

    const total_items = cart.reduce((acc, item) => acc + item.quantity, 0);
    const total_price = cart.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.product_id);
      const salePrice = product.promotional_price || product.price;
      return acc + salePrice * item.quantity;
    }, 0);

    const saleItems = cart.map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      const salePrice = product.promotional_price || product.price;
      return {
        product_id: product.id,
        quantity: item.quantity,
        unit_price: salePrice,
        total_price: salePrice * item.quantity
      };
    });

    await prisma.sales.create({
      data: {
        total_items,
        total_price,
        customer: {
          connect: {
            id: req.session.customer.id
          }
        },
        sale_items: {
          createMany: {
            data: saleItems
          }
        }
      }
    });

    for (const item of cart) {
      await prisma.products.update({
        where: {
          id: item.product_id
        },
        data: {
          sales_count: {
            increment: item.quantity
          }
        }
      });
    }

    req.session.cart = [];
    req.session.save(() => {
      res.redirect('/thank-you');
    });
  }
}

module.exports = new CheckoutController();
