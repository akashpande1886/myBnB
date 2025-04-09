const path = require("path");
const express = require("express");
const rootDir = require("../utils/pathUtils");
const storeRouter = express.Router();
const {registeredHomes} = require("./hostRouter");
const storeController = require("../controllers/store.controller");

storeRouter.get("/",storeController.getIndex);
storeRouter.get("/homes",storeController.getHome);
storeRouter.get("/bookings",storeController.getBookings);
storeRouter.get("/favourites",storeController.getFavouriteList);
storeRouter.post("/favourites",storeController.postAddToFavouriteList);
storeRouter.get("/index",storeController.getIndex);
storeRouter.get("/homes/:homeId",storeController.getHomeDetails);
module.exports = storeRouter;
