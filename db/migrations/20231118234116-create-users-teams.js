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
<<<<<<< HEAD
    await queryInterface.createTable('Users_Teams', UsersTeamsSchema);
=======
    await queryInterface.createTable('Users_Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
>>>>>>> 46d67d0 (fields deleted)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users_Teams');
  }
};

module.exports = {UsersTeamsSchema}