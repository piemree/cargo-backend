const mongoose = require("mongoose");
const personelModel = require("../personel/personel.model");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: "Personel",
    validate: {
      validator: async function (v) {
        const personel = await personelModel.findById(v);
        return personel && personel.role === "transportPersonel";
      },
    },
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
