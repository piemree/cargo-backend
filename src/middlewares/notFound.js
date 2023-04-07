const AppError = require("../error/AppError");

module.exports = (req, res, next) => next(new AppError("Not Found", 404));
