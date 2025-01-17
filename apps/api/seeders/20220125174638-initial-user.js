'use strict';
require('dotenv').config()
const crypto = require("crypto");

const {
  INITIAL_ADMIN_USERNAME = "admin",
  INITIAL_ADMIN_PASSWORD = "root",
  TABLE_PREFIX = "a_localize"
} = process.env

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(`${TABLE_PREFIX}_users`, [{
      firstName: "Admin",
      lastName: "Admin",
      username: INITIAL_ADMIN_USERNAME,
      hashed_password: crypto.createHash('sha256').update(INITIAL_ADMIN_PASSWORD).digest('base64'),
      role: "admin",
    }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
