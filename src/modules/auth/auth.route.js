const express = require("express");
const authController = require("./auth.controller");
const router = express.Router();

router.post("/personel/login", authController.personelLogin);

module.exports = router;
