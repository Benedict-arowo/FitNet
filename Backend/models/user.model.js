'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // Ensures password length is between 8 and 100 characters
      },
    },
    location: {
      type: DataTypes.STRING,
    },
    goal: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'User',
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Workout, { foreignKey: 'userId' });
    User.hasMany(models.DietPlan, { foreignKey: 'userId' });
    User.hasMany(models.GymMembership, { foreignKey: 'userId' });
    User.hasMany(models.Post, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
    User.belongsToMany(models.Challenge, { through: 'UserChallenges', foreignKey: 'userId' });
    User.belongsToMany(User, { as: 'Friends', through: 'UserFriends', foreignKey: 'userId', otherKey: 'friendId' });
    User.belongsTo(User, { as: 'referrer', foreignKey: 'referralId', allowNull: true });
  };

  // Hook to hash the password before creating a user
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  // Hook to hash the password before updating a user
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return User;
};
