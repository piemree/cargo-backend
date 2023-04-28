module.exports = {
  port:
    process.env.NODE_ENV === "production"
      ? process.env.PORT
      : process.env.DEV_PORT,
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
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
  },
  jwtOptions: {
    expiresIn: "1d",
  },
  corsOptions: {
    origin: [process.env.BASE_URL],
    credentials: true,
  },
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  redisOptions: {
    url:
      process.env.NODE_ENV === "production"
        ? process.env.REDIS_URL
        : process.env.DEV_REDIS_URL,
  },
  noAuthRoutes: [
    "/api/auth/customer/login",
    "/api/auth/customer/register",
    "/api/auth/personel/login",
    "/api/auth/personel/register",
  ],
};
