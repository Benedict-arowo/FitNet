const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userFriends = [];
    for (let i = 0; i < 100; i++) {
      userFriends.push({
        userId: faker.datatype.number({ min: 1, max: 100 }), // Assuming there are 100 users
        friendId: faker.datatype.number({ min: 1, max: 100 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('UserFriends', userFriends, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserFriends', null, {});
  }
};
