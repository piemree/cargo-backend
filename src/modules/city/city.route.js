const express = require("express");
const cityController = require("./city.controller.js");
const router = express.Router();

router.get("/", cityController.getAllCities);
// updatePersonel
module.exports = router;
