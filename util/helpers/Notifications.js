const FriendRequest = require('../../models/friendRequest');

exports.CountNotifications = async (id) =>{
    const notifications = []
    await FriendRequest.findAll({where:{userSecondId:id}}).then(
        frq => {
            frq?frq.map(f=>notifications.push(f.dataValues)):""; 
        }
    )

    return notifications.length;
}