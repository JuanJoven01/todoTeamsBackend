'use strict';
const {
  Model
} = require('sequelize');

const {UserSchema} = require('../migration/20201118233823-create-users')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Tasks,{
        as: 'tasks',
        foreignKey: 'userId'
      }),
      this.belongsToMany(models.Teams,{
        through: 'Users_Teams',
        as: 'teams',
        foreignKey: 'userId'
      }),
      this.hasMany(models.Invitations,{
        as: 'senderInvitations',
        foreignKey: 'senderId'
      }),
      this.hasMany(models.Invitations,{
        as: 'receiverInvitations',
        foreignKey: 'receiverId'
      })
    }
  }
  Users.init(UserSchema, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};