const Auth = require('../middlewares/Auth');
const InjectDefaultViewData = require('../middlewares/InjectDefaultViewData');

class MiddlewareServiceProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
        this.app.use("/admin", Auth)
        this.app.use(InjectDefaultViewData)
    }
}

module.exports = MiddlewareServiceProvider;