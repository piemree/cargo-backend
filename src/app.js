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

const counters = {};

app.get("/ping", (req, res) => {
  const ip = req.ip;
  if (!counters[ip]) {
    counters[ip] = 1;
  } else {
    counters[ip]++;
  }
  res.send(`Bu IP adresi (${ip}) ile ${counters[ip]} defa istek yapıldı.`);
});

app.use(cors(config.corsOptions));
app.use(auth);

app.listen(config.port, async () => {
  await connectDb();
  loadRoutes(app);
  console.log(`Server is running on port ${config.port}`);
});
