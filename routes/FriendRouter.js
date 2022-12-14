const express = require('express');
const router = express.Router();
const FriendController = require('../controllers/FriendsController');

router.get('/friends', FriendController.GetFriends);
router.post('/delete-friend', FriendController.DeleteFriends);
router.get('/add-friends', FriendController.getAddFriends);
router.post('/add-friends', FriendController.PostAddFriends);
module.exports = router;