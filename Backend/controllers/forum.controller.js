const { Forum } = require('../models');

// Get all forums
const getAllForums = async (req, res) => {
  try {
    const forums = await Forum.findAll();
    res.json(forums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single forum by ID
const getForumById = async (req, res) => {
  try {
    const forum = await Forum.findByPk(req.params.id);
    if (!forum) {
      return res.status(404).json({ error: 'Forum not found' });
    }
    res.json(forum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new forum
const createForum = async (req, res) => {
  try {
    const forum = await Forum.create(req.body);
    res.status(201).json(forum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a forum
const updateForum = async (req, res) => {
  try {
    const forum = await Forum.findByPk(req.params.id);
    if (!forum) {
      return res.status(404).json({ error: 'Forum not found' });
    }
    await forum.update(req.body);
    res.json(forum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a forum
const deleteForum = async (req, res) => {
  try {
    const forum = await Forum.findByPk(req.params.id);
    if (!forum) {
      return res.status(404).json({ error: 'Forum not found' });
    }
    await forum.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllForums,
  getForumById,
  createForum,
  updateForum,
  deleteForum,
};
