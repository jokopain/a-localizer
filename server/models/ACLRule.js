'use strict';
const {
  Model
} = require('sequelize');
const config = require("../config");
const {TABLE_PREFIX} = config;

module.exports = (sequelize, DataTypes) => {
  class ACLRule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ACLRule.init({
    entity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ACLRule',
    freezeTableName: true,
    timestamps: false,
    tableName: `${TABLE_PREFIX}_acl_rules`
  });
  return ACLRule;
};