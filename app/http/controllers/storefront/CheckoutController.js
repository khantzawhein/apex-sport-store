class CheckoutController {
  store(req, res, next) {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect('/cart');
    }
  }
}
module.exports = new CheckoutController();
