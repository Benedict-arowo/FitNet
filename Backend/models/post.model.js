'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    forumId: {
      type: DataTypes.INTEGER, //to be deleted
      allowNull: false,
      references: {
        model: 'Forums',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});

  Post.associate = function(models) {
    Post.belongsTo(models.Forum, { foreignKey: 'forumId' });
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.hasMany(models.Comment, { foreignKey: 'postId' });
  };

  return Post;
};
