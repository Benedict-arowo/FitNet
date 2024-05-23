const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const challenges = [];
    for (let i = 0; i < 20; i++) {
      challenges.push({
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Challenges', challenges, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Challenges', null, {});
  }
};
