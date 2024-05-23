const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dietPlans = [];
    for (let i = 0; i < 50; i++) {
      dietPlans.push({
        userId: faker.datatype.number({ min: 1, max: 100 }), // Assuming there are 100 users
        plan: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('DietPlans', dietPlans, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DietPlans', null, {});
  }
};
