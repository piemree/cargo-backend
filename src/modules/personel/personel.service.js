const personelModel = require("./personel.model");

async function findOne(query) {
  const personel = await personelModel.findOne(query);
  return personel;
}

async function findAll() {
  const personels = await personelModel.find().select("-password");
  return personels;
}

async function create(personel = {}) {
  const newPersonel = await personelModel.create(personel);
  return newPersonel;
}



module.exports = {
  findOne,
  findAll,
  create,
};
