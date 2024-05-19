const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 0; i < 100; i++) {
      const hashedPassword = await bcrypt.hash('password', 10); // Hash the password
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
        location: faker.address.city(),
        goal: faker.lorem.sentence(),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
