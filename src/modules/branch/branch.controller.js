const branchService = require("./branch.service");
const personelService = require("../personel/personel.service");

async function createBranch(req, res) {
  const branch = req.body;

  const createdBranch = await branchService.create(branch);
  res.status(201).json({
    success: true,
    data: createdBranch,
  });
}

async function getAllBranches(req, res) {
  const query = req.query;
  const branches = await branchService.find(query);
  res.status(200).json({
    success: true,
    data: branches,
  });
}

async function addPersonels(req, res) {
  const { branchId, personelIds } = req.body;
  await branchService.removePersonelsFromAllBranches(branchId, personelIds);
  const branchRequest = branchService.addPersonels(branchId, personelIds);
  // update personel branch field
  const personelRequest = personelService.updateMany(
    { _id: { $in: personelIds } },
    { branch: branchId }
  );

  await Promise.all([branchRequest, personelRequest]);

  res.status(200).json({
    success: true,
  });
}

// get branch by id
async function getBranchById(req, res) {
  const { branchId } = req.params;
  const branch = await branchService.findById(branchId);
  if (!branch) throw new AppError("Branch not found", 404);
  res.status(200).json({
    success: true,
    data: branch,
  });
}

// update branch by id
async function updateBranch(req, res) {
  const { branchId } = req.params;
  const updateBody = req.body;

  const updatedBranch = await branchService.updateOne(branchId, updateBody);
  res.status(200).json({
    success: true,
    data: updatedBranch,
  });
}

async function deleteBranch(req, res) {
  const { branchId } = req.params;
  const branch = await branchService.findOne({ _id: branchId });
  if (!branch) throw new AppError("Branch not found", 404);
  // if branch has cargos, throw error
  if (branch.cargos.length > 0 || branch.waitingCargos.length > 0) {
    throw new AppError("Branch has cargos, can not delete", 400);
  }

  // delete branch to personels
  if (branch.personels.length > 0) {
    await personelService.updateMany(
      { _id: { $in: branch.personels } },
      { branch: null }
    );
  }

  await branchService.deleteOne(branchId);
  res.status(200).json({
    success: true,
  });
}

module.exports = {
  createBranch,
  getAllBranches,
  addPersonels,
  getBranchById,
  updateBranch,
  deleteBranch,
};
