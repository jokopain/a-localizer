const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, ".env")});

const {
    DATABASE_HOST = "localhost",
    DATABASE_PORT = 5432,
    DATABASE_NAME = "mydb",
    DATABASE_USERNAME = "root",
    DATABASE_PASSWORD = "root",
    TABLE_PREFIX = "a_localize",
    JWT_SECRET = "mysupersecret",
    APP_PORT = "3001",
    INITIAL_ADMIN_USERNAME = "admin",
    INITIAL_ADMIN_PASSWORD = "root",
} = process.env;

module.exports = {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    TABLE_PREFIX,
    JWT_SECRET,
    APP_PORT,
    INITIAL_ADMIN_USERNAME,
    INITIAL_ADMIN_PASSWORD,
}