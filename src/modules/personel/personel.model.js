const mongoose = require("mongoose");
const vehicleModel = require("../vehicle/vehicle.model");
const branchModel = require("../branch/branch.model");
const Schema = mongoose.Schema;

const PersonelSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "branchPersonel",
      "transportPersonel",
      "customerServicePersonel",
      "adminPersonel",
    ],
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    validate: {
      validator: async function (v) {
        if (this.type === "transportPersonel") {
          const vehicle = await vehicleModel.findById(v);
          if (vehicle) return true;
          else return false;
        } else {
          return v === null;
        }
      },
    },
  },
  branch: {
    // if type is branchPersonel, branch is required
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    validate: {
      validator: async function (v) {
        if (this.type === "branchPersonel") {
          const branch = await branchModel.findById(v);
          if (branch) return true;
          else return false;
        } else {
          return v === null;
        }
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Personel", PersonelSchema);