// routes/exerciseRoutes.js
const express = require('express');
const router = express.Router();
const ExerciseController = require('../controllers/exercise.controller');

// Route for creating a new exercise
router.post('/create', ExerciseController.create);

// Other routes for exercise actions (e.g., update exercise, delete exercise) can be added here

module.exports = router;
