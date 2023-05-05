const neighborhoodModel = require("./neighborhood.model");

async function find(query) {
  return await neighborhoodModel.find(query);
}

module.exports = {
  find,
};
