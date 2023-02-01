const express = require("express");
const foodRoute = require("./foodRoute");
const orderRoute = require("./orderRouter");
const resRouter = require("./restaurantRoute");
const userRoute = require("./userRoute");
const rootRoute = express.Router();

//middleware
rootRoute.use("/user", userRoute);
rootRoute.use("/food", foodRoute);
rootRoute.use("/res", resRouter);
rootRoute.use("/orders", orderRoute);

module.exports = rootRoute;
