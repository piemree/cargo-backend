require("dotenv").config();
const config = require("../config");
const express = require("express");
require("express-async-errors");

const cors = require("cors");
const auth = require("./middlewares/auth");
const app = express();

const { loadRoutes, connectDb } = require("./helpers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/ping", (req, res) => res.send("pong3"));

app.use(cors(config.corsOptions));
app.use(auth);

app.listen(config.port, async () => {
  await connectDb();
  loadRoutes(app);
  console.log(`Server is running on port ${config.port}`);
});
