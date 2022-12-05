const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController.js')

router.get("/", HomeController.GetIndex);

module.exports = router;