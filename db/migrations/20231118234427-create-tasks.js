'use strict';
/** @type {import('sequelize-cli').Migration} */

const TasksSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
    allowNull:false,
  },
  description: {
    type: Sequelize.TEXT
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull:false,
    defaultValue: false,
  },
  deadline: {
    type: Sequelize.DATE,
    allowNull:false,
    defaultValue: Sequelize.NOW,
  },
  finishedAt: {
    type: Sequelize.DATE,
    allowNull:true,
    field: 'finished_at',
  },
  categoriesId: {
    type: Sequelize.INTEGER,
    field: 'categories_id',
    references: {
      model: 'Categories',
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
  teamId: {
    type: Sequelize.INTEGER,
    field: 'team_id',
    references: {
      model: 'Teams',
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
    await queryInterface.createTable('Tasks', TasksSchema);
=======
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      description: {
        type: Sequelize.TEXT
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false,
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW,
      },
      finishedAt: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      categoriesId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
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
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
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
    await queryInterface.dropTable('Tasks');
  }
};

module.exports = {TasksSchema}