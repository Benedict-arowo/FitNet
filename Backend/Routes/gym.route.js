// routes/gymRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route for fetching gyms in Nigeria
router.get('/gyms', async (req, res) => {
  try {
    // Make a request to the external API to fetch gym data
    const response = await axios.get('https://example.com/api/gyms/nigeria');

    // Extract the gym data from the response
    const gyms = response.data;

    // Return the list of gyms as JSON response
    res.json(gyms);
  } catch (error) {
    console.error('Error fetching gyms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
