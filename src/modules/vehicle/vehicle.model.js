const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  licensePlate: {
    type: String,
    required: true,
  },
  cargoCapacity: {
    type: Number,
    required: true,
  },
  cargoos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cargo",
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

module.exports = mongoose.model("Vehicle", VehicleSchema);
