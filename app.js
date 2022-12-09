const express = require("express");
const path = require("path")
const expressHbs = require("express-handlebars");
const { engine } = require("express-handlebars");
const sequelize = require("./util/database");

const User = require("./models/User");
const Post = require("./models/Home");
const Comment = require("./models/comments");
const Reply = require("./models/reply");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const comparador = require("./util/helpers/hbs/comparar");

const app = express();


const ErrorController = require("./controllers/ErrorController")


app.engine("hbs", expressHbs.engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: 'hbs',
    helpers: {

        IgualValor: comparador.IgualValor,

    },

}, ))
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/imgs", express.static(path.join(__dirname, "imgs")));

const imageStorage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "imgs");
    },
    filename: (req, file, cb) => {

        cb(null, `${uuidv4()}-${file.originalname}`);
    }
});

app.use(multer({ storage: imageStorage }).single("Image"));



const HomeRouter = require('./routes/HomeRouter');
const LoginRouter2 = require('./routes/LoginRouter')

app.use(LoginRouter2);
app.use(HomeRouter);

app.use(ErrorController.Get404);

// app.listen(5050, () => {
//     console.log('App listening to port', 5050);
// })

// Relations
Post.belongsTo(User, { constraint: true, onDelete: "CASCADE" });
User.hasMany(Post);

Comment.belongsTo(User, { constraint: true, onDelete: "CASCADE" });
User.hasMany(Comment);

Comment.belongsTo(Post, { constraint: true, onDelete: "CASCADE" });
Post.hasMany(Comment);

Reply.belongsTo(Comment, { constraint: true, onDelete: "CASCADE" });
Comment.hasMany(Reply);

Reply.belongsTo(User, { constraint: true, onDelete: "CASCADE" });
User.hasMany(Reply);

Reply.belongsTo(Post, { constraint: true, onDelete: "CASCADE" });
Post.hasMany(Reply);

sequelize.sync({ alter: false }).then(result => {
    app.listen(5052);
}).catch(err => {
    console.log(err);
})