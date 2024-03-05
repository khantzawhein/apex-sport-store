class middleware{
    constructor(){}

    async adminCheck(req, res, next) {
        // console.log(req.originalUrl);
        if (req.originalUrl.includes('admin') && !req.session.user) {
            return res.redirect("/login");
        }
        next();
    }
}

module.exports = new middleware();