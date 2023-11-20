'use strict';
/** @type {import('sequelize-cli').Migration} */

const InvitationsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  senderId: {
    type: Sequelize.INTEGER,
    field: 'sender_id', 
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  receiverId: {
    type: Sequelize.INTEGER,
    field: 'receiver_id',
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  teamId: {
    type: Sequelize.INTEGER,
    field: 'team_id',
    references: {
      model: 'Teams',
      key: 'id'
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'pending',
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
    await queryInterface.createTable('Invitations', InvitationsSchema);
=======
    await queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
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
    await queryInterface.dropTable('Invitations');
  }
};

module.exports = {InvitationsSchema}