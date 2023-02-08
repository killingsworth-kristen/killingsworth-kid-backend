const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    post_like: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        references: {
          model: 'Posts',
          key: 'id',
        },
    },
    comment_like: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        references: {
            model: 'Comments',
            key: 'id'
        }
    },
  },{
    sequelize,
  }
);

module.exports = Like;