const districtModel = require("./district.model");

async function find(query) {
  return await districtModel.find(query);
}

module.exports = {
  find,
};
