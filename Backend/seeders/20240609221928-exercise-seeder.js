'use strict';

const faker = require('faker');
const db = require('../config');

const Exercise = db.Exercise;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Generate random exercise data
    const exercises = [];
    const workoutIds = await db.Workout.findAll().then(workouts => workouts.map(workout => workout.id));

    for (let i = 0; i < 20; i++) { // Generate 20 exercises
      const exercise = {
        workoutId: faker.random.arrayElement(workoutIds),
        name: faker.random.words(),
        description: faker.lorem.paragraph(),
        sets: faker.random.number({ min: 1, max: 5 }),
        reps: faker.random.number({ min: 5, max: 20 }),
        rest: faker.random.number({ min: 30, max: 180 }),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      exercises.push(exercise);
    }

    // Insert generated exercise data into the database
    await Exercise.bulkCreate(exercises);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all data from the Exercises table
    await Exercise.destroy({ truncate: true });
  }
};
