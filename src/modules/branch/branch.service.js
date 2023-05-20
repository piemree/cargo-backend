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
  return await branchModel
    .findById(id)
    .populate("personels", "-password")
    .populate({
      path: "cargos",
      populate: {
        path: "sender receiver",
      },
    })
    .populate({
      path: "waitingCargos",
      populate: {
        path: "sender receiver",
      },
    });
}

async function addPersonels(branchId, personelIds) {
  return await branchModel.findOneAndUpdate(
    { _id: branchId },
    { $addToSet: { personels: { $each: personelIds } } },
    { new: true }
  );
}
// find branch by personel id
async function findBranchByPersonelId(personelId) {
  return await branchModel.findOne({ personels: personelId });
}

async function updateOne(id, updateBody) {
  return await branchModel
    .findByIdAndUpdate(id, updateBody, { new: true })
    .populate("personels", "-password")
    .populate("cargos")
    .populate("waitingCargos");
}

//update by personel id
async function updateByPersonelId(personelId, updateBody) {
  return await branchModel.updateOne({ personels: personelId }, updateBody);
}

async function removePersonelsFromAllBranches(excludeBranchId, personelIds) {
  return await branchModel.updateMany(
    { personels: { $in: personelIds }, _id: { $ne: excludeBranchId } },
    { $pullAll: { personels: personelIds } }
  );
}

async function deleteOne(id) {
  return await branchModel.findByIdAndDelete(id);
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
  removePersonelsFromAllBranches,
  deleteOne,
};
