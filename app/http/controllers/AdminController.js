class AdminController {
  index(req, res) {
    res.render('admin/admins/index', {
      title: 'Admins'
    });
  }

  create(req, res) {
    res.render('admin/admins/create');
  }

  edit(req, res) {
    res.render('admin/admins/edit');
  }
}

module.exports = new AdminController();
