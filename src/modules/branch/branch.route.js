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
  allowedRoles([roles.admin]),
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

//test
module.exports = router;
