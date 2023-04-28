const AppError = require("../error/AppError");
const config = require("../../config");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const noAuthRoutes = config.noAuthRoutes;
  const pathname = req._parsedUrl.pathname;

  const isNoAuthRoute = noAuthRoutes.includes(pathname);
  if (isNoAuthRoute) return next();

  const token = req.session.token;
  if (!token) return next(new AppError("Unauthorized", 401));

  const decoded = jwt.verify(token, config.jwtSecret);
  req.user = decoded;
  
  next();
};
