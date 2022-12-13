const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Post = require("../models/Home");
const Comment = require("../models/comments");
const Reply = require("../models/reply");
const { usuario } = require("../util/helpers/hbs/comparar");

exports.GetLogin = (req, res, next) => {
    res.render("login/login", {
        pageTitle: "Login",
        loginActive: true,
    });
}


let user3;

exports.PostLogin = (req, res, next) => {
    let Id;
    const username = req.body.Username;
    const password = req.body.Password;

    User.findOne({ where: { userName: username } })
        .then((user) => {
            if (!user) {
                req.flash("error_msg", "User is invalid");
                return res.redirect("/login")
            }
            const user2 = user.dataValues;
            user3 = user2;
            usuario(user3);

            bcrypt
                .compare(password, user.password)
                .then((result) => {
                    if (result) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);


                            res.redirect("/");

                        })
                    }
                    req.flash("error_msg", "password is invalid");
                    res.redirect("/login")
                })
                .catch((err) => {
                    console.log(err);
                    req.flash("error_msg", "OOPs!! something went wrong with the server");
                    return res.redirect("/login")
                })
        })
        .catch((err) => {
            console.log(err);
            req.flash("error_msg", "OOPs!! something went wrong with the server")
            return res.redirect("/login")
        });



}

exports.GetSignUp = (req, res, next) => {
    res.render("login/signup", {
        pageTitle: "Login",
        loginActive: true,
    });
}
exports.LogOut = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/login");
    });

    // req.session.destroy(function(err){
    //     if(err){
    //        console.log(err);
    //     }else{
    //         req.end();
    //         res.redirect('/login');
    //     }
    //  });

}

exports.GetSignUp = (req, res, next) => {
    res.render("login/signup", {
        pageTitle: "Sign Up",
        loginActive: true,
    });
}
exports.PostSignUp = (req, res, next) => {
    const name = req.body.Name;
    const lastname = req.body.LastName;
    const username = req.body.Username;
    const profilePicture = req.file;
    const phone = req.body.Tel;
    const email = req.body.Email;
    const password = req.body.Password;
    const confirmPassword = req.body.confirmPassword;

    console.log(profilePicture);
    if (password !== confirmPassword) {
        req.flash("error_msg", "password is not the same");
        return res.redirect("/signup");
    }

    User.findOne({ where: { email: email } })
        .then((user) => {
            if (user) {
                req.flash("error_msg", "This Email is in use");
                return res.redirect("/signup")
            }
            bcrypt
                .hash(password, 12)
                .then((hashedPassword) => {

                    User.create({
                        name: name,
                        lastName: lastname,
                        userName: username,
                        profilePicture: "/" + profilePicture.path,
                        phone: phone,
                        email: email,
                        password: hashedPassword,
                        confirmPassword: hashedPassword,
                    }).then((result) => {
                        res.redirect("/login");
                    }).catch((err) => {
                        console.log(err);
                        req.flash("error_msg", "OOPs!! something went wrong with the server")
                        return res.redirect("/signup")
                    })
                })
                .catch((err) => {
                    console.log(err);
                    req.flash("error_msg", "OOPs!! something went wrong with the server")
                    return res.redirect("/signup")
                })
        })
        .catch((err) => {
            console.log(err);
            req.flash("error_msg", "OOPs!! something went wrong with the server")
            return res.redirect("/signup")
        })
}

exports.GetReset = (req, res, next) => {
    res.render("login/reset", {
        pageTitle: "Reset Account",
        loginActive: true,
    });
}
exports.PostReset = (req, res, next) => {
    return res.redirect("/login")
}