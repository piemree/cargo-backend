const config = require("../../../config");
const AppError = require("../../error/AppError");
const personelService = require("../personel/personel.service");
const jwt = require("jsonwebtoken");

async function personelLogin(req, res) {
  const { email, password } = req.body;

  const personel = await personelService.findOne({ email });
  if (!personel) throw new AppError("Invalid credentials", 401);

  const isPasswordValid = await personel.matchPassword(password);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);

  const signObj = {
    id: personel._id,
    email: personel.email,
    role: personel.role,
  };
  const token = jwt.sign(signObj, config.jwtSecret, config.jwtOptions);
  req.session.token = token;
  res.status(200).json({ token });
}

module.exports = {
  personelLogin,
};
