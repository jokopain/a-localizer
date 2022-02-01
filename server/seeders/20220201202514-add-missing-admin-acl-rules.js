'use strict';
require('dotenv').config()
const {
  TABLE_PREFIX = "a_localize"
} = process.env

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(`${TABLE_PREFIX}_acl_rules`, [

            
      { entity: "namespace",  action: "add", role: "admin" },
      { entity: "namespace",  action: "edit", role: "admin" },
      { entity: "namespace",  action: "edit_slug", role: "admin" },
      { entity: "namespace",  action: "remove", role: "admin" },

      { entity: "language",  action: "add", role: "admin" },
      { entity: "language",  action: "edit", role: "admin" },
      { entity: "language",  action: "edit_locale", role: "admin" },
      { entity: "language",  action: "remove", role: "admin" },

      { entity: "pages",  action: "manage", role: "admin" },
      { entity: "pages",  action: "manage_namespace", role: "admin" },
      { entity: "pages",  action: "manage_language", role: "admin" },

      { entity: "pages",  action: "namespaces", role: "admin" },

      { entity: "pages",  action: "settings", role: "admin" },
      { entity: "pages",  action: "settings_import", role: "admin" },
      { entity: "pages",  action: "settings_apiKey", role: "admin" },
      { entity: "pages",  action: "settings_users", role: "admin" },


      { entity: "users",  action: "view", role: "admin" },
      { entity: "users",  action: "add", role: "admin" },
      { entity: "users",  action: "edit", role: "admin" },
      { entity: "users",  action: "remove", role: "admin" },

      { entity: "apiKey",  action: "view", role: "admin" },

      { entity: "import",  action: "action", role: "admin" },
      
      { entity: "import",  action: "action", role: "admin" },

  ], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
