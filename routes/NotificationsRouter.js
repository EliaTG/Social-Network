const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');

router.get('/notification',notificationController.GetNotifications);
router.post('/notification',notificationController.PostDeleteRequest);
router.post('/add-friend',notificationController.PostAddFriends);

module.exports = router;