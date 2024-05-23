const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workoutExercises = [];
    for (let i = 0; i < 100; i++) {
      workoutExercises.push({
        workoutId: faker.datatype.number({ min: 1, max: 50 }), // Assuming there are 50 workouts
        exerciseId: faker.datatype.number({ min: 1, max: 50 }), // Assuming there are 50 exercises
        sets: faker.datatype.number({ min: 1, max: 5 }),
        reps: faker.datatype.number({ min: 5, max: 20 }),
        duration: faker.datatype.number({ min: 30, max: 300 }), // duration in seconds
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('WorkoutExercises', workoutExercises, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WorkoutExercises', null, {});
  }
};
