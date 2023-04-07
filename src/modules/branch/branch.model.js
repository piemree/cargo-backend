const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Personel = require("../personel/personel.model");

const BranchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: Number,
    ref: "Street",
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  personels: [
    {
      type: Schema.Types.ObjectId,
      ref: "Personel",
      unique: true,
      validate: {
        validator: function (v) {
          Personel.findById(v).then((personel) => {
            if (personel.type === "branchPersonel") {
              return true;
            } else {
              return false;
            }
          });
        },
        message: "Personel type must be branchPersonel",
      },
    },
  ],
  cargos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cargo",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model("Branch", BranchSchema);
