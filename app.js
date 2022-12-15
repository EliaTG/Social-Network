const express = require("express");
const path = require("path")
const expressHbs = require("express-handlebars");
const { engine } = require("express-handlebars");
const sequelize = require("./util/database");
const session = require("express-session");
const flash = require('connect-flash');
const User = require("./models/User");
const Post = require("./models/Home");
const Comment = require("./models/comments");
const Reply = require("./models/reply");
const FriendRequest = require('./models/friendRequest');
const Friend = require('./models/friends');
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
        Usuario: comparador.usuario,
        Result: comparador.result

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

app.use(session({
    secret: "besocialNetwork",
    saveUninitialized: false,
    resave: false,
}))
app.use(flash());

//Global variable
app.use((req, res, next) => {
    const errors = req.flash("error_msg");

    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.errorsMessages = errors;
    res.locals.HasErrorMessages = errors.length > 0;

    next();
})

const HomeRouter = require('./routes/HomeRouter');
const AuthRouter = require("./routes/AuthRouter");
const NotificationRouter = require('./routes/NotificationsRouter');
const FriendRouter = require('./routes/FriendRouter');

app.use(AuthRouter);
app.use(FriendRouter);
app.use(NotificationRouter);
app.use(HomeRouter);

app.use(ErrorController.Get404);

// app.listen(5050, () => {
//     console.log('App listening to port', 5050);
// })

// Relations
Post.belongsTo(User, { constraint: true, onDelete: "CASCADE", foreignKey: "userId" });
User.hasMany(Post, { foreignKey: "userId" });

Comment.belongsTo(User, { constraint: true, onDelete: "CASCADE", foreignKey: "userId" });
User.hasMany(Comment, { foreignKey: "userId" });

Comment.belongsTo(Post, { constraint: true, onDelete: "CASCADE", foreignKey: "postId" });
Post.hasMany(Comment, { foreignKey: "postId" });

Reply.belongsTo(Comment, { constraint: true, onDelete: "CASCADE" });
Comment.hasMany(Reply);

Reply.belongsTo(User, { constraint: true, onDelete: "CASCADE" });
User.hasMany(Reply);

Reply.belongsTo(Post, { constraint: true, onDelete: "CASCADE" });
Post.hasMany(Reply);

FriendRequest.belongsTo(User, { constraint: true, foreignKey: "userFirstId", as: "friendRequestByMe" });
FriendRequest.belongsTo(User, { constraint: true, foreignKey: "userSecondId", as: "FriendRequestByOther" })
User.hasMany(FriendRequest, {
    foreignKey: 'userFirstId',
});

User.hasMany(FriendRequest, {
    foreignKey: 'userSecondId'
});

Friend.belongsTo(User, { constraint: true, foreignKey: "userFirstId", as: "friendByMe" });
Friend.belongsTo(User, { constraint: true, foreignKey: "userSecondId", as: "FriendByOther" })
User.hasMany(Friend, {
    foreignKey: 'userFirstId'
});

User.hasMany(Friend, {
    foreignKey: 'userSecondId'
});



sequelize.sync({ alter: true }).then(result => {
    app.listen(5052);
}).catch(err => {
    console.log(err);
})