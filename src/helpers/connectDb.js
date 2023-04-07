const mongoose = require("mongoose");
const config = require("../../config/index");
const logger = require("../logger");
const db = config.database;
const connectionUrl = `${db.url}/${db.name}`;

module.exports = async function () {
  try {
    await mongoose.connect(connectionUrl, config.mongoOptions);
    logger.info("Connected to Database");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
