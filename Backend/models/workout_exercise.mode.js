'use strict';
module.exports = (sequelize, DataTypes) => {
  // Define the WorkoutExercise model
  const WorkoutExercise = sequelize.define('WorkoutExercise', {
    // Define the workoutId field with a foreign key relationship to the Workouts table
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Workouts',
        key: 'id'
      }
    },
    // Define the exerciseId field with a foreign key relationship to the Exercises table
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Exercises',
        key: 'id'
      }
    },
    // Define the sets field to store the number of sets for the exercise in this workout
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Define the reps field to store the number of repetitions per set
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Define the duration field to store the duration of the exercise in seconds
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});

  // Set up model associations
  WorkoutExercise.associate = function(models) {
    WorkoutExercise.belongsTo(models.Workout, { foreignKey: 'workoutId' });
    WorkoutExercise.belongsTo(models.Exercise, { foreignKey: 'exerciseId' });
  };

  return WorkoutExercise;
};
