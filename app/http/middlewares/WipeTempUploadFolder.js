const fs = require('fs-extra');
const path = require('path');

async function handle(req, res, next) {
  fs.emptydirSync(path.join(global.__basedir, 'storage', 'uploads'));
  next();
}

module.exports = handle;
