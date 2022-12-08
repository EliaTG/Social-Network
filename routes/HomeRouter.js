const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController.js')

router.get("/", HomeController.GetIndex);
router.post("/", HomeController.PostContent);
router.post("/comment", HomeController.PostComment);
module.exports = router;