const express = require("express");
const path = require("path")
const expressHbs = require("express-handlebars");
const {engine} = require("express-handlebars");
// const sequelize = require("./util/database");

const app = express();

const ErrorController = require("./controllers/ErrorController")

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

const HomeRouter = require('./routes/HomeRouter')
// const LoginRouter = require('./routes/LoginRouter')

// app.use(LoginRouter);
app.use(HomeRouter);

app.use(ErrorController.Get404);

app.listen(5050, () => {
    console.log('App listening to port', 5050);
})