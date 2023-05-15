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

module.exports = router;
