'use strict';
const config = require("../config");
const {TABLE_PREFIX} = config
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        `${TABLE_PREFIX}_translations`,
        `${TABLE_PREFIX}_translations_key_id_fkey`,
        { transaction }
      );
      await queryInterface.addConstraint(`${TABLE_PREFIX}_translations`, {
        fields: ['key_id'],
        type: 'foreign key',
        name: `${TABLE_PREFIX}_translations_key_id_fkey`,
        references: {
          table: `${TABLE_PREFIX}_keys`,
          field: 'id',
        },
        onDelete: 'CASCADE',
        transaction
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {

  },
};