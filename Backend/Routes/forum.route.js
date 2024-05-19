// routes/forumRoutes.js
const express = require('express');
const router = express.Router();
const ForumController = require('../controllers/forumController');

// Route for creating a new forum post
router.post('/create', ForumController.createPost);

// Route for creating a new comment on a forum post
router.post('/:postId/comment', ForumController.createComment);

// Other routes for forum actions (e.g., update post, delete post) can be added here

module.exports = router;
