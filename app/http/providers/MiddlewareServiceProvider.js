const Auth = require('../middlewares/Auth');
const InjectDefaultViewData = require('../middlewares/InjectDefaultViewData');
const FacilitateRedirectBack = require('../middlewares/FacilitateRedirectBack');
const WipeTempUploadFolder = require('../middlewares/WipeTempUploadFolder');

class MiddlewareServiceProvider {
  constructor(app) {
    this.app = app;
  }

  register() {
    this.app.use('/admin', Auth);
    this.app.use(InjectDefaultViewData);
    this.app.get(/^[^.]*$/, FacilitateRedirectBack);
    this.app.use(WipeTempUploadFolder);
  }
}

module.exports = MiddlewareServiceProvider;
