const { Sequelize } = require("sequelize");
const {
  database,
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
  dbDialect,
} = require("../config/index");

//hàm kết nối csdl
require("dotenv").config();
const sequelize = new Sequelize(database, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect, //hệ csdl đang sử dụng
});

const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  port: dbPort,
  database: database,
});

module.exports = { sequelize, conn };
