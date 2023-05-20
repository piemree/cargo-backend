const personelModel = require("./personel.model");

async function findOne(query) {
  return await personelModel.findOne(query);
}

async function findById(id) {
  return await personelModel.findById(id);
}

async function findAll(query) {
  return await personelModel
    .find({ ...query })
    .select("-password")
    .populate("vehicle", "licensePlate")
    .populate("branch", "name");
}

async function create(personel = {}) {
  return await personelModel.create(personel);
}

async function findByIdAndUpdate(id, updateBody) {
  return await personelModel.findByIdAndUpdate(id, updateBody);
}

async function updateOne(query, updateBody) {
  return await personelModel.updateOne(query, updateBody);
}

async function updateMany(query, updateBody) {
  return await personelModel.updateMany(query, updateBody);
}

async function deleteOne(id) {
  return await personelModel.deleteOne({ _id: id });
}

module.exports = {
  findOne,
  findAll,
  create,
  findById,
  findByIdAndUpdate,
  updateOne,
  updateMany,
  deleteOne,
};
