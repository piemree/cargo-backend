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

router.get(
  "/getAvailableVehicles",
  allowedRoles([roles.admin, roles.branchPersonel]),
  vehicleController.getAvailableVehicles
);

// assign vehicle to personel
router.post(
  "/assignVehicleToPersonel",
  allowedRoles([roles.admin]),
  vehicleController.assignVehicleToPersonel
);

//delete vehicle by id
router.delete(
  "/deleteVehicle/:vehicleId",
  allowedRoles([roles.admin]),
  vehicleController.deleteVehicle
);

//giveCargosToBranch
router.post(
  "/giveCargosToBranch",
  allowedRoles([roles.transportPersonel]),
  vehicleController.giveCargosToBranch
);

module.exports = router;
