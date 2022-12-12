// const Home = require("../models/Home")


exports.GetIndex = (req, res, next) => {
        res.render("client/index", {
            pageTitle: "Home",
            homeActive: true,
        })
}