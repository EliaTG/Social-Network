const Friend = require('../models/friends');
const FriendRequest = require('../models/friendRequest');
const User = require('../models/User');
const Comment = require("../models/comments");
const Reply = require("../models/reply");
const counter = require('../util/helpers/Notifications');
const { Op } = require("sequelize");

const { result } = require('../util/helpers/hbs/comparar')
exports.GetFriends = (req, res, next) => {
    const user = result();

    Friend.findAll({
        where: {
            [Op.or]: [{ userSecondId: user.id }, { userFirstId: user.id }]
        },
        include: { all: true, nested: true }
    }).then(async(f) => {

        const friendsByOther = [];
        const friendsByMe = [];
        const post = [];
        await f.filter(f => f.userFirstId != user.id && f.userSecondId == user.id).map((f) => {
            friendsByOther.push(f.dataValues);
            f.dataValues.friendByMe.dataValues.posts.length > 0 ? f.dataValues.friendByMe.dataValues.posts.map(p => post.push({...p.dataValues, user: f.dataValues.friendByMe.dataValues })) : '';
        });
        await f.filter(f => f.userFirstId == user.id && f.userSecondId != user.id).map((g) => {
            friendsByMe.push(g.dataValues);
            g.dataValues.FriendByOther.dataValues.posts.length > 0 ? g.dataValues.FriendByOther.dataValues.posts.map(p => post.push({...p.dataValues, user: g.dataValues.FriendByOther.dataValues })) : '';
        });
        const notification = await counter.CountNotifications(user.id).then(r => { return r })

        Comment.findAll({ include: [{ model: User }] }).then((result) => {
            const comment = result.map((result) => result.dataValues);

            Reply.findAll({ include: [{ model: User }] }).then((result) => {

                const reply = result.map((result) => result.dataValues);

                res.render('client/friends/index', {
                    pageTitle: "Friends",
                    friendsActive: true,
                    notifications: notification,
                    hasNotifications: notification > 0,
                    user: user,
                    comment: comment,
                    reply: reply,
                    friendByMe: friendsByMe,
                    hasFriendsByMe: friendsByMe.length > 0,
                    friendByOther: friendsByOther,
                    hasFriendsByOther: friendsByOther.length > 0,
                    posts: post.sort(x => x.createdAt),
                    hasPosts: post.length > 0
                })
            });
        });
    });
}

exports.getAddFriends = async(req, res, next) => {

    const user = result();
    if (!user) return res.redirect('/login');
    const notification = await counter.CountNotifications(user.id).then(r => { return r });

    res.render('client/friends/add', {
        pageTitle: "Agregar Amigos",
        notifications: notification,
        hasNotifications: notification > 0,
        friendsActive: true,
        user: user,
        hasError: false,
        errorMessage: ''
    })
}

exports.PostAddFriends = async(req, res, next) => {
    const user = req.session;
    console.log(user);
    if (!user) return res.redirect('/login');
    const notification = await counter.CountNotifications(user.id).then(r => { return r });

    const information = {
        userId: user.user.id,
        username: req.body.username
    }

    if (user.user.userName == information.username) {
        return res.render('client/friends/add', {
            pageTitle: "Agregar Amigos",
            notifications: notification,
            hasNotifications: notification > 0,
            friendsActive: true,
            user: user.user,
            hasError: true,
            errorMessage: 'No te puesdes agregar a ti mismo'
        });
    }

    User.findOne({ where: { userName: information.username } }).then(
        (r) =>
        !r ? res.render('client/friends/add', {
            pageTitle: "Agregar Amigos",
            notifications: notification,
            hasNotifications: notification > 0,
            friendsActive: true,
            user: user.user,
            hasError: true,
            errorMessage: 'Este usuario no existe'
        }) : Friend.findAll({
            where: {
                [Op.or]: { userFirstId: information.userId, userSecondId: information.userId },
            }
        }).then((f) => {
            console.log(r);
            const dataFiltrada = f.filter(x => x.dataValues.userFirstId == Number(information.userId) && x.dataValues.userSecondId == r.dataValues.id)
            const datafiltradaSegundaria = f.filter(x => x.dataValues.userFirstId == r.dataValues.id && x.dataValues.userSecondId == Number(information.userId))
            if (dataFiltrada.length > 0 || datafiltradaSegundaria.length > 0) return res.render('client/friends/add', {
                pageTitle: "Agregar Amigos",
                notifications: notification,
                hasNotifications: notification > 0,
                friendsActive: true,
                user: user.user,
                hasError: true,
                errorMessage: 'TU y este usuario son amigos'

            });

            FriendRequest.findAll({
                where: {
                    [Op.or]: { userFirstId: information.userId, userSecondId: information.userId }
                }
            }).then((fr) => {
                const filtro = fr.filter(x => x.dataValues.userFirstId == Number(information.userId) && x.dataValues.userSecondId == r.dataValues.id)
                const filtroSegundario = fr.filter(x => x.dataValues.userFirstId == r.dataValues.id && x.dataValues.userSecondId == Number(information.userId))
                if (filtro.length > 0 || filtroSegundario.length > 0) {
                    return res.render('client/friends/add', {
                        pageTitle: "Agregar Amigos",
                        notifications: notification,
                        hasNotifications: notification > 0,
                        friendsActive: true,
                        user: user.user,
                        hasError: true,
                        errorMessage: 'Ya enviaste la solicitud a este usuario'
                    })
                }

                FriendRequest.create({
                    userFirstId: Number(information.userId),
                    userSecondId: r.dataValues.id
                }).then(() =>
                    res.redirect('/friends')
                )
            })
        })
    )
}
exports.DeleteFriends = (req, res, next) => {
    const information = { id: req.body.id };

    Friend.destroy({ where: { id: information.id } }).then(() => {
        res.redirect('/friends');
    }).catch(e => console.log(e));
}