const streetModel = require("./street.model");

async function find(query) {
  return await streetModel.find(query);
}

module.exports = {
  find,
};
