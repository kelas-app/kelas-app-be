// Declaration file for Express.js

declare namespace Express {
    export interface Request {
      user?: any; // Add custom properties to the Express Request object, such as user information after authentication
    }
  }
  