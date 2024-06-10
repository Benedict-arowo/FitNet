const { Workout } = require('../config');

// Create a new workout
exports.createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all workouts
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.findAll();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a workout by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a workout
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (workout) {
      await workout.update(req.body);
      res.status(200).json(workout);
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (workout) {
      await workout.destroy();
      res.status(200).json({ message: 'Workout deleted' });
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
