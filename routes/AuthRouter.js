const express = require('express');
const router = express.Router();
//const passport = require('../util/passport');
const AuthController = require('../controllers/AuthController');

router.get("/login", AuthController.GetLogin);
router.post("/login", AuthController.PostLogin);
router.get("/signup", AuthController.GetSignUp);
router.post("/signup", AuthController.PostSignUp);
router.post("/logout", AuthController.LogOut);

router.get("/reset", AuthController.GetReset);
router.post("/reset", AuthController.PostReset);


module.exports = router;