const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const events = [];
    for (let i = 0; i < 100; i++) {
      events.push({
        userId: faker.datatype.number({ min: 1, max: 100 }), // Assuming there are 100 users
        eventId: faker.datatype.uuid(),
        eventDescription: JSON.stringify({
          action: faker.lorem.words(2),
          details: faker.lorem.sentence()
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Events', events, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
