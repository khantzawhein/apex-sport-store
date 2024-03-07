class DashboardController {
  dashboard(req, res, next) {
    res.render('admin/dashboard', { title: 'Dashboard' });
  }
}

module.exports = new DashboardController();