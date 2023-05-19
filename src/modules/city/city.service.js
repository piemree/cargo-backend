const cityModel = require("./city.model");

async function find(query) {
  return await cityModel.find(query);
}

//bulkCreate
async function bulkCreate(cities) {
  return await cityModel.insertMany(cities);
}

module.exports = {
  find,
  bulkCreate,
};
