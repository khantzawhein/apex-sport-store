async function handle(req, res, next) {
    console.log(req.path, req.session.user)
    if ((req.path === "/login" || req.path === "/signup")) {
        if (req.session.user) {
            return res.redirect("/admin");
        }
        return next();
    }
    if (!req.session.user) {
        return res.redirect("/admin/login");
    }
    return next();
}

module.exports = handle;