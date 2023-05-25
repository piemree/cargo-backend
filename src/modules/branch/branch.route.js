const express = require("express");
const branchController = require("./branch.controller.js");
const allowedRoles = require("../../middlewares/allowedRoles");
const { roles } = require("../../../config");
const router = express.Router();

router.post(
  "/create",
  allowedRoles([roles.admin]),
  branchController.createBranch
);
// add personels to branch
router.post(
  "/addPersonels",
  allowedRoles([roles.admin]),
  branchController.addPersonels
);

router.get(
  "/getAllBranches",
  allowedRoles([roles.admin, roles.branchPersonel]),
  branchController.getAllBranches
);

router.get(
  "/getBranchById/:branchId",
  allowedRoles([roles.admin, roles.branchPersonel]),
  branchController.getBranchById
);

// update branch by id
router.put(
  "/updateBranch/:branchId",
  allowedRoles([roles.admin]),
  branchController.updateBranch
);

//delete branch by id
router.delete(
  "/deleteBranch/:branchId",
  allowedRoles([roles.admin]),
  branchController.deleteBranch
);

// get my branch cargos
router.get(
  "/getMyBranchCargos",
  allowedRoles([roles.branchPersonel]),
  branchController.getMyBranchCargos
);

//getMyBranchCargosByTc
router.get(
  "/getMyBranchCargosByTc/:tcNo",
  allowedRoles([roles.branchPersonel]),
  branchController.getMyBranchCargosByTc
);

// get delived cargos
router.get(
  "/getMyBranchDeliveredCargos",
  allowedRoles([roles.branchPersonel]),
  branchController.getMyBranchDeliveredCargos
);

// get my vehicle cargos branch list
router.get(
  "/getMyVehicleCargosBranchList",
  allowedRoles([roles.transportPersonel]),
  branchController.getMyVehicleCargosBranchList
);
module.exports = router;
