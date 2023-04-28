require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const auth = require("./middlewares/auth");
const config = require("../config");
const app = express();

const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");

const { loadRoutes, connectDb } = require("./helpers");
const logger = require("./logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let redisClient = redis.createClient(config.redisOptions);
redisClient
  .connect()
  .then(() => logger.info("Connected to Redis"))
  .catch((err) => logger.error(err));

let redisStore = new RedisStore({
  client: redisClient,
});

app.use(cors(config.corsOptions));
app.use(
  session({
    store: redisStore,
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(auth);

const nodeApp = app.listen(config.port, async () => {
  await connectDb();
  await loadRoutes(app);

  console.log(`Server is running on port ${nodeApp.address().port}`);
});
