const express = require("express");


const hostRouter = express.Router();

const hostController= require("../controllers/host.controller.js");


hostRouter.get("/add-home",hostController.getAddHome);

hostRouter.post("/add-home",hostController.postAddHome);
hostRouter.get("/host-home-list",hostController.getHostHomes);

module.exports = hostRouter;





    // exports.registeredHomes = registeredHomes;
    // module.exports = {hostRouter,registeredHomes};
