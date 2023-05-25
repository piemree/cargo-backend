const branchService = require("../branch/branch.service");
const cargoService = require("./cargo.service");
const vehicleService = require("../vehicle/vehicle.service");
const personelService = require("../personel/personel.service");
const customerService = require("../customer/customer.service");
const AppError = require("../../error/AppError");

async function createCargo(req, res) {
  const cargo = req.body;
  const branch = await branchService.findBranchByPersonelId(req.user._id);
  if (!branch) throw new AppError("Bu personel bir şubeye ait değil");
  cargo.registerBranch = branch._id;

  const [sender, receiver] = await Promise.all([
    customerService.findOne({ tcNo: cargo.sender.tcNo }),
    customerService.findOne({ tcNo: cargo.receiver.tcNo }),
  ]);

  if (!sender) {
    const newSender = await customerService.create(cargo.sender);
    cargo.sender = newSender._id;
  }
  if (!receiver) {
    const newReceiver = await customerService.create(cargo.receiver);
    cargo.receiver = newReceiver._id;
  }

  if (sender) cargo.sender = sender._id;
  if (receiver) cargo.receiver = receiver._id;

  const createdCargo = await cargoService.create(cargo);

  await branchService.updateOne(branch._id, {
    $addToSet: { cargos: createdCargo._id },
  });

  await branchService.updateOne(cargo.targetBranch, {
    $addToSet: { waitingCargos: createdCargo._id },
  });

  res.status(201).json({
    success: true,
    data: createdCargo,
  });
}

async function getAllCargos(req, res) {
  const cargos = await cargoService.find();
  res.status(200).json({
    success: true,
    data: cargos,
  });
}

async function getMySendedCargos(req, res) {
  const userId = req.user._id;
  const cargos = await cargoService.find({ sender: userId });
  // send
  res.status(200).json({
    success: true,
    data: cargos,
  });
}

async function giveCargosToVehicle(req, res) {
  const { cargoIds, vehicleId } = req.body;

  const updatedCargos = await cargoService.updateMany(cargoIds, {
    vehicle: vehicleId,
    status: "yolda",
  });

  const updatedVehicle = await vehicleService.updateOne(vehicleId, {
    $addToSet: { cargos: { $each: cargoIds } },
  });

  const updatedBranch = await branchService.updateByPersonelId(req.user._id, {
    $pull: { cargos: { $in: cargoIds } },
  });

  // find all cargos targetBranch and update that branch waitingCargos
  const cargos = await cargoService.find({ _id: { $in: cargoIds } });

  cargos.forEach(async (cargo) => {
    branchService.updateOne(cargo.targetBranch, {
      $addToSet: { waitingCargos: cargo._id },
    });
  });

  res.status(200).json({
    success: true,
  });
}

async function giveCargosToBranch(req, res) {
  const { branchId } = req.body;

  const personel = await personelService.findById(req.user._id);
  const vehicle = await vehicleService.findById(personel.vehicle);

  if (!vehicle) throw new AppError("Personelin bir aracı yok", 400);

  const cargos = await cargoService.find({
    targetBranch: branchId,
    vehicle: vehicle._id,
  });

  if (cargos.length === 0) throw new AppError("Kargo bulunamadı", 400);

  const cargoIds = cargos.map((cargo) => cargo._id);

  const updateVehicleRequest = vehicleService.updateOne(vehicle._id, {
    $pull: { cargos: { $in: cargoIds } },
  });
  const updateBranchRequest = branchService.updateOne(branchId, {
    $push: { cargos: { $each: cargoIds } },
    $pull: { waitingCargos: { $in: cargoIds } },
  });

  const updateCargoRequest = cargoService.updateMany(cargoIds, {
    status: "subede",
  });

  const [updatedVehicle, updatedBranch, updatedCargo] = await Promise.all([
    updateVehicleRequest,
    updateBranchRequest,
    updateCargoRequest,
  ]);

  res.status(200).json({ updatedCargo, updatedBranch });
}

async function giveCargoToCustomer(req, res) {
  const { cargoId } = req.body;

  const branch = await branchService.updateByPersonelId(req.user._id, {
    $pull: { cargos: cargoId },
  });

  const cargo = await cargoService.updateOne(cargoId, {
    status: "teslim edildi",
    wasDelivered: true,
  });

  res.status(200).json({
    success: true,
  });
}

async function getMyRecievedCargos(req, res) {
  const userId = req.user._id;
  const cargos = await cargoService.find({ receiver: userId });
  // send
  res.status(200).json({
    success: true,
    data: cargos,
  });
}

async function getMyVehicleCargos(req, res) {
  const vehicleId = req.user?.vehicle;
  const cargos = await cargoService.find({ vehicle: vehicleId });
  // send
  res.status(200).json({
    success: true,
    data: cargos,
  });
}

async function getMyVehicleCurrentCargos(req, res) {
  const vehicleId = req.user?.vehicle;
  const cargos = await cargoService.find({
    vehicle: vehicleId,
    status: "yolda",
  });
  res.status(200).json({
    success: true,
    data: cargos,
  });
}

module.exports = {
  createCargo,
  getMySendedCargos,
  giveCargosToVehicle,
  giveCargosToBranch,
  giveCargoToCustomer,
  getAllCargos,
  getMyRecievedCargos,
  getMyVehicleCargos,
  getMyVehicleCurrentCargos,
};
