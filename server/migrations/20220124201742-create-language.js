'use strict';
const config = require("../config");
const {TABLE_PREFIX} = config
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(`${TABLE_PREFIX}_languages`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(`${TABLE_PREFIX}_languages`);
  }
};