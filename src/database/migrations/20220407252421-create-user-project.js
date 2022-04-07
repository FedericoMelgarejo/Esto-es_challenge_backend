'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userProject', {
      fk_user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_project_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userProject');
  }
};