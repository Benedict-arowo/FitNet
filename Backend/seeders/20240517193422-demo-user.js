const faker = require('faker');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = [];
    for (let i = 0; i < 100; i++) {
      user.push({
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: await bcrypt.hash('password', 10),
        location: `Location${i}`,
        profilePicture: `profile${i}.jpg`,
        referralId: i % 10, // Example referralId logic
        goal: `Goal${i}`,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    try {
      await queryInterface.bulkInsert('User', user, {});
    } catch (error) {
      console.error('Error bulk inserting users:', error); // Log any errors
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  }
};
