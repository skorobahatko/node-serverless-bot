'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Requests', 
    { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      telegramId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      request_city: {
        type: Sequelize.STRING
      },
      request_response: {
        type: Sequelize.JSON
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: async (queryInterface) => await queryInterface.dropTable('Requests')
};
