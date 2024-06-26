const Auth = require('../middlewares/Auth');
const InjectDefaultViewData = require('../middlewares/InjectDefaultViewData');
const FacilitateRedirectBack = require('../middlewares/FacilitateRedirectBack');
const WipeTempUploadFolder = require('../middlewares/WipeTempUploadFolder');
const InjectStoreFrontData = require('../middlewares/InjectStorefrontData');

class MiddlewareServiceProvider {
  constructor(app) {
    this.app = app;
  }

  register() {
    this.app.use('/admin', Auth);
    this.app.use(InjectDefaultViewData);
    this.app.get(/^[^.]*$/, FacilitateRedirectBack);
    this.app.use(WipeTempUploadFolder);
    this.app.use(/^(?!\/admin).*/, InjectStoreFrontData);
  }
}

module.exports = MiddlewareServiceProvider;
