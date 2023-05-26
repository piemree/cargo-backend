const config = require("../../../config");
const AppError = require("../../error/AppError");
const personelService = require("../personel/personel.service");
const customerService = require("../customer/customer.service");
const branchService = require("../branch/branch.service");
const vehicleService = require("../vehicle/vehicle.service");
const authService = require("./auth.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../../logger");

async function personelLogin(req, res) {
  const { email, password } = req.body;

  const personel = await personelService.findOne({ email });
  if (!personel) throw new AppError("Invalid credentials", 401);
  const isPasswordValid = await personel.matchPassword(password);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);
  personel.password = undefined;
  const payload = personel.toJSON();
  const token = jwt.sign(payload, config.jwtSecret, config.jwtOptions);
  res.status(200).json({
    success: true,
    data: {
      token,
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
  if (newPersonel.branch) {
    await branchService.addPersonels(newPersonel.branch, [newPersonel._id]);
  }

  if (newPersonel.vehicle) {
    await vehicleService.updateOne(newPersonel.vehicle, {
      driver: newPersonel._id,
    });
  }
  newPersonel.password = undefined;

  res.status(200).json({
    success: true,
    data: {
      user: newPersonel,
    },
  });
}

async function customerLogin(req, res) {
  const { email, password, tcNo } = req.body;
  // find customer by email or phone
  const customer = await customerService.findOne({
    $or: [{ email }, { tcNo }],
  });

  if (!customer) throw new AppError("Invalid credentials", 401);

  const isPasswordValid = await customer.matchPassword(password);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);
  customer.password = undefined;
  const payload = customer.toJSON();
  const token = jwt.sign(payload, config.jwtSecret, config.jwtOptions);

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

async function getProfile(req, res) {
  const customer = await customerService.findOne({ _id: req.user._id });
  if (!customer) throw new AppError("Invalid credentials", 401);
  customer.password = undefined;
  return res.status(200).json({
    success: true,
    data: customer,
  });
}

async function customerForgotPassword(req, res) {
  try {
    const { email } = req.body;

    const customer = await customerService.findOne({ email });

    if (!customer)
      return res.render("customerForgotPassword", { error: "Hata" });

    const payload = {
      email: customer.email,
      _id: customer._id,
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "5m" });

    const resetPasswordLink = `${config.appUrl}/api/auth/customerResetPassword?token=${token}`;

    const html = `
    <h1>Şifre Sıfırlama</h1>
    <p>Şifrenizi sıfırlamak için bu linke tıklayın (5 dakika içinde geçerli)</p>
    <a href="${resetPasswordLink}">Şifre sıfırlama linki</a>
  `;
    await authService.sendEmail({
      to: customer.email,
      subject: "Şifre Sıfırlama",
      html,
    });
    res
      .status(200)
      .render("customerForgotPassword", { info: "Email Gönderildi" });
  } catch (error) {
    logger.error(error);
    res.render("customerForgotPassword", { error: "Hata" });
  }
}

async function customerForgotPasswordView(req, res) {
  res.status(200).render("customerForgotPassword");
}

async function customerResetPasswordView(req, res) {
  res.status(200).render("customerResetPassword");
}

async function customerResetPassword(req, res) {
  try {
    const { password, password2 } = req.body;
    const token = req.query.token;
    if (password !== password2)
      return res.render("customerResetPassword", {
        error: "Şifreler Eşleşmiyor",
      });
    const decoded = jwt.verify(token, config.jwtSecret);
    if (!decoded) return res.render("customerResetPassword", { error: "Hata" });
    const customer = await customerService.findOne({ _id: decoded._id });
    if (!customer)
      return res.render("customerResetPassword", { error: "Hata" });

    await customerService.updateById(decoded._id, {
      password,
    });

    res
      .status(200)
      .render("customerResetPassword", { info: "Şifre Değiştirildi" });
  } catch (error) {
    logger.error(error);
    res.render("customerResetPassword", { error: "Hata" });
  }
}

async function personelForgotPassword(req, res) {
  try {
    const { email } = req.body;

    const personel = await personelService.findOne({ email });
    if (!personel)
      return res.render("personelForgotPassword", { error: "Hata" });

    const payload = {
      email: personel.email,
      _id: personel._id,
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "5m" });

    const resetPasswordLink = `${config.appUrl}/api/auth/personelResetPassword?token=${token}`;

    const html = `
    <h1>Şifre Sıfırlama</h1>
    <p>Şifrenizi sıfırlamak için bu linke tıklayın (5 dakika içinde geçerli)</p>
    <a href="${resetPasswordLink}">Şifre sıfırlama linki</a>
  `;
    await authService.sendEmail({
      to: personel.email,
      subject: "Şifre Sıfırlama",
      html,
    });
    res
      .status(200)
      .render("personelForgotPassword", { info: "Email Gönderildi" });
  } catch (error) {
    logger.error(error);
    res.render("personelForgotPassword", { error: "Hata" });
  }
}

async function personelForgotPasswordView(req, res) {
  res.status(200).render("personelForgotPassword");
}

async function personelResetPasswordView(req, res) {
  res.status(200).render("personelResetPassword");
}

async function personelResetPassword(req, res) {
  try {
    const { password, password2 } = req.body;
    const token = req.query.token;
    if (password !== password2)
      return res.render("personelResetPassword", {
        error: "Şifreler Eşleşmiyor",
      });
    const decoded = jwt.verify(token, config.jwtSecret);
    if (!decoded)
      return res.render("personelResetPassword", { error: "Invalid token" });
    const personel = await personelService.findOne({ _id: decoded._id });
    if (!personel)
      return res.render("personelResetPassword", { error: "Invalid token" });

    await personelService.findByIdAndUpdate(decoded._id, {
      password,
    });

    res
      .status(200)
      .render("personelResetPassword", { info: "Şifre Değiştirildi" });
  } catch (error) {
    logger.error(error);
    res.render("personelResetPassword", { error: "Hata" });
  }
}

async function updateCustomer(req, res) {
  const { tcNo, email, phone } = req.body;
  const customer = await customerService.updateById(req.user._id, {
    email,
    phone,
    tcNo,
  });
  res.status(200).json({
    success: true,
    data: customer,
  });
}

module.exports = {
  personelLogin,
  personelRegister,
  customerLogin,
  customerRegister,
  getProfile,
  customerForgotPassword,
  customerForgotPasswordView,
  customerResetPasswordView,
  customerResetPassword,
  personelForgotPassword,
  personelForgotPasswordView,
  personelResetPasswordView,
  personelResetPassword,
  updateCustomer,
};
