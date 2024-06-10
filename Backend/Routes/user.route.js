// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route for user signup
router.post('/signup', UserController.signup);

// Route for user login
router.post('/login', UserController.login);

// Other routes for user actions (e.g., update profile, change password) can be added here

module.exports = router;
