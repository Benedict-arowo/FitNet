'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFriend = sequelize.define('UserFriend', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {});

  UserFriend.associate = function(models) {
    UserFriend.belongsTo(models.User, { foreignKey: 'userId' });
    UserFriend.belongsTo(models.User, { foreignKey: 'friendId', as: 'Friend' });
  };

  return UserFriend;
};
