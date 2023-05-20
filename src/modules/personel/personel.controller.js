const { roles } = require("../../../config");
const personelService = require("./personel.service");
const vehicleService = require("../vehicle/vehicle.service");
const ticketService = require("../ticket/ticket.service");
const branchService = require("../branch/branch.service");

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

async function deletePersonel(req, res) {
  const { personelId } = req.params;
  const personel = await personelService.findById(personelId);
  // if this is current user, throw error
  if (personelId === req.user._id.toString()) {
    throw new AppError("You can not delete yourself", 400);
  }
  if (!personel) throw new AppError("Personel not found", 404);
  // delete personel from vehicle , branch
  if (personel.vehicle) {
    await vehicleService.updateOne(personel.vehicle, {
      driver: null,
    });
  }
  if (personel.branch) {
    await branchService.updateOne(personel.branch, {
      $pull: { personels: personel._id },
    });
  }

  if (personel.role === roles.customerServicePersonel) {
    // if ticket is assigned to personel, assaign it to another personel
    const personelTickets = await ticketService.find({
      personel: personel._id,
    });
    if (personelTickets.length > 0) {
      // find randon customerServicePersonel and assign ticket to him
      const customerServicePersonel = await personelService.findOne({
        role: roles.customerServicePersonel,
      });
      if (!customerServicePersonel) {
        await ticketService.deleteMany({ personel: personel._id });
      }

      // assign ticket to customerServicePersonel
      await ticketService.updateMany(
        { personel: personel._id },
        { personel: customerServicePersonel._id }
      );
    }
  }

  await personelService.deleteOne(personelId);

  res.status(200).json({
    success: true,
  });
}

module.exports = {
  getAllPersonels,
  assignVehicleToPersonel,
  deletePersonel,
};
