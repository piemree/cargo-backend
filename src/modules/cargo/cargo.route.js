const express = require("express");
const cargoController = require("./cargo.controller");
const allowedRoles = require("../../middlewares/allowedRoles");
const { roles } = require("../../../config");
const router = express.Router();

router.post(
  "/create",
  allowedRoles([roles.branchPersonel]),
  cargoController.createCargo
);

//get all cargos
router.get(
  "/getAllCargos",
  allowedRoles([roles.admin]),
  cargoController.getAllCargos
);

// getAllSendedCargos
router.get(
  "/getMySendedCargos",
  allowedRoles([roles.customer]),
  cargoController.getMySendedCargos
);

// give cargo to vehicle
router.post(
  "/giveCargosToVehicle",
  allowedRoles([roles.branchPersonel]),
  cargoController.giveCargosToVehicle
);

// give cargo to branch
router.post(
  "/giveCargosToBranch",
  allowedRoles([roles.transportPersonel]),
  cargoController.giveCargosToBranch
);

//giveCargoToCustomer
router.post(
  "/giveCargoToCustomer",
  allowedRoles([roles.branchPersonel]),
  cargoController.giveCargoToCustomer
);
router.get(
  "/getMyRecievedCargos",
  allowedRoles([roles.customer]),
  cargoController.getMyRecievedCargos
);
router.get(
  "/getMyVehicleCargos",
  allowedRoles([roles.transportPersonel]),
  cargoController.getMyVehicleCargos
);

router.get(
  "/getMyVehicleCurrentCargos",
  allowedRoles([roles.transportPersonel]),
  cargoController.getMyVehicleCurrentCargos
);


module.exports = router;
