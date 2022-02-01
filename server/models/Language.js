'use strict';
const {
  Model
} = require('sequelize');

const config = require("../config");
const {TABLE_PREFIX} = config;

module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Language.hasMany(models.Namespace, {foreignKey: 'namespace_id', as: 'strings'});
    }
  }
  Language.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Language',
    freezeTableName: true,
    timestamps: false,
    tableName: `${TABLE_PREFIX}_languages`
  });
  return Language;
};