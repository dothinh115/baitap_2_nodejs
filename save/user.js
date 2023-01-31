const { DataTypes, Model } = require("sequelize");
const sequelize = require("../src/models/index");

class User extends Model {}

//map đến table users

User.init(
  {
    user_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
      length: 100,
    },
    email: {
      type: DataTypes.STRING,
      length: 100,
      validate: {
        isEmail: {
          msg: "Email không đúng định dạng.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      length: 100,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;

// update
// create
