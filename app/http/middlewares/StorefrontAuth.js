async function handle(req, res, next) {
  if (req.originalUrl === '/login') {
    if (req.session.customer) {
      return res.redirect('/');
    }
    return next();
  }
  if (!req.session.customer) {
    return res.redirect('/login');
  }
  return next();
}

module.exports = handle;
