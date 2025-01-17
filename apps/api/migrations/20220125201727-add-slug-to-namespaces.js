'use strict';
const config = require("../config");
const {TABLE_PREFIX} = config
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addColumn(`${TABLE_PREFIX}_namespaces`, "slug", { 
      type: Sequelize.STRING,
      unique: true,
      allowNull: false 
    });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeColumn(`${TABLE_PREFIX}_namespaces`, "slug");
  }
};
