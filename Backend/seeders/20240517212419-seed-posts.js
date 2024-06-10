const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = [];
    for (let i = 0; i < 50; i++) {
      posts.push({
        userId: faker.datatype.number({ min: 1, max: 100 }), // Assuming there are 100 users
        content: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Posts', posts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
