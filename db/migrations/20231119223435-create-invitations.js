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
    await queryInterface.createTable('Invitations', InvitationsSchema);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invitations');
  }
};

module.exports = {InvitationsSchema}