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
  const branch = await branchModel.findById(branchId);
  branch.personels.push(...personelIds);
  return await branch.save();
}
// find branch by personel id
async function findBranchByPersonelId(personelId) {
  return await branchModel.findOne({ personels: personelId });
}
module.exports = {
  create,
  find,
  findOne,
  findById,
  addPersonels,
  findBranchByPersonelId,
};
