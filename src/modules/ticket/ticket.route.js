const express = require("express");
const ticketController = require("./ticket.controller");
const allowedRoles = require("../../middlewares/allowedRoles");
const { roles } = require("../../../config");
const router = express.Router();

router.post("/create", allowedRoles([roles.customer]), ticketController.create);

//get my tickets
router.get(
  "/getMyTickets",
  allowedRoles([roles.customer]),
  ticketController.getMyTickets
);

//get one ticket
router.get(
  "/getTicket/:id",
  allowedRoles([roles.customer, roles.customerServicePersonel]),
  ticketController.getTicket
);

// add message to ticket
router.post(
  "/sendMessage/:id",
  allowedRoles([roles.customer, roles.customerServicePersonel]),
  ticketController.sendMessage
);

// close ticket
router.post(
  "/closeTicket/:id",
  allowedRoles([roles.customer, roles.customerServicePersonel]),
  ticketController.closeTicket
);

// assign ticket to personel
router.post(
  "/assignTicket/:id",
  allowedRoles([roles.customerServicePersonel]),
  ticketController.assignTicket
);

//getAllTickets
router.get(
  "/getAllActiveTickets",
  allowedRoles([roles.customerServicePersonel]),
  ticketController.getAllActiveTickets
);


module.exports = router;
