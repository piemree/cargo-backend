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

//reset password
router.post("/customerForgotPassword", authController.customerForgotPassword);

// generate customer reset password view
router.get(
  "/customerForgotPassword",
  authController.customerForgotPasswordView
);

//customerResetPassword?token=asdasd
router.get("/customerResetPassword", authController.customerResetPasswordView);

// reset password
router.post("/customerResetPassword", authController.customerResetPassword);

// personel forgot password
router.post("/personelForgotPassword", authController.personelForgotPassword);

// generate personel forgot password view
router.get(
  "/personelForgotPassword",
  authController.personelForgotPasswordView
);

// generate personel reset password view
router.get("/personelResetPassword", authController.personelResetPasswordView);

// reset password
router.post("/personelResetPassword", authController.personelResetPassword);

router.get(
  "/customer/getProfile",
  allowedRoles([roles.customer]),
  authController.getProfile
);

//update customer profile
router.post(
  "/updateCustomer",
  allowedRoles([roles.customer]),
  authController.updateCustomer
);

module.exports = router;
