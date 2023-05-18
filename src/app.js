require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const auth = require("./middlewares/auth");
const config = require("../config");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allow cors to all origins
app.use(cors());

app.use(auth);

const { loadRoutes, connectDb } = require("./helpers");
const nodeApp = app.listen(config.port, async () => {
  await connectDb();
  await loadRoutes(app);

  console.log(`Server is running on port ${nodeApp.address().port}`);
});
