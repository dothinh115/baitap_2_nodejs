const express = require("express");
const {
  getAllRes,
  likeRes,
  unLikeRes,
  getLikedRes,
} = require("../controllers/restaurantController");
const resRouter = express.Router();

resRouter.get("/getAllRes", getAllRes);

resRouter.post("/likeRes", likeRes);

resRouter.post("/unlikeRes", unLikeRes);

resRouter.get("/getLikedRes/:user_id", getLikedRes);

module.exports = resRouter;
