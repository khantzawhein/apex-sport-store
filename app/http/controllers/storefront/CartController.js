const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CartController {
  async index(req, res, next) {
    try {
      let cart = req.session.cart || [];
      const products = await prisma.products.findMany({
        where: {
          id: {
            in: cart.map((item) => item.product_id)
          }
        },
        include: {
          product_images: true
        }
      });
      let totalPrice = 0;
      cart = cart.map((item) => {
        item.product = products.find((p) => p.id === item.product_id);
        item.product.sale_price = item.product.promotional_price || item.product.price;
        totalPrice += item.product.sale_price * item.quantity;
        return item;
      });
      res.render('storefront/cart', {
        cart,
        totalPrice,
        title: 'Cart'
      });
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      let { product_id } = req.body;
      product_id = parseInt(product_id);
      if (!product_id) {
        return res.status(400).json({ message: 'Invalid request' });
      }
      const product = await prisma.products.findUnique({ where: { id: product_id } });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const cart = req.session.cart || [];
      const productObj = cart.find((item) => item.product_id === product_id);
      if (productObj) {
        productObj.quantity += 1;
      } else {
        cart.push({ product_id, quantity: 1 });
      }
      req.session.cart = cart;
      req.session.save(() => res.status(201).json(product));
    } catch (error) {
      next(error);
    }
  }

  update(req, res, next) {
    let { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    quantity = parseInt(quantity);

    let cart = req.session.cart || [];

    const productObj = cart.find((item) => item.product_id === parseInt(product_id));
    if (!productObj) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (quantity === 0) {
      cart = cart.filter((item) => item.product_id !== parseInt(product_id));
    } else if (productObj) {
      productObj.quantity = parseInt(quantity);
    }
    let totalPrice = 0;

    cart.forEach((item) => {
      const salePrice = item.product.promotional_price || item.product.price;
      totalPrice += salePrice * item.quantity;
    });

    req.session.cart = cart;
    req.session.save(() =>
      res.status(200).json({
        message: 'Cart updated',
        data: {
          total_price: totalPrice
        }
      })
    );
  }
}

module.exports = new CartController();
