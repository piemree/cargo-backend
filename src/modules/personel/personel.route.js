const express = require("express");
const personelController = require("./personel.controller");
const allowedRoles = require("../../middlewares/allowedRoles");
const { roles } = require("../../../config");
const router = express.Router();

router.get(
  "/getAllPersonels",
  allowedRoles([roles.admin]),
  personelController.getAllPersonels
);
// add vehicle to personel
router.put(
  "/assignVehicleToPersonel",
  allowedRoles([roles.admin]),
  personelController.assignVehicleToPersonel
);
module.exports = router;