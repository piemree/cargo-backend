const express = require("express");
const vehicleController = require("./vehicle.controller");
const allowedRoles = require("../../middlewares/allowedRoles");
const { roles } = require("../../../config");
const router = express.Router();

router.post(
  "/createVehicle",
  allowedRoles([roles.admin]),
  vehicleController.createVehicle
);

// get all vehicles
router.get(
  "/getAllVehicles",
  allowedRoles([roles.admin]),
  vehicleController.getAllVehicles
);


// assign vehicle to personel
router.post(
  "/assignVehicleToPersonel",
  allowedRoles([roles.admin]),
  vehicleController.assignVehicleToPersonel
);
module.exports = router;
