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
  location: {
    type: Number,
    ref: "Street",
    required: true,
    validate: {
      validator: async function (v) {
        const branch = await branchModel.find({ address: v });
        if (branch) return true;
        else return false;
      },
    },
  },
  status: {
    type: String,
    required: true,
    enum: ["beklemede", "yolda", "teslim edildi"],
  },
  content: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("Cargo", CargoSchema);

CargoSchema.pre("save", function (next) {
  const cargo = this;
  const desi =
    ((cargo.height + cargo.width + cargo.length) * cargo.weight) / 6000;
  const price = desi * 3;
  cargo.totalPrice = price;
  next();
});
