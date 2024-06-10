const express = require('express');
const router = express.Router();
const gymMembershipController = require('../controllers/gym_membership.controller');

// Define routes for gym memberships
router.post('/', gymMembershipController.createGymMembership);
router.get('/', gymMembershipController.getAllGymMemberships);
router.get('/:id', gymMembershipController.getGymMembershipById);
router.put('/:id', gymMembershipController.updateGymMembership);
router.delete('/:id', gymMembershipController.deleteGymMembership);

module.exports = router;
