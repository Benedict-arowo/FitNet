// routes/userFriendRoutes.js
const express = require('express');
const router = express.Router();
const UserFriendController = require('../controllers/userFriendController');

// Route for adding a new friend
router.post('/add', UserFriendController.addFriend);

// Other routes for user-friend actions (e.g., remove friend) can be added here

module.exports = router;
