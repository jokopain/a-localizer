'use strict';
const config = require("../config");
const {TABLE_PREFIX} = config
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(`${TABLE_PREFIX}_api_keys`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      api_key: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(`${TABLE_PREFIX}_api_keys`);
  }
};