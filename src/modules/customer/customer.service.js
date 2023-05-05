const customerModel = require("./customer.model");

async function findOne(query) {
  const customer = await customerModel.findOne(query);
  return customer;
}

async function findAll() {
  const customers = await customerModel.find().select("-password");
  return customers;
}

async function create(customer = {}) {
  return await customerModel.create(customer);
}

module.exports = {
  findOne,
  findAll,
  create,
};
