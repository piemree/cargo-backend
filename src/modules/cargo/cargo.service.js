const cargoModel = require("./cargo.model");

async function create(cargo) {
  return await cargoModel.create(cargo);
}

async function find(query) {
  return await cargoModel.find(query);
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

async function updateOne(id, updateBody) {
  return await cargoModel.updateOne({ _id: id }, updateBody);
}

async function updateMany(ids, updateBody) {
  return await cargoModel.updateMany({ _id: { $in: ids } }, updateBody);
}

module.exports = {
  create,
  find,
  findOne,
  findById,
  updateOne,
  updateMany,
};
