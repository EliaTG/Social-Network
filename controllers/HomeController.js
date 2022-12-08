const Post = require("../models/Home");
const User = require("../models/User");
const Comment = require("../models/comments");

exports.GetIndex = (req, res, next) => {

    Post.findAll({ include: [{ model: User }] }).then((result) => {

        const posts = result.map((result) => result.dataValues);

        Comment.findAll({ include: [{ model: User }] }).then((result) => {

            const comment= result.map((result)=> result.dataValues);

        res.render("client/index", {
            pageTitle: "Home",
            homeActive: true,
            post: posts,
            hasPosts: posts.length > 0,
            comment: comment,
            hasComments: comment.length>0
        });


    }).catch((err) => {
        console.log(err);
    });

    }).catch((err) => {
        console.log(err);
    });;
};

exports.PostContent = (req, res, next) => {

    const content = req.body.Content;
    const Image = req.file;

    console.log(content);


    Post.create({

        content: content,
        image: "/",
        UserId: 1

    }).then((result) => {

        res.redirect("/");

    }).catch((err) => {
        console.log(err);
    });
};

exports.PostComment = (req, res, next) => {

    const comment = req.body.Comment;
    const Image = req.file;

    console.log(comment);

    Comment.create({

        comment: comment,
        image: "/",
        userId: 1

    }).then((result) => {

        res.redirect("/");

    }).catch((err) => {
        console.log(err);
    });
};