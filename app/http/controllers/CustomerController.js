class CustomerController {
  index(req, res) {
    res.render('admin/customers/index', {
      title: 'Customers'
    });
  }

  edit(req, res) {
    res.render('admin/admins/edit');
  }
}

module.exports = new CustomerController();
