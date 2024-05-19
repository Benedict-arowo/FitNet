// routes/challengeRoutes.js
const express = require('express');
const router = express.Router();
const ChallengeController = require('../controllers/challengeController');

// Route for joining a challenge
router.post('/join', ChallengeController.joinChallenge);

// Other routes for challenge actions (e.g., create challenge, update challenge) can be added here

module.exports = router;
