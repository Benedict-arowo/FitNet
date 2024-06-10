// routes/dietPlanRoutes.js
const express = require('express');
const router = express.Router();
const DietPlanController = require('../controllers/dietplan.controller');

// Route for creating a new diet plan
router.post('/create', DietPlanController.create);

// Other routes for diet plan actions (e.g., update diet plan, delete diet plan) can be added here

module.exports = router;
