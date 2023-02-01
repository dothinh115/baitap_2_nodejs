const express = require("express");
const { addNewOrder } = require("../controllers/orderController");
const orderRoute = express.Router();

orderRoute.use("/addOrder", addNewOrder);

module.exports = orderRoute;
