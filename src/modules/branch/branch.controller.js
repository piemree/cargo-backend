const branchService = require("./branch.service");
const personelService = require("../personel/personel.service");
const cargoService = require("../cargo/cargo.service");

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

async function getMyBranchCargos(req, res) {
  console.log(req.user);
  const cargos = await cargoService.find({
    registerBranch: req.user?.branch,
    status: "beklemede",
  });

  res.status(200).json({
    success: true,
    data: cargos,
  });
}

// get cargo in branch by uesr tcNo
async function getMyBranchCargosByTc(req, res) {
  const tcNo = req.params.tcNo;
  const cargos = await cargoService.find({
    targetBranch: req.user?.branch,
    status: "subede",
  });
  // filter cargos by tcNo
  const filteredCargos = cargos.filter(
    (cargo) => cargo?.receiver?.tcNo === tcNo
  );

  res.status(200).json({
    success: true,
    data: filteredCargos,
  });
}

async function getMyBranchDeliveredCargos(req, res) {
  const branch = req.user.branch;
  const cargos = await cargoService.find({
    targetBranch: branch,
    wasDelivered: true,
  });
  res.status(200).json({
    success: true,
    data: cargos,
  });
}

async function getMyVehicleCargosBranchList(req, res) {
  const vehicle = req.user.vehicle
  const cargos = await cargoService.find({
    vehicle: vehicle,
    status: "yolda",
  });
  const branchList = cargos.map(cargo => cargo.targetBranch)
  const branchSet = new Set(branchList)
 
  res.status(200).json({
    success: true,
    data: Array.from(branchSet),
  });
}

module.exports = {
  createBranch,
  getAllBranches,
  addPersonels,
  getBranchById,
  updateBranch,
  deleteBranch,
  getMyBranchCargos,
  getMyBranchCargosByTc,
  getMyBranchDeliveredCargos,
  getMyVehicleCargosBranchList
};
