// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');

// Route for creating a new comment
router.post('/create', CommentController.create);

// Other routes for comment actions (e.g., update comment, delete comment) can be added here

module.exports = router;
