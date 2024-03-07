const Auth = require('../middlewares/Auth');
const InjectDefaultViewData = require('../middlewares/InjectDefaultViewData');
const FacilitateRedirectBack = require('../middlewares/FacilitateRedirectBack');

class MiddlewareServiceProvider {
  constructor(app) {
    this.app = app;
  }

  register() {
    this.app.use('/admin', Auth);
    this.app.use(InjectDefaultViewData);
    this.app.use(FacilitateRedirectBack);
  }
}

module.exports = MiddlewareServiceProvider;