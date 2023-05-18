const { roles } = require("../../../config");
const personelService = require("./personel.service");
const vehicleService = require("../vehicle/vehicle.service");

async function getAllPersonels(req, res) {
  const query = req.query;
  const personels = await personelService.findAll({
    ...query,
  });
  res.status(200).json({
    success: true,
    data: personels,
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

  await Promise.all([updatePersonelRequest, updateVehicleRequest]);

  res.status(200).json({
    success: true,
  });
}

module.exports = {
  getAllPersonels,
  assignVehicleToPersonel,
};
