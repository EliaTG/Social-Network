const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController.js')
const isAuth = require("../middlewares/is-auth");

router.get("/", isAuth, HomeController.GetIndex);

module.exports = router;