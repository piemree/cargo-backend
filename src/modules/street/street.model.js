const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StreetSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  il_id: {
    type: Number,
    required: true,
    ref: "Cities",
  },
  ilce_id: {
    type: Number,
    required: true,
    ref: "Districts",
  },
  mahalle_id: {
    type: Number,
    required: true,
    ref: "Neighborhood",
  },
  il_adi: {
    type: String,
    required: true,
  },
  ilce_adi: {
    type: String,
    required: true,
  },
  mahalle_adi: {
    type: String,
    required: true,
  },
  sokak_adi: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Street", StreetSchema);
