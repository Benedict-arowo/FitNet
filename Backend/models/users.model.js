'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING,
    goal: DataTypes.TEXT,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    profilePicture: DataTypes.STRING, // Added column for storing image URLs
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Workout, { foreignKey: 'userId' });
    User.hasMany(models.DietPlan, { foreignKey: 'userId' });
    User.hasMany(models.GymMembership, { foreignKey: 'userId' });
    User.hasMany(models.Post, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
    User.belongsToMany(models.Challenge, { through: 'UserChallenges', foreignKey: 'userId' });
    User.belongsToMany(User, { as: 'Friends', through: 'UserFriends', foreignKey: 'userId', otherKey: 'friendId' });
    // Relationship for referralId
    User.belongsTo(User, { as: 'referrer', foreignKey: 'referralId', allowNull: true });
  };

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
