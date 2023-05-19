const express = require("express");
const cityController = require("./city.controller");
const allowedRoles = require("../../middlewares/allowedRoles");
const { roles } = require("../../../config");
const router = express.Router();

router.get(
  "/",
  allowedRoles([roles.admin, roles.branchPersonel]),
  cityController.getAllCities
);

// import All cities
router.post(
  "/importCities",
  allowedRoles([roles.admin]),
  cityController.importCities
);

module.exports = router;
