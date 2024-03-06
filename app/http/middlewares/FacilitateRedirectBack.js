async function handle(req, res, next) {
    req.session.last_url = req.originalUrl;
    return next();
}

module.exports = handle;