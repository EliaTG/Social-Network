const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Users = sequelize.define("user",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    profilePicture:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    userName:{
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    UserActive:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
});

module.exports = Users;