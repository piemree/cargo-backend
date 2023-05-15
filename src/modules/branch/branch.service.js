const branchModel = require("./branch.model");

async function create(branch) {
  return await branchModel.create(branch);
}

async function find(query) {
  return await branchModel.find(query);
}

async function findOne(query) {
  return await branchModel.findOne(query);
}

async function findById(id) {
  return await branchModel.findById(id);
}

async function addPersonels(branchId, personelIds) {
  return await branchModel.findOneAndUpdate(
    { _id: branchId },
    { $push: { personels: personelIds } },
    { new: true }
  );
}
// find branch by personel id
async function findBranchByPersonelId(personelId) {
  return await branchModel.findOne({ personels: personelId });
}

async function updateOne(id, updateBody) {
  return await branchModel.updateOne({ _id: id }, updateBody);
}

//update by personel id
async function updateByPersonelId(personelId, updateBody) {
  return await branchModel.updateOne({ personels: personelId }, updateBody);
}
module.exports = {
  create,
  find,
  findOne,
  findById,
  addPersonels,
  findBranchByPersonelId,
  updateOne,
  updateByPersonelId,
};
