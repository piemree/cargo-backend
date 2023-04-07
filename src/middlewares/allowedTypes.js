const AppError = require("../error/AppError");

module.exports = function (types = []) {
  return (req, res, next) => {
    if (types.includes(req.type)) {
      next();
    } else {
      next(new AppError("Unauthorized", 401));
    }
  };
};
