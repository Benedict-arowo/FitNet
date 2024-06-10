// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');

// Route for creating a new event
router.post('/create', EventController.create);

// Other routes for event actions (e.g., update event, delete event) can be added here

module.exports = router;
