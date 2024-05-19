// routes/workoutExerciseRoutes.js
const express = require('express');
const router = express.Router();
const WorkoutExerciseController = require('../controllers/workoutExerciseController');

// Route for adding a new workout exercise
router.post('/add', WorkoutExerciseController.addExercise);

// Other routes for workout exercise actions (e.g., update exercise, delete exercise) can be added here

module.exports = router;
