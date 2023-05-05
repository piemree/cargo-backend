const districtService = require("./district.service");

async function getAllDistricts(req, res) {
  const query = req.query;
  const districts = await districtService.find(query);
  res.status(200).json(districts);
}

module.exports = {
  getAllDistricts,
};
