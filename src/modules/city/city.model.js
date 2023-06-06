const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  il_adi: {
    type: String,
    required: true,
    unique: true,
  },
  plaka_kodu: {
    type: String,
    required: true,
    unique: true,
  },
  ilceler: {
    type: Array,
    required: true,
    items: {
      type: String,
      uniqueItems: true,
    },
  },
});

module.exports = mongoose.model("City", CitySchema);


