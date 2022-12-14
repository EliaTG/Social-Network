const Sequelize = require("sequelize")

const sequelize = new Sequelize("besocial", "root", "Hillary", {
    dialect: "mysql",
    host: "localhost",
    port: 3308,
});

module.exports = sequelize;