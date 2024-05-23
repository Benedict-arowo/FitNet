'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      goal: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'User',
        allowNull: false
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: true // Allow null for optional profile picture
      },
      referralId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Allow null for users who haven't been referred
        references: {
          model: 'User', // References the Users table
          key: 'id' // References the id column in the Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Set referralId to null if the referred user is deleted
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};
