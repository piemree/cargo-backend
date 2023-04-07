const logger = require("../logger");

module.exports = (err, req, res) => {
  const status = err.status || 500;
  logger.error(err);
  res.status(status);
  res.json({
    error: {
      status: status,
      message: err.message,
    },
  });
};
