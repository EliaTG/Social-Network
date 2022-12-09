const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Reply = sequelize.define("reply", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    reply: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    image: {

        type: Sequelize.STRING,
        allowNull: true,

    }

});

module.exports = Reply;