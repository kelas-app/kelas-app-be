// Application configuration

const config = {
    // MongoDB connection URI
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/kelas',
  
    // JWT secret key for token generation and validation
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  
    // Port for the Express server
    port: process.env.PORT || 3000
  };
  
  export default config;
  