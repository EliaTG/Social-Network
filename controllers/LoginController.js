const Login = require("../models/User");


exports.GetLogin = (req, res, next) => {


    res.render("login/login", {
        pageTitle: "Login"


    })
};