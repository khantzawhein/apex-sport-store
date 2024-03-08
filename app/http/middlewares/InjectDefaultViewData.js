const { createHash } = require('crypto');

async function handle(req, res, next) {
  res.locals.session = req.session;
  res.locals.basePath = req.baseUrl + req.path;
  if (req.session.user) {
    const email = req.session.user?.email || '';
    res.locals.gravatar =
      'https://gravatar.com/avatar/' + createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
  }
  next();
}

module.exports = handle;
