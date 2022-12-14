const Sequelize = require("sequelize");

const database = require("../util/database");

const FriendRequest = database.define("friendRequest",{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    userFirstId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    userSecondId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

module.exports = FriendRequest;