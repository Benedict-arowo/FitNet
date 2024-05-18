// scripts/fetchGyms.js
const axios = require('axios');
const db = require('../models'); // Adjust path according to your structure

const fetchAndUpdateGyms = async () => {
  try {
    const response = await axios.get('https://api.example.com/gyms'); // Replace with actual API endpoint
    const gymData = response.data;

    // Update gyms in the database
    await db.Gym.updateGymsFromAPI(gymData);

    console.log('Gym data updated successfully');
  } catch (error) {
    console.error('Error fetching or updating gym data:', error);
  }
};

// Call the function to fetch and update gyms
fetchAndUpdateGyms();
