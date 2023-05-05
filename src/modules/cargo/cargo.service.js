const cargoModel = require("./cargo.model");

async function create(cargo) {
  return await cargoModel.create(cargo);
}

async function find(query) {
  return await cargoModel
    .find(query)
    .populate("sender", "name surname")
    .populate("receiver", "name surname")
    .populate("registerBranch", "name")
    .populate("targetBranch", "name");
}

async function findOne(query) {
  return await cargoModel
    .findOne(query)
    .populate("sender")
    .populate("receiver")
    .populate("registerBranch")
    .populate("targetBranch");
}

async function findById(id) {
  return await cargoModel
    .findById(id)
    .populate("sender")
    .populate("receiver")
    .populate("registerBranch")
    .populate("targetBranch");
}

module.exports = {
  create,
  find,
  findOne,
  findById,
};
