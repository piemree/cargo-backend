const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  personel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personel",
    required: false,
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
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ["customer", "customerServicePersonel"],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
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
