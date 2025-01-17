'use strict';
const {
  Model
} = require('sequelize');
const config = require("../config");
const {TABLE_PREFIX} = config;
module.exports = (sequelize, DataTypes) => {
  class Translation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Translation.belongsTo(models.Language, {foreignKey: "locale_id", targetKey: "id", as: "locale"})
      Translation.belongsTo(models.Key, {foreignKey: "key_id", targetKey: "id", as: "key", onDelete: 'cascade' })
    }
  }
  Translation.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    key_id: {
      type: DataTypes.INTEGER,
      references: { model: {tableName: `${TABLE_PREFIX}_keys` }, key: 'id' },
    },
    locale_id: {
      type: DataTypes.INTEGER,
      references: { model: {tableName: `${TABLE_PREFIX}_languages` }, key: 'id' },
    },
    text: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Translation',
    freezeTableName: true,
    timestamps: false,
    tableName: `${TABLE_PREFIX}_translations`
  });
  return Translation;
};