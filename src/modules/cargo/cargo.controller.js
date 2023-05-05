const branchService = require("../branch/branch.service");
const cargoService = require("./cargo.service");

async function createCargo(req, res) {
  const cargo = req.body;
  const branch = await branchService.findBranchByPersonelId(req.user.id);
  cargo.registerBranch = branch._id;
  const createdCargo = await cargoService.create(cargo);
  res.status(201).json(createdCargo);
}

async function getMySendedCargos(req, res) {
  const userId = req.user.id;
  const cargos = await cargoService.find({ sender: userId });
  res.status(200).json(cargos);
}

module.exports = {
  createCargo,
  getMySendedCargos,
};
