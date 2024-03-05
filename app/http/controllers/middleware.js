class middleware{
    constructor(){}

    async adminCheck(req, res, next) {
        return next();
        if (req.originalUrl.includes('admin') && !req.session.user) {
            return res.redirect("/login");
        }
        next();
    }
}

module.exports = new middleware();