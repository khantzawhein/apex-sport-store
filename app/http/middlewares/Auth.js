async function handle(req, res, next) {
  if (req.path === '/login') {
    if (req.session.user) {
      return res.redirect('/admin');
    }
  } else if (!req.session.user) {
    return res.redirect('/admin/login');
  }
  return next();
}

module.exports = handle;
