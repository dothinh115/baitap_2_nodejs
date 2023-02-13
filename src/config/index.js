//biến toàn cục process = window
require("dotenv").config();
module.exports = {
  database: process.env.DATABASE,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
};
