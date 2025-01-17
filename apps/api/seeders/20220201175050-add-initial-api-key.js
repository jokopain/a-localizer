'use strict';
const config = require("../config");
const {TABLE_PREFIX} = config
const {v4: uuidv4} = require("uuid")
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(`${TABLE_PREFIX}_api_keys`, [{
          api_key: uuidv4(),
       }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
