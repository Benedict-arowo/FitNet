const { UserFriend } = require('../models');

// Get all user friends
const getAllUserFriends = async (req, res) => {
  try {
    const userFriends = await UserFriend.findAll();
    res.json(userFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user friend by ID
const getUserFriendById = async (req, res) => {
  try {
    const userFriend = await UserFriend.findByPk(req.params.id);
    if (!userFriend) {
      return res.status(404).json({ error: 'User friend not found' });
    }
    res.json(userFriend);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user friend
const createUserFriend = async (req, res) => {
  try {
    const userFriend = await UserFriend.create(req.body);
    res.status(201).json(userFriend);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user friend
const updateUserFriend = async (req, res) => {
  try {
    const userFriend = await UserFriend.findByPk(req.params.id);
    if (!userFriend) {
      return res.status(404).json({ error: 'User friend not found' });
    }
    await userFriend.update(req.body);
    res.json(userFriend);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user friend
const deleteUserFriend = async (req, res) => {
  try {
    const userFriend = await UserFriend.findByPk(req.params.id);
    if (!userFriend) {
      return res.status(404).json({ error: 'User friend not found' });
    }
    await userFriend.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUserFriends,
  getUserFriendById,
  createUserFriend,
  updateUserFriend,
  deleteUserFriend,
};
