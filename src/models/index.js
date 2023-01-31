const { Sequelize } = require("sequelize");

//hàm kết nối csdl

const sequelize = new Sequelize("baitap_1_nodejs", "root", "1234", {
  host: "localhost",
  port: 3306,
  dialect: "mysql", //hệ csdl đang sử dụng
});

const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  port: 3306,
  database: "baitap_1_nodejs",
});

module.exports = { sequelize, conn };
