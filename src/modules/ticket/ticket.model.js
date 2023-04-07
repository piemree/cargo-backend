const mongoose = require("mongoose");
const { MessageSchema } = require("../message/message.model");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  personel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personel",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  cargo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cargo",
    required: false,
  },
  subject: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: MessageSchema,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
