const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    require: true,
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
      validate: {
        validator: async function (v) {
          const personel = await personelModel.findById(v);
          return personel && personel.role === "branchPersonel";
        },
      },
    },
  ],
  cargos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cargo",
    },
  ],
  waitingCargos: [
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
