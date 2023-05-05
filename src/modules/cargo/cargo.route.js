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

module.exports = router;
