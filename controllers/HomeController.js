const Post = require("../models/Home");
const User = require("../models/User");
const Comment = require("../models/comments");
const Reply = require("../models/reply");

exports.GetIndex = (req, res, next) => {

    Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{ model: User }]
    }).then((result) => {

        const posts = result.map((result) => result.dataValues);

        Comment.findAll({ include: [{ model: User }] }).then((result) => {

            const comment = result.map((result) => result.dataValues);

            Reply.findAll({ include: [{ model: User }] }).then((result) => {

                const reply = result.map((result) => result.dataValues);

                User.findAll().then((result) => {


                    res.render("client/index", {
                        pageTitle: "Home",
                        homeActive: true,
                        post: posts,
                        hasPosts: posts.length > 0,
                        comment: comment,
                        hasComments: comment.length > 0,
                        reply: reply
                    });


                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });;
        }).catch((err) => {
            console.log(err);
        });;

    });

};

exports.PostContent = (req, res, next) => {

    const content = req.body.Content;
    const Image = req.file;

    console.log(Image);

    if (Image == undefined || null || "") {


        Post.create({

            content: content,

            image: "/",
            UserId: 1

        }).then((result) => {

            res.redirect("/");

        }).catch((err) => {
            console.log(err);
        });

    } else {

        Post.create({

            content: content,

            image: "/" + Image.path,
            UserId: 1

        }).then((result) => {

            res.redirect("/");

        }).catch((err) => {
            console.log(err);
        });



    }

};

exports.PostComment = (req, res, next) => {

    const postId = req.body.postId;
    const comment = req.body.Comment;
    const Image = req.file;

    const userId = req.body.userId;

    console.log(comment);

    Comment.create({

        comment: comment,
        image: "/",
        userId: 2,
        postId: postId

    }).then((result) => {

        res.redirect("/");

    }).catch((err) => {
        console.log(err);
    });
};


exports.PostReply = (req, res, next) => {

    const postId = req.body.postId;
    const reply = req.body.Reply;
    const commentId = req.body.commentId;
    const Image = req.file;

    console.log(reply);

    Reply.create({

        commentId: commentId,
        reply: reply,
        image: "/",
        userId: 2,
        postId: postId

    }).then((result) => {

        res.redirect("/");

    }).catch((err) => {
        console.log(err);
    });
};

exports.PostDeletePost = (req, res, next) => {
    const postId = req.body.postId;

    Post.destroy({ where: { id: postId } })
        .then((result) => {
            return res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
};



exports.GetEditPost = (req, res, next) => {
    const edit = req.query.edit;
    const postId = req.params.postId;

    Post.findOne({ where: { id: postId } })
        .then((result) => {
            const post = result.dataValues;


            res.render("client/index", {
                pageTitle: "Editar Post",
                editMode: edit,
                post: post,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.PostEditPost = (req, res, next) => {
    const content = req.body.Content;
    const image = req.file;
    const postId = req.body.postId;
    const userId = req.body.userId;

    console.log(image);

    Post.findOne({ where: { id: postId } })
        .then((result) => {

            const post = result.dataValues;


            if (image == undefined) {
                let imagePath = "";


                Post.update({ content: content, image: imagePath, userId: 1 }, { where: { id: postId } })
                    .then((result) => {
                        return res.redirect("/");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                let imagePath = "/" + image.path;

                Post.update({ content: content, image: imagePath, userId: 1 }, { where: { id: postId } })
                    .then((result) => {
                        return res.redirect("/");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }


        }).catch((err) => {
            console.log(err);
        });
};