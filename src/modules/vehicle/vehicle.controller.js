const vehicleService = require("./vehicle.service");

async function createVehicle(req, res) {
  const vehicle = await vehicleService.create(req.body);
  res.status(201).json(vehicle);
}

module.exports = {
  createVehicle,
};
