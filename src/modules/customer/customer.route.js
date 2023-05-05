const express = require("express");
const customerController = require("./customer.controller");
const router = express.Router();

router.get("/me", customerController.getMe);

router.get("/me/orders", customerController.getMyCargos);

module.exports = router;
