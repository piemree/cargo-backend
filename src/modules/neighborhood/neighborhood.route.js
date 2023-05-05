const express = require("express");
const neighborhoodController = require("./neighborhood.controller.js");
const router = express.Router();

router.get("/", neighborhoodController.getAllNeighborhoods);
// updatePersonel
module.exports = router;
