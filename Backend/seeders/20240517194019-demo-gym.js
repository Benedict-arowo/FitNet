const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const gyms = [];
    for (let i = 0; i < 20; i++) {
      gyms.push({
        name: faker.company.companyName(),
        location: faker.address.city(),
        price: faker.random.number({ min: 20, max: 100 }), // Generate random price
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Gyms', gyms, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Gyms', null, {});
  }
};
