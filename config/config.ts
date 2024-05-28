const config = {
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/kelas",

  jwtSecret: process.env.JWT_SECRET || "kelasapp",

  port: process.env.PORT || 3000,
};

export default config;
