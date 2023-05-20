const ticketModel = require("./ticket.model");

async function deleteMany(query) {
  return await ticketModel.deleteMany(query);
}

async function find(query = {}) {
  return await ticketModel.find(query);
}

async function updateMany(query, updateBody) {
  return await ticketModel.updateMany(query, updateBody);
}

module.exports = {
  deleteMany,
  find,
  updateMany,
};
