const express = require("express");
const {
  getAllFood,
  getFood,
  getAllFoodType,
  addNewFood,
  addNewFoodType,
} = require("../controllers/foodController");
const foodRoute = express.Router();

foodRoute.get("/getAllFood", getAllFood);

foodRoute.get("/getFood/:id", getFood);

foodRoute.get("/getAllFoodType", getAllFoodType);

foodRoute.post("/addNewFood", addNewFood);

foodRoute.post("/addNewFoodType", addNewFoodType);

module.exports = foodRoute;
