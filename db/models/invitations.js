'use strict';
const {
  Model
} = require('sequelize');
const { InvitationsSchema } = require('../migrations/20231119223435-create-invitations');
module.exports = (sequelize, DataTypes) => {
  class Invitations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invitations.init(InvitationsSchema, {
    sequelize,
    modelName: 'Invitations',
  });
  return Invitations;
};