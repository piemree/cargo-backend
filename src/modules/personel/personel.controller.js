const { roles } = require("../../../config");
const personelService = require("./personel.service");

async function getAllPersonels(req, res) {
  const personels = await personelService.findAll();
  res.status(200).json(personels);
}

async function addBranchPersonel(req, res) {
  const personel = await personelService.create({
    ...req.body,
    role: roles.branchPersonel,
  });
  res.status(201).json(personel);
}

async function assignVehicleToPersonel(req, res) {
  const { personelId, vehicleId } = req.body;
  const personel = await personelService.updateOne(
    {
      _id: personelId,
      role: roles.transportPersonel,
    },
    {
      vehicle: vehicleId,
    }
  );

  res.status(200).json(personel);
}

module.exports = {
  getAllPersonels,
  addBranchPersonel,
  assignVehicleToPersonel,
};
