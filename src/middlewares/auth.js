const AppError = require("../error/AppError");

module.exports = async function (req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) return next(new AppError("Unauthorized", 401));
  
};
