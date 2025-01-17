'use strict';
const {
  Model
} = require('sequelize');
const config = require("../config");
const {TABLE_PREFIX} = config;

module.exports = (sequelize, DataTypes) => {
  class Namespace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Namespace.hasMany(models.Translation, {foreignKey: 'namespace_id', as: 'strings'});
    }
  }
  Namespace.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Namespace',
    freezeTableName: true,
    timestamps: false,
    tableName: `${TABLE_PREFIX}_namespaces`
  });
  return Namespace;
};