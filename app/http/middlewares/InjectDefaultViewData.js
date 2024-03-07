async function handle(req, res, next) {
  res.locals.session = req.session;
  next();
}

module.exports = handle;

