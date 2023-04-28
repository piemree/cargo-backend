const { roles } = require("../../../config");
const personelService = require("./personel.service");

async function getAllPersonels(req, res) {
  const personels = await personelService.findAll();
  console.log(req.session);
  res.status(200).json(personels);
}

async function addBranchPersonel(req, res) {
  const personel = await personelService.create({
    ...req.body,
    role: roles.branchPersonel,
  });
  res.status(201).json(personel);
}

module.exports = {
  getAllPersonels,
  addBranchPersonel,
};
