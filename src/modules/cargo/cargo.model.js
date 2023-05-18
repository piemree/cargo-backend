const mongoose = require("mongoose");
const branchModel = require("../branch/branch.model");
const Schema = mongoose.Schema;

const CargoSchema = new Schema({
  registerBranch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  targetBranch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["beklemede", "yolda", "subede", "teslim edildi"],
    default: "beklemede",
  },
  content: {
    type: String,
    required: true,
  },
  wasDelivered: {
    type: Boolean,
    default: false,
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

// every new cargo created add that cargo to the registerBranch's cargos array
CargoSchema.post("save", async function () {
  console.log("post save");
  const cargo = this;
  const branch = await branchModel.findById(cargo.registerBranch);
  branch.cargos.push(cargo._id);
  await branch.save();
});

module.exports = mongoose.model("Cargo", CargoSchema);
