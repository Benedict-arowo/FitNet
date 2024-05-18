'use strict';

module.exports = (sequelize, DataTypes) => {
  // Define the DietPlan model with its attributes
  const DietPlan = sequelize.define('DietPlan', {
    // Foreign key referencing the Users table
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    // Name of the diet plan
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Description of the diet plan
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // JSON object representing the meals in the diet plan
    meals: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {});

  // Define the associations (relationships) of the DietPlan model
  DietPlan.associate = function(models) {
    // A DietPlan belongs to a User
    DietPlan.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return DietPlan;
};
