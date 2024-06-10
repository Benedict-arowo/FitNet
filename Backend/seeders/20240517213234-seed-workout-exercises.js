'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Array to store generated workout data
    const workouts = [];

    // Generate random workout data
    for (let i = 0; i < 10; i++) { // Generate 10 workouts
      const workout = {
        userId: faker.random.number({ min: 1, max: 10 }), // Assuming userIds range from 1 to 10
        type: faker.random.arrayElement(['Cardio', 'Strength Training', 'Yoga', 'HIIT', 'CrossFit']), // Random workout type
        duration: faker.random.number({ min: 20, max: 120 }), // Random duration in minutes
        intensity: faker.random.arrayElement(['Low', 'Medium', 'High']), // Random intensity level
        date: faker.date.between('2020-01-01', '2024-06-09'), // Random date since 2020-01-01
        createdAt: new Date(),
        updatedAt: new Date()
      };
      workouts.push(workout);
    }

    // Insert generated workout data into the database
    await queryInterface.bulkInsert('Workouts', workouts, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all data from the Workouts table
    await queryInterface.bulkDelete('Workouts', null, {});
  }
};
