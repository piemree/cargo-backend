const { roles } = require("../../../config");
const customerService = require("./customer.service");
const cargoService = require("../cargo/cargo.service");

async function getMe(req, res) {
  const { id } = req.user;
  const customer = await customerService.findOne({ _id: id });
  res.status(200).json(customer);
}
async function getMyCargos(req, res) {
  const { id } = req.user;
  const orders = await cargoService.find({ sender: id });
  res.status(200).json(orders);
}
module.exports = {
  getMe,
  getMyCargos
};
