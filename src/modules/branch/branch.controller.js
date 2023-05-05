const branchService = require("./branch.service");

async function createBranch(req, res) {
  const branch = req.body;

  const createdBranch = await branchService.create(branch);
  res.status(201).json(createdBranch);
}

async function getAllBranches(req, res) {
  const query = req.query;
  const branches = await branchService.find(query);
  res.status(200).json(branches);
}

async function addPersonels(req, res) {
  const { branchId, personelIds } = req.body
  const branch = await branchService.addPersonels(branchId, personelIds);
  res.status(200).json(branch);
}

module.exports = {
  createBranch,
  getAllBranches,
  addPersonels,
};
