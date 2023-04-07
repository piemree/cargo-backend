const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  il_adi: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("City", CitySchema);
