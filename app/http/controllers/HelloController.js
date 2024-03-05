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
}

module.exports = new HelloController();
 