const vehicleService = require("./vehicle.service");
const personelService = require("../personel/personel.service");
const { roles } = require("../../../config");

async function createVehicle(req, res) {
  const vehicle = await vehicleService.create(req.body);
  res.status(201).json({
    success: true,
    data: vehicle,
  });
}

async function getAllVehicles(req, res) {
  const vehicles = await vehicleService.find();
  res.status(200).json({
    success: true,
    data: vehicles,
  });
}

async function assignVehicleToPersonel(req, res) {
  const { personelId, vehicleId } = req.body;
  const updatePersonelRequest = personelService.updateOne(
    {
      _id: personelId,
      role: roles.transportPersonel,
    },
    {
      vehicle: vehicleId,
    }
  );

  const updateVehicleRequest = vehicleService.updateOne(vehicleId, {
    driver: personelId,
  });

  // fınd personels old vehicle and set to null
  const updateOldVehicleRequest = await vehicleService.findByDriverIdAndUpdate(
    personelId,
    {
      driver: null,
    }
  );

  await Promise.all([
    updatePersonelRequest,
    updateVehicleRequest,
    updateOldVehicleRequest,
  ]);

  res.status(200).json({
    success: true,
  });
}

module.exports = {
  createVehicle,
  getAllVehicles,
  assignVehicleToPersonel,
};
