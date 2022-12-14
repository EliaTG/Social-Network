const FriendRequest = require('../models/friendRequest');
const Friends = require('../models/friends');

const counter = require('../util/helpers/Notifications');
const { result } = require("../util/helpers/hbs/comparar");



exports.GetNotifications = async(req,res,next) =>{
    const user = result();

    await FriendRequest.findAll({include:["friendRequestByMe","FriendRequestByOther"],where:{userSecondId:user.id}}).then(
        async (rq)=>{
            const request = [];
            await rq.map(re=>request.push(re.dataValues))

            console.log(request);

            const notification = await counter.CountNotifications(user.id).then(r=>{return r})
            res.render('client/notification/notification',{
                pageTitle:"Notifications",
                notificationActive:true,
                notifications: notification,
                hasNotifications:notification>0,
                user:user,
                request: request
            })
        }
    )
}

exports.PostDeleteRequest = (req,res,next) =>{
    const information = {
        id: Number(req.body.id)
    }

    FriendRequest.destroy({where:{id:information.id}}).then(()=>res.redirect('/notification')).catch(err=>console.log(err))
}

exports.PostAddFriends = (req,res,next) =>{

    const information = {
        id:Number(req.body.id),
        userSecondId:Number(req.body.userSecondId),
        userFirstId: Number(req.body.userFirstId)
    }

    Friends.create({
        userFirstId:information.userFirstId,
        userSecondId:information.userSecondId
    }).then(()=>{
        FriendRequest.destroy({where:{id:information.id}}).then(
            ()=>{
                res.redirect('/notification')
            }
        ).catch(e=>console.log(e))
    }).catch(e=>console.log(e))

}