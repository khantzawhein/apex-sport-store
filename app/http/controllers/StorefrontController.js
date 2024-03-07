class StorefrontController {
  index(req, res) {
    res.render('storefront/index');
  }
}

module.exports = new StorefrontController();