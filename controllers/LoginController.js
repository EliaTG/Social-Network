const User = require("../models/User");
const bcrypt = require("bcryptjs");
// const flash = require('connect-flash');

// Passport configuration
const passportConfig = require('../util/passport');
const passport = require('passport');
const { session } = require("passport");
// passportConfig(passport);
// app.use(passport.initialize());
// app.use(passport.session())




exports.GetLogin = (req, res, next) => {
    res.render("login/login", {
        pageTitle: "Login",
        loginActive: true,
    })
}
// exports.PostLogin = (req, res, next) => {
//     // const Username = req.body.Username;
//     // const Password = req.body.Password;
    
//     res.render("login/login", {
//         pageTitle: "Login",
//         loginActive: true,
//     })
    
// }
exports.PostLogin = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    session: false,

})

exports.GetSignUp = (req, res, next) => {
    res.render("login/signup", {
        pageTitle: "Sign Up",
        loginActive: true,
    })

}

exports.PostSignUp = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    session: false,
    // failureFlash: true,


    //  const name = req.body.Name;
    //  const lastname = req.body.LastName;
    //  const email = req.body.Email;
    //  const tel = req.body.Tel;
    //  const username = req.body.Username;
    //  const password = req.body.Password;
    //  const cpassword = req.body.confirmPassword;
})



exports.LogOut = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}
