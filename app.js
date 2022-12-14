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
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const comparador = require("./util/helpers/hbs/comparar");
const getDate = require("./util/helpers/hbs/GetData");
// const getDataHelpers = require("./util/helpers/GetData");


// const moment = require('moment');
// moment.utc(createdAt).local().format('MM/DD/YYYY, h:mm a');
// console.log(moment);

const app = express();
// const morgan = require('morgan')
// const passport = require('passport');
// const bodyparser = require('body-parser');

const HomeRouter = require('./routes/HomeRouter');
const AuthRouter = require("./routes/AuthRouter")

const ErrorController = require("./controllers/ErrorController")
    // Initalize sequelize with session store
    // const SequelizeStore = require("connect-session-sequelize")(session.Store);




// // Initialization
// const app = express();
// require('./util/passport');

// Settings

app.engine("hbs", expressHbs.engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: 'hbs',
    helpers: {
        IgualValor: comparador.IgualValor,
        Usuario: comparador.usuario,
        Result: comparador.result,
        getDate: getDate.getDate,  
    },

}, ))
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Multer
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
//Middleware
app.use(session({
    secret: "besocialNetwork",
    saveUninitialized: false,
    resave: false,
}))
app.use(flash());


// app.use(bodyparser.urlencoded({extended: true}))
// app.use(morgan('dev'));


// Global variables
app.use((req, res, next) => {
    const errors = req.flash("error_msg");

    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.errorsMessages = errors;
    res.locals.HasErrorMessages = errors.length > 0;

    next();
})

//Routes
app.use(AuthRouter);
app.use(HomeRouter);

app.use(ErrorController.Get404);


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
    app.listen(5050);
}).catch(err => {
    console.log(err);
})