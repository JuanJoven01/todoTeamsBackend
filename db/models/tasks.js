'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    completed: DataTypes.BOOLEAN,
    deadline: DataTypes.DATE,
    finishedAt: DataTypes.DATE,
    categoriesId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};