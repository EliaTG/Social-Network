const express = require("express");
const path = require("path")
const expressHbs = require("express-handlebars");
const {engine} = require("express-handlebars");
const sequelize = require("./util/database");
const Sequelize = require("sequelize");
const session = require("express-session");
const flash = require('connect-flash');
const User = require('./models/User')

const app = express();
// const morgan = require('morgan')
// const passport = require('passport');
// const bodyparser = require('body-parser');



const HomeRouter = require('./routes/HomeRouter')
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
    },
))
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));


//Middleware
app.use(session({
    secret: "besocialNetwork",
    saveUninitialized: false,
    resave: false,
}))
app.use(flash());


// app.use(bodyparser.urlencoded({extended: true}))

// app.use(
//   session({
//     secret: "besocialNetwork",
//     saveUninitialized: false,
//     resave: false,
//     maxAge: 60000000,
//     cookie: {maxAge: 60000000},
    // store: new SequelizeStore({
    //     db: sequelize,
    // }),
// })
// );

// app.use(morgan('dev'));
// app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.success_msg = req.flash('success_msg');
//     next();
// })


// Global variables
app.use((req, res, next) => {
    // app.locals.success = req.flash('success');
    const errors = req.flash("error_msg");


    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.errorsMessages = errors;
    res.locals.HasErrorMessages = errors.length > 0;

    next();
})

// Relationship



// Routes
app.use(HomeRouter);
app.use(AuthRouter);
app.use(ErrorController.Get404);



// Starting 
sequelize.sync().then(result=>{
    app.listen(5050);
  }).catch(err =>{
      console.log(err);
  })