'use strict';
const config = require("../config");
const {TABLE_PREFIX} = config
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(`${TABLE_PREFIX}_translations`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key_id: {
        type: Sequelize.INTEGER,
        references: { model: {tableName: `${TABLE_PREFIX}_keys` }, key: 'id' },
      },
      locale_id: {
        type: Sequelize.INTEGER,
        references: { model: {tableName: `${TABLE_PREFIX}_languages` }, key: 'id' },
      },
      text: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(`${TABLE_PREFIX}_translations`);
  }
};