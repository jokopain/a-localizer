'use strict';
require('dotenv').config()
const {
  TABLE_PREFIX = "a_localize"
} = process.env

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(`${TABLE_PREFIX}_acl_rules`, [

      { entity: "pages",  action: "manage", role: "translator" },
      { entity: "pages",  action: "manage_namespace", role: "translator" },
      { entity: "pages",  action: "manage_language", role: "translator" },
      
      { entity: "pages",  action: "namespaces", role: "translator" },
      
      { entity: "namespace",  action: "add", role: "translator" },
      { entity: "namespace",  action: "edit", role: "translator" },

      { entity: "language",  action: "add", role: "translator" },
      { entity: "language",  action: "edit", role: "translator" },

      { entity: "users",  action: "view", role: "translator" },
      { entity: "users",  action: "add", role: "translator" },
      { entity: "users",  action: "edit", role: "translator" },
      { entity: "users",  action: "remove", role: "translator" },

      { entity: "apiKey",  action: "view", role: "translator" },

      { entity: "import",  action: "action", role: "translator" },
      
      { entity: "import",  action: "action", role: "translator" },

      { entity: "string",  action: "edit", role: "translator" },


  ], {});
  },

  async down (queryInterface, Sequelize) {
  }
};

