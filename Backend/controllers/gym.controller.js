const { Gym } = require('../models');

// Get all gyms
const getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll();
    res.json(gyms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single gym by ID
const getGymById = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }
    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new gym
const createGym = async (req, res) => {
  try {
    const gym = await Gym.create(req.body);
    res.status(201).json(gym);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a gym
const updateGym = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }
    await gym.update(req.body);
    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a gym
const deleteGym = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }
    await gym.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllGyms,
  getGymById,
  createGym,
  updateGym,
  deleteGym,
};
