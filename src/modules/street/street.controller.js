const streetService = require("./street.service");

async function getAllstreets(req, res) {
  const query = req.query;
  const street = await streetService.find(query);
  res.status(200).json(street);
}

module.exports = {
  getAllstreets,
};
