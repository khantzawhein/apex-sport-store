class HelloController {
  constructor() {}
  index(req, res, next) {
    res.render("index", { title: "Express" });
  }
  login(req, res, next) {
    res.render("admin/login", { title: "Login" });
  }
  signup(req, res, next) {
    res.render("admin/signup", { title: "Sign Up" });
  }
  dashboard(req, res, next) {
    res.render("admin/dashboard", { title: "Dashboard" });
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
  category(req, res, next) {
    res.render("admin/category", { title: "Express" });
  }
  testing(req, res, next) {
    res.render("admin/testing", { title: "Express" });
  }
}

module.exports = new HelloController();
