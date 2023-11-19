'use strict';
/** @type {import('sequelize-cli').Migration} */

const TeamsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  alias: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  admin: {
    type: Sequelize.STRING,
    allowNull: false,
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
  }
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', TeamsSchema );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teams');
  }
};

module.exports = TeamsSchema