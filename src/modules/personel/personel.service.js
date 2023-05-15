const personelModel = require("./personel.model");

async function findOne(query) {
  return await personelModel.findOne(query);
}

async function findById(id) {
  return await personelModel.findById(id);
}

async function findAll() {
  return await personelModel.find().select("-password");
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

module.exports = {
  findOne,
  findAll,
  create,
  findById,
  findByIdAndUpdate,
  updateOne,
};
