'use strict';
/** @type {import('sequelize-cli').Migration} */

const UsersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    unique:true,
    allowNull:false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull:false,
  },
  mail: {
    type: Sequelize.STRING,
    unique:true,
    allowNull:false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    field: 'updated_at',
  },
  
}

module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable('Users', UsersSchema);
=======
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      mail: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
      },
      code: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
>>>>>>> 46d67d0 (fields deleted)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};

module.exports = {UserSchema}