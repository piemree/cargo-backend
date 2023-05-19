const cityService = require("./city.service");

async function getAllCities(req, res) {
  const cities = await cityService.find({});
  res.status(200).json({
    success: true,
    data: cities,
  });
}

async function importCities(req, res) {
  const cities = await cityService.bulkCreate(req.body);
  res.status(200).json({
    success: true,
    data: cities,
  });
}

module.exports = {
  getAllCities,
    importCities,
};
