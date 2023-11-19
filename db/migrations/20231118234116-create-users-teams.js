'use strict';
/** @type {import('sequelize-cli').Migration} */

const UsersTeamsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  teamId: {
    type: Sequelize.INTEGER,
    field: 'team_id',
    references: {
      model: 'Teams',
      key: 'id'
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    references: {
      model: 'Users',
      key: 'id'
    }
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
    await queryInterface.createTable('Users_Teams', UsersTeamsSchema);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users_Teams');
  }
};

module.exports = {UsersTeamsSchema}