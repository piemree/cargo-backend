const vehicleModel = require("./vehicle.model");

async function create(vehicle) {
  return await vehicleModel.create(vehicle);
}

async function updateOne(id, updateBody) {
  return await vehicleModel.updateOne({ _id: id }, updateBody);
}

async function findByDriverIdAndUpdate(driverId, updateBody) {
  return await vehicleModel.updateOne({ driver: driverId }, updateBody);
}

async function findById(id) {
  return await vehicleModel.findById(id);
}

async function find() {
  return await vehicleModel.find().populate("driver", "name surname");
}

async function deleteOne(id) {
  return await vehicleModel.findByIdAndDelete(id);
}

module.exports = {
  create,
  updateOne,
  findById,
  find,
  findByDriverIdAndUpdate,
  deleteOne,
};
