class CategoryController {
    index(req, res) {
        res.render("admin/category", {title: "Express"});
    }
}

module.exports = new CategoryController();