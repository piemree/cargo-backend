const redis = require("redis");
const config = require("../../config");

function connectRedis() {
  return new Promise((resolve, reject) => {
    const client = redis.createClient(config.redisOptions);
    client.on("ready", () => {
      console.log("Redis is ready");
    });

    client.on("connect", () => {
      console.log("Connected to Redis");
      resolve(client);
    });

    client.on("error", (err) => {
      console.log(`Error connecting to Redis ${err}`);
      reject(err);
    });
  });
}

module.exports = connectRedis;
