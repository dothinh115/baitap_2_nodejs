const express = require("express");
const foodRoute = require("./foodRoute");
const resRouter = require("./restaurantRoute");
const userRoute = require("./userRoute");
const rootRoute = express.Router();

//middleware
rootRoute.use("/user", userRoute);
rootRoute.use("/food", foodRoute);
rootRoute.use("/res", resRouter);

module.exports = rootRoute;
