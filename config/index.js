module.exports = {
  port:
    process.env.NODE_ENV === "production"
      ? process.env.PORT
      : process.env.DEV_PORT,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    name: process.env.DB_NAME,
    url:
      process.env.NODE_ENV === "production"
        ? process.env.DB_URL
        : process.env.DEV_DB_URL,
  },
  roles: {
    admin: "admin",
    branchPersonel: "branchPersonel",
    transportPersonel: "transportPersonel",
    customerServicePersonel: "customerServicePersonel",
    customer: "customer",
  },
  jwtOptions: {
  },
  corsOptions: {
    origin: "*",
    credentials: true,
  },
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  mailOptions: {
    host: "smtp.zoho.eu",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
  appUrl: process.env.APP_URL,
  noAuthRoutes: [
    "/api/auth/customer/login",
    "/api/auth/customer/register",
    "/api/auth/personel/login",
    "/api/auth/customerForgotPassword",
    "/api/auth/customerResetPassword",
    "/api/auth/personelForgotPassword",
    "/api/auth/personelResetPassword",
  ],
};
