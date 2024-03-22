const { createHash } = require('crypto');
const ejsHelpers = require('../../helpers/ejs-helpers');

async function handle(req, res, next) {
  res.locals = { ...res.locals, ...ejsHelpers };
  res.locals.session = req.session;
  res.locals.basePath = req.baseUrl + req.path;
  next();
}

module.exports = handle;
