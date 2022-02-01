'use strict';
const {
  Model
} = require('sequelize');
const config = require("../config");
const {TABLE_PREFIX} = config;
module.exports = (sequelize, DataTypes) => {
  class Key extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Key.belongsTo(models.Namespace, {foreignKey: 'namespace_id', targetKey: "id", as: 'namespace'});
      Key.hasMany(models.Translation, {foreignKey: "key_id", as: 'translations', onDelete: 'cascade' });
    }
  }
  Key.init({
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    namespace_id: {
      type: DataTypes.INTEGER,
      references: { model: {tableName: `${TABLE_PREFIX}_namespaces` }, key: 'id' },
      foreignKey: true,
    }
  }, {
    sequelize,
    modelName: 'Key',
    freezeTableName: true,
    timestamps: false,
    tableName: `${TABLE_PREFIX}_keys`
  });
  return Key;
};