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

// delete personel by id
router.delete(
  "/deletePersonel/:personelId",
  allowedRoles([roles.admin]),
  personelController.deletePersonel
);

module.exports = router;
