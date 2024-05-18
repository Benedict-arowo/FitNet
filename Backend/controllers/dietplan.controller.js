const { DietPlan } = require('../models');

// Get all diet plans
const getAllDietPlans = async (req, res) => {
  try {
    const dietPlans = await DietPlan.findAll();
    res.json(dietPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single diet plan by ID
const getDietPlanById = async (req, res) => {
  try {
    const dietPlan = await DietPlan.findByPk(req.params.id);
    if (!dietPlan) {
      return res.status(404).json({ error: 'Diet plan not found' });
    }
    res.json(dietPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new diet plan
const createDietPlan = async (req, res) => {
  try {
    const dietPlan = await DietPlan.create(req.body);
    res.status(201).json(dietPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a diet plan
const updateDietPlan = async (req, res) => {
  try {
    const dietPlan = await DietPlan.findByPk(req.params.id);
    if (!dietPlan) {
      return res.status(404).json({ error: 'Diet plan not found' });
    }
    await dietPlan.update(req.body);
    res.json(dietPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a diet plan
const deleteDietPlan = async (req, res) => {
  try {
    const dietPlan = await DietPlan.findByPk(req.params.id);
    if (!dietPlan) {
      return res.status(404).json({ error: 'Diet plan not found' });
    }
    await dietPlan.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDietPlans,
  getDietPlanById,
  createDietPlan,
  updateDietPlan,
  deleteDietPlan,
};
