'use strict';
const {
  Model
} = require('sequelize');
const { UsersTeamsSchema } = require('../migrations/20231118234116-create-users-teams');
module.exports = (sequelize, DataTypes) => {
  class Users_Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users_Teams.init(UsersTeamsSchema, {
    sequelize,
    modelName: 'Users_Teams',
  });
  return Users_Teams;
};