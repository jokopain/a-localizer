const config = require("./config");

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD
} = config

module.exports = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    },
    seederStorage: "sequelize",
    logging: false
  },
  test: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    }
  }
};