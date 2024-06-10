const db = require('../config');

const Exercise = db.Exercise;

// Get all exercises
const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single exercise by ID
const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new exercise
const createExercise = async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an exercise
const updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    await exercise.update(req.body);
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an exercise
const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    await exercise.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllExercises, // Get all exercises
  getExerciseById, // Get a single exercise by ID
  createExercise, // Create a new exercise
  updateExercise, // Update an exercise
  deleteExercise, // Delete an exercise
};
