const { GymMembership } = require('../models');

// Create a new gym membership
exports.createGymMembership = async (req, res) => {
  try {
    const gymMembership = await GymMembership.create(req.body);
    res.status(201).json(gymMembership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all gym memberships
exports.getAllGymMemberships = async (req, res) => {
  try {
    const gymMemberships = await GymMembership.findAll();
    res.status(200).json(gymMemberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a gym membership by ID
exports.getGymMembershipById = async (req, res) => {
  try {
    const gymMembership = await GymMembership.findByPk(req.params.id);
    if (gymMembership) {
      res.status(200).json(gymMembership);
    } else {
      res.status(404).json({ error: 'Gym Membership not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a gym membership
exports.updateGymMembership = async (req, res) => {
  try {
    const gymMembership = await GymMembership.findByPk(req.params.id);
    if (gymMembership) {
      await gymMembership.update(req.body);
      res.status(200).json(gymMembership);
    } else {
      res.status(404).json({ error: 'Gym Membership not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a gym membership
exports.deleteGymMembership = async (req, res) => {
  try {
    const gymMembership = await GymMembership.findByPk(req.params.id);
    if (gymMembership) {
      await gymMembership.destroy();
      res.status(200).json({ message: 'Gym Membership deleted' });
    } else {
      res.status(404).json({ error: 'Gym Membership not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
