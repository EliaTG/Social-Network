const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController.js')

router.get("/", HomeController.GetIndex);
router.post("/", HomeController.PostContent);
router.post("/comment", HomeController.PostComment);
router.post("/reply", HomeController.PostReply);
router.post("/delete-post", HomeController.PostDeletePost);
router.post("/edit-post", HomeController.PostEditPost);
router.get("/:postId", HomeController.GetEditPost);
module.exports = router;