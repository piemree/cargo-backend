const express = require("express");
const authController = require("./auth.controller");
const allowedRoles = require("../../middlewares/allowedRoles");
const { roles } = require("../../../config");
const router = express.Router();

router.post("/personel/login", authController.personelLogin);

router.post(
  "/personel/register",
  allowedRoles([roles.admin]),
  authController.personelRegister
);

router.post("/customer/login", authController.customerLogin);
router.post("/customer/register", authController.customerRegister);

router.get("/me", authController.getMe);

module.exports = router;
