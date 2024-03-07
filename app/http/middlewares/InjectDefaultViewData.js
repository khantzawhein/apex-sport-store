async function handle(req, res, next) {
  res.locals.session = req.session;
  res.locals.basePath = req.baseUrl + req.path;
  next();
}

module.exports = handle;
