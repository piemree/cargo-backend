module.exports = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
  },
  corsOptions: {
    origin: [process.env.BASE_URL],
    credentials: true,
  },
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
