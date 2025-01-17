'use strict';
const config = require("../config");
const {TABLE_PREFIX} = config
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(`${TABLE_PREFIX}_keys`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      namespace_id: {
        type: Sequelize.INTEGER,
        references: { model: {tableName: `${TABLE_PREFIX}_namespaces` }, key: 'id' },
        foreignKey: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(`${TABLE_PREFIX}_keys`);
  }
};