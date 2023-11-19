'use strict';
const {
  Model
} = require('sequelize');
const { CategoriesSchema } = require('../migrations/20231118234253-create-categories');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Tasks,{
        as: 'tasks',
        foreignKey: 'categoryId'
      })
    }
  }
  Categories.init(CategoriesSchema, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};