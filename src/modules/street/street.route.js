const express = require("express");
const streetController = require("./street.controller.js");
const router = express.Router();

router.get("/", streetController.getAllstreets);
// updatePersonel
module.exports = router;
