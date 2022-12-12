const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController.js')
const isAuth = require("../middlewares/is-auth");

router.get("/", isAuth, HomeController.GetIndex);
router.post("/", isAuth, HomeController.PostContent);
router.post("/comment", isAuth, HomeController.PostComment);
router.post("/reply", isAuth, HomeController.PostReply);
router.post("/delete-post", isAuth, HomeController.PostDeletePost);
router.post("/edit-post", isAuth, HomeController.PostEditPost);
router.get("/:postId", isAuth, HomeController.GetEditPost);
module.exports = router;