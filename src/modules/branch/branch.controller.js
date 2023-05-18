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

module.exports = {
  createBranch,
  getAllBranches,
  addPersonels,
};
