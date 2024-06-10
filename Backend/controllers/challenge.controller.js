const { Challenge } = require('../models');

// Get all challenges
const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.findAll();
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single challenge by ID
const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new challenge
const createChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create(req.body);
    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a challenge
const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    await challenge.update(req.body);
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a challenge
const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    await challenge.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
};
