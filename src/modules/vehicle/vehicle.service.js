const vehicleModel = require("./vehicle.model");

async function create(vehicle) {
  return await vehicleModel.create(vehicle);
}

async function updateOne(id, updateBody) {
  return await vehicleModel.updateOne({ _id: id }, updateBody);
}

async function findById(id) {
  return await vehicleModel.findById(id);
}

module.exports = {
  create,
  updateOne,
  findById,
};
