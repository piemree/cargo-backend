const cityService = require("./city.service");

async function getAllCities(req, res) {
  const cities = await cityService.find();
  res.status(200).json(cities);
}

module.exports = {
  getAllCities,
};
