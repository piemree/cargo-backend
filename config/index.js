module.exports = {
  port:
    process.env.NODE_ENV === "production"
      ? process.env.PORT
      : process.env.DEV_PORT,
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: "process.env.SESSION_SECRET",
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
    expiresIn: "1d",
  },
  corsOptions: {
    origin: "*",
    credentials: true,
  },
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  noAuthRoutes: [
    "/api/auth/customer/login",
    "/api/auth/customer/register",
    "/api/auth/personel/login",
  ],
};
