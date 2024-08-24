'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define('workout', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});

  Workout.associate = function(models) {
    Workout.belongsTo(models.User, { foreignKey: 'userId' });
    // Define many-to-many relationship with Exercise through WorkoutExercise
    Workout.belongsToMany(models.exercise, { through: models.workout_exercise, foreignKey: 'workoutId' });
  };

  return Workout;
};
