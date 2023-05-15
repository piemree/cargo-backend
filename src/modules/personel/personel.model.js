const mongoose = require("mongoose");
const vehicleModel = require("../vehicle/vehicle.model");
const branchModel = require("../branch/branch.model");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const PersonelSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  tcNo: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: [
      "branchPersonel",
      "transportPersonel",
      "customerServicePersonel",
      "admin",
    ],
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    validate: {
      validator: async function (v) {
        if (this.role === "transportPersonel") {
          const vehicle = await vehicleModel.findById(v);
          if (vehicle) return true;
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

PersonelSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

PersonelSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Personel", PersonelSchema);
