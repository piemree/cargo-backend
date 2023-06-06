const { roles } = require("../../../config");
const ticketService = require("./ticket.service");

async function create(req, res, next) {
  const { title, subject, message, cargo } = req.body;
  const user = req.user;
  const ticket = await ticketService.create({
    customer: user._id,
    cargo,
    title,
    subject,
    messages: [
      {
        sender: user.role,
        message,
      },
    ],
  });
  res.json({
    success: true,
  });
}

async function getMyTickets(req, res, next) {
  const user = req.user;
  const tickets = await ticketService.find({ customer: user._id });
  res.json({
    success: true,
    data: tickets,
  });
}

async function getTicket(req, res, next) {
  const { id } = req.params;
  const user = req.user;
  const ticket = await ticketService.findOne({ _id: id });
  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
  if (
    user.role === roles.customer &&
    ticket.customer?.toString() !== user._id
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to see this ticket",
    });
  }

  res.json({
    success: true,
    data: ticket,
  });
}

async function sendMessage(req, res, next) {
  const { id } = req.params;
  const { message } = req.body;
  const user = req.user;
  const ticket = await ticketService.findOne({ _id: id, status: "open" });
  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
  if (
    user.role === roles.customer &&
    ticket.customer?.toString() !== user._id
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to see this ticket",
    });
  }
  ticket.messages.push({
    sender: user.role,
    message,
  });
  await ticket.save();
  res.json({
    success: true,
    data: ticket,
  });
}
async function closeTicket(req, res, next) {
  const { id } = req.params;
  const user = req.user;
  const ticket = await ticketService.findOne({ _id: id, status: "open" });
  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
  if (
    user.role === roles.customer &&
    ticket.customer?.toString() !== user._id
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to see this ticket",
    });
  }
  if (
    user.role === roles.customerServicePersonel &&
    ticket?.personel?.toString() !== user._id
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to see this ticket",
    });
  }
  ticket.status = "closed";
  await ticket.save();
  res.json({
    success: true,
    data: ticket,
  });
}

async function assignTicket(req, res, next) {
  const { id } = req.params;
  const personelId = req.user._id;
  const ticket = await ticketService.findOne({ _id: id, status: "open" });
  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
  if (ticket.personel) {
    return res.status(400).json({
      success: false,
      message: "Ticket already assigned",
    });
  }
  ticket.personel = personelId;
  await ticket.save();
  res.json({
    success: true,
    data: ticket,
  });
}

async function getAllActiveTickets(req, res, next) {
  const tickets = await ticketService.find({ status: "open" });
  res.json({
    success: true,
    data: tickets,
  });
}

module.exports = {
  create,
  getMyTickets,
  getTicket,
  sendMessage,
  closeTicket,
  assignTicket,
  getAllActiveTickets,
};
