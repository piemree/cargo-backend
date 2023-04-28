const logger = require("../logger");

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err?.status || 500;
  logger.error(err);
  res.status(status);
  res.json({
    error: {
      status: status,
      message: err.message,
    },
  });
};
