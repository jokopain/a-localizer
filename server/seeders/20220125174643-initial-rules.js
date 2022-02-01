'use strict';
require('dotenv').config()
const {
  TABLE_PREFIX = "a_localize"
} = process.env

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(`${TABLE_PREFIX}_acl_rules`, [
      { entity: "language",  action: "add", role: "admin" },
      { entity: "language",  action: "edit", role: "admin" },
      { entity: "language",  action: "remove", role: "admin" },

      { entity: "namespace",  action: "add", role: "admin" },
      { entity: "namespace",  action: "edit", role: "admin" },
      { entity: "namespace",  action: "remove", role: "admin" },

      { entity: "string",  action: "add", role: "admin" },
      { entity: "string",  action: "edit", role: "admin" },
      { entity: "string",  action: "remove", role: "admin" },

      { entity: "string",  action: "edit_key", role: "admin" },

  ], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
