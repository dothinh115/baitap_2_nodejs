const express = require("express");
const {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const userRoute = express.Router();

//Tạo api
userRoute.get("/getAllUsers", getAllUsers);

userRoute.get("/getUser/:id", getUser);

userRoute.post("/createUser", createUser);

userRoute.delete("/deleteUser/:id", deleteUser);

userRoute.put("/updateUser/:id", updateUser);

module.exports = userRoute;
