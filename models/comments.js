const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Comment = sequelize.define("comments", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    image: {

        type: Sequelize.STRING,
        allowNull: true,

    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Comment;