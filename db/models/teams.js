'use strict';
const {
  Model
} = require('sequelize');

const TeamsSchema = require('../migrations/20201118233824-create-teams')

module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Users,{
        through: 'Users_Teams',
        as: 'users',
        foreignKey: 'teamId'
      }),
      this.hasMany(models.Tasks,{
        as: 'tasks',
        foreignKey: 'teamId'
      }),
      this.hasMany(models.Invitations,{
        as: 'invitations',
        foreignKey: 'teamId'
      })
      // define association here
    }
  }
  Teams.init(TeamsSchema, {
    sequelize,
    modelName: 'Teams',
  });
  return Teams;
};