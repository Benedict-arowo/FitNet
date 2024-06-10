'use strict';

module.exports = (sequelize, DataTypes) => {
  // Define the Forum model with its attributes
  const Forum = sequelize.define('Forum', {
    // Name of the forum
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Description of the forum
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});

  // Define the associations (relationships) of the Forum model
  Forum.associate = function(models) {
    // A Forum has many Posts
    Forum.hasMany(models.Post, { foreignKey: 'forumId' });
  };

  return Forum;
};
