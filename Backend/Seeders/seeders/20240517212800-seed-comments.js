const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = [];
    for (let i = 0; i < 100; i++) {
      comments.push({
        userId: faker.datatype.number({ min: 1, max: 100 }), // Assuming there are 100 users
        postId: faker.datatype.number({ min: 1, max: 50 }),  // Assuming there are 50 posts
        content: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
