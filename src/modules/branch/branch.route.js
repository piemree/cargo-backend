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

router.get("/", allowedRoles([roles.admin]), branchController.getAllBranches);
//test
module.exports = router;
