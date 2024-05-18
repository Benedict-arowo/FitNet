// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

// Route for creating a new post
router.post('/create', PostController.create);

// Other routes for post actions (e.g., update post, delete post) can be added here

module.exports = router;
