const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const Users = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    profilePicture: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    confirmPassword: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    UserActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
});
// Users.beforeCreate(userName, Options => {
//     const salt = bcrypt.genSaltSync();
//     userName.password = bcrypt.hashSync(userName.password, salt);
// })

// Users.prototype.validPassword = function(password){
//     return bcrypt.compareSync(password, this.password);
// }
// // 
// sequelize.sync()
//     .then(() => console.log('user tables has been successfully created if one does not exist'))
//     .catch(error => console.log('This error ocurred', error));


module.exports = Users;