'use strict';

// Define the GymMembership model
module.exports = (sequelize, DataTypes) => {
  const GymMembership = sequelize.define('GymMembership', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // This field cannot be null
      references: {
        model: 'User',  // Reference to the Users table
        key: 'id'
      }
    },
    gymId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // This field cannot be null
      references: {
        model: 'Gyms',  // Reference to the Gyms table
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false  // This field cannot be null
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false  // This field cannot be null
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true  // Default value is true
    }
  }, {});

  // Define associations between models
  GymMembership.associate = function(models) {
    GymMembership.belongsTo(models.User, { foreignKey: 'userId' });
    GymMembership.belongsTo(models.Gym, { foreignKey: 'gymId' });
  };

  return GymMembership;
};
