'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Users,{
        // define association here
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
      
    }
  }
  Teams.init({
    alias: DataTypes.STRING,
    admin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teams',
  });
  return Teams;
};