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

async function updateById(id, update) {
  return await customerModel.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
}

module.exports = {
  findOne,
  findAll,
  create,
  updateById,
};
