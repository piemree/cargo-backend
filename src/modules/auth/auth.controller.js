const config = require("../../../config");
const AppError = require("../../error/AppError");
const personelService = require("../personel/personel.service");
const customerService = require("../customer/customer.service");
const jwt = require("jsonwebtoken");

async function personelLogin(req, res) {
  const { email, password } = req.body;

  const personel = await personelService.findOne({ email });
  if (!personel) throw new AppError("Invalid credentials", 401);
  const isPasswordValid = await personel.matchPassword(password);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);
  personel.password = undefined;
  const signObj = {
    id: personel._id,
    email: personel.email,
    role: personel.role,
  };
  const token = jwt.sign(signObj, config.jwtSecret, config.jwtOptions);
  res.status(200).json({
    success: true,
    data: {
      token,
      user: personel,
    },
  });
}

async function personelRegister(req, res) {
  const data = req.body;
  // check if email or tcNo is already registered and tcNo is already registered and phone is already registered
  const personel = await personelService.findOne({
    $or: [{ email: data.email }, { tcNo: data.tcNo }],
  });
  if (personel) throw new AppError("Tc yada email kullanilmis.", 401);
  const newPersonel = await personelService.create(data);
  newPersonel.password = undefined;
  res.status(200).json({
    success: true,
    data: {
      user: newPersonel,
    },
  });
}

async function customerLogin(req, res) {
  const { email, password } = req.body;
  const customer = await customerService.findOne({ email });
  if (!customer) throw new AppError("Invalid credentials", 401);

  const isPasswordValid = await customer.matchPassword(password);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);
  customer.password = undefined;

  const signObj = {
    id: customer._id,
    email: customer.email,
    role: config.roles.customer,
    name: customer.name,
    surname: customer.surname,
  };

  const token = jwt.sign(signObj, config.jwtSecret, config.jwtOptions);

  res.status(200).json({
    success: true,
    token,
  });
}

// register customer
async function customerRegister(req, res) {
  const data = req.body;
  // check if email or tcNo is already registered and tcNo is already registered and phone is already registered
  const customer = await customerService.findOne({
    $or: [{ email: data.email }, { tcNo: data.tcNo }, { phone: data.phone }],
  });
  if (customer) throw new AppError("Tc, Telefon yada email kullanilmis.", 401);
  const newCustomer = await customerService.create(data);
  newCustomer.password = undefined;
  res.status(200).json({
    success: true,
    data: newCustomer,
  });
}

async function getMe(req, res) {
  const customer = await customerService.findOne({ _id: req.user.id });
  if (!customer) throw new AppError("Invalid credentials", 401);
  customer.password = undefined;
  return res.status(200).json({
    success: true,
    data: customer,
  });
}

module.exports = {
  personelLogin,
  personelRegister,
  customerLogin,
  customerRegister,
  getMe,
};
