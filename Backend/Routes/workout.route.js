// routes/workoutRoutes.js
const express = require('express');
const router = express.Router();
const WorkoutController = require('../controllers/workoutController');

// Route for creating a new workout
router.post('/create', WorkoutController.create);

// Other routes for workout actions (e.g., update workout, delete workout) can be added here

module.exports = router;
