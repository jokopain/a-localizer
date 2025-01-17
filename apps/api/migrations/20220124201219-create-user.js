'use strict';
const config = require("../config");
const {TABLE_PREFIX} = config
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(`${TABLE_PREFIX}_users`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      hashed_password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(`${TABLE_PREFIX}_users`);
  }
};