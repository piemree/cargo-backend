const cityModel = require("./city.model");

async function find(query) {
  return await cityModel.find(query);
}

module.exports = {
  find,
};
