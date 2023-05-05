const express = require("express");
const districtController = require("./district.controller.js");
const router = express.Router();

router.get("/", districtController.getAllDistricts);
// updatePersonel
module.exports = router;
