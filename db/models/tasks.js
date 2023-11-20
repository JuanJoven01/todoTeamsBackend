'use strict';
const {
  Model
} = require('sequelize');
const { TasksSchema } = require('../migrations/20231118234427-create-tasks');
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
<<<<<<< HEAD
  Tasks.init(TasksSchema, {
=======
  Tasks.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    completed: DataTypes.BOOLEAN,
    deadline: DataTypes.DATE,
    finishedAt: DataTypes.DATE,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  }, {
>>>>>>> 88548b3 (Review files)
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};