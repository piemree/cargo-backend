const userModel = require("./user.model");

async function findOne(query) {
  const user = await userModel.findOne(query);
  return user;
}

module.exports = {
  findOne,
};
