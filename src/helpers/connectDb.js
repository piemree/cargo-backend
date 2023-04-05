const mongoose = require("mongoose");
const config = require("../../config/index");
const db = config.database;
const connectionUrl = `${db.url}/${db.name}`;

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
