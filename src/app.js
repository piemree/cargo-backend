require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();

const config = require("../config");

require("./helpers/connectDb");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
