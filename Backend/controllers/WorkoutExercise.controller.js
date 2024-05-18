const { WorkoutExercise } = require('../models');

// Get all workout exercises
const getAllWorkoutExercises = async (req, res) => {
  try {
    const workoutExercises = await WorkoutExercise.findAll();
    res.json(workoutExercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single workout exercise by ID
const getWorkoutExerciseById = async (req, res) => {
  try {
    const workoutExercise = await WorkoutExercise.findByPk(req.params.id);
    if (!workoutExercise) {
      return res.status(404).json({ error: 'Workout exercise not found' });
    }
    res.json(workoutExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new workout exercise
const createWorkoutExercise = async (req, res) => {
  try {
    const workoutExercise = await WorkoutExercise.create(req.body);
    res.status(201).json(workoutExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a workout exercise
const updateWorkoutExercise = async (req, res) => {
  try {
    const workoutExercise = await WorkoutExercise.findByPk(req.params.id);
    if (!workoutExercise) {
      return res.status(404).json({ error: 'Workout exercise not found' });
    }
    await workoutExercise.update(req.body);
    res.json(workoutExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a workout exercise
const deleteWorkoutExercise = async (req, res) => {
  try {
    const workoutExercise = await WorkoutExercise.findByPk(req.params.id);
    if (!workoutExercise) {
      return res.status(404).json({ error: 'Workout exercise not found' });
    }
    await workoutExercise.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkoutExercises,
  getWorkoutExerciseById,
  createWorkoutExercise,
  updateWorkoutExercise,
  deleteWorkoutExercise,
};
