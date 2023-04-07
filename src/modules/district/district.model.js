const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  il_id: {
    type: Number,
    required: true,
    ref: "Cities",
  },
  il_adi: {
    type: String,
    required: true,
  },
  ilce_adi: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("District", DistrictSchema);
