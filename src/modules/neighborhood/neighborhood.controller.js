const neighborhoodService = require("./neighborhood.service");

async function getAllNeighborhoods(req, res) {
  const query = req.query;
  const neighborhood = await neighborhoodService.find(query);
  res.status(200).json(neighborhood);
}

module.exports = {
  getAllNeighborhoods,
};
