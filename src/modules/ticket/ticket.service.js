const ticketModel = require("./ticket.model");

async function deleteMany(query) {
  return await ticketModel.deleteMany(query);
}

async function find(query = {}) {
  return await ticketModel.find(query);
}

async function findOne(query) {
  return await ticketModel.findOne(query).populate("cargo");
}

async function updateMany(query, updateBody) {
  return await ticketModel.updateMany(query, updateBody);
}

async function create(ticket) {
  return await ticketModel.create(ticket);
}

module.exports = {
  deleteMany,
  find,
  updateMany,
  create,
  findOne,
};
