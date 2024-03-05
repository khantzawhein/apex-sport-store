class adminController {
    constructor() {
    }

    admins(req, res, next) {
        res.render("admin/admins", { title: "Admins" });
    }
      admincreate(req, res, next) {
        res.render("admin/admincreate", { title: "Create Admin" });
    }
      adminedit(req, res, next) {
        res.render("admin/adminedit", { title: "Edit Admin" });
    }
}

module.exports = new adminController();