'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Workouts',
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
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rest: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});

  Exercise.associate = function(models) {
    Exercise.belongsTo(models.Workout, { foreignKey: 'workoutId' });
    // Define many-to-many relationship with Workout through WorkoutExercise
    Exercise.belongsToMany(models.Workout, { through: models.WorkoutExercise, foreignKey: 'exerciseId' });
  };

  return Exercise;
};
