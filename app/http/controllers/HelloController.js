class HelloController {
  constructor() {}
  testing(req, res, next) {
    res.render("admin/testing", { title: "Express" });
  }
}

module.exports = new HelloController();
 