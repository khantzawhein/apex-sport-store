class HelloController {
  constructor() {}
  index(req, res, next) {
    res.render("index", { title: "Express" });
  }
  dashboard(req, res, next) {
    res.render("admin/dashboard", { title: "Express" });
  }
  category(req, res, next) {
    res.render("admin/category", { title: "Express" });
  }
}

module.exports = new HelloController();
