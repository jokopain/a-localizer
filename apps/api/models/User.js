'use strict';
const {
  Model
} = require('sequelize');
const crypto = require("crypto");
const config = require("../config");
const {TABLE_PREFIX} = config;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.ACLRule, { sourceKey: "role", foreignKey: "role", as: 'rules' });
    }

    static formateRules(rules){
      return rules.map(rule => `${rule.entity}:${rule.action}`)
    }

    static generatePasswordHash(password){
      return crypto.createHash('sha256').update(password).digest('base64')
    }

  }
  User.init({
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    hashed_password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    timestamps: false,
    tableName: `${TABLE_PREFIX}_users`
  });
  return User;
};