'use strict';
const {
  Model
} = require('sequelize');
const config = require("../config");
const {TABLE_PREFIX} = config;
module.exports = (sequelize, DataTypes) => {
  class APIKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  APIKey.init({
    api_key: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'APIKey',
    freezeTableName: true,
    timestamps: false,
    tableName: `${TABLE_PREFIX}_api_keys`
  });
  return APIKey;
};