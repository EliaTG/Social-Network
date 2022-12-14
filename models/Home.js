const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Post = sequelize.define("post", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    content: {
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
    }
});

module.exports = Post;