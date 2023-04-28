const redis = require("redis");
const config = require("../../config");
const logger = require("../logger");

function connectRedis() {
  return new Promise((resolve, reject) => {
    const client = redis.createClient(config.redisOptions);
    client.on("ready", () => {
      logger.info("Redis is ready");
    });

    client.on("connect", () => {
      logger.info("Connected to Redis");
      resolve(client);
    });

    client.on("error", (err) => {
      logger.error(err);
      reject(err);
    });
  });
}

module.exports = connectRedis;
