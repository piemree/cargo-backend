const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: "Personel",
  },
  licensePlate: {
    type: String,
    required: true,
  },
  cargos: [
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
