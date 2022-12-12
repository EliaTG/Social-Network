module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        req.flash("error_msg", "You are not authenticated");
        return res.redirect("/login")
    }
    next();
}