'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define('Workout', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    intensity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});

  Workout.associate = function(models) {
    Workout.belongsTo(models.User, { foreignKey: 'userId' });
    // Define many-to-many relationship with Exercise through WorkoutExercise
    Workout.belongsToMany(models.Exercise, { through: models.WorkoutExercise, foreignKey: 'workoutId' });
  };

  return Workout;
};
