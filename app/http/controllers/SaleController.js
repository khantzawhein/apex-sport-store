class SaleController {
  index(req, res) {
    res.render('admin/sales/index', {
      title: 'Sales'
    });
  }
}

module.exports = new SaleController();
