import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import config from "./config/config";
import authRoutes from "./src/routes/authRoutes";
import userRoutes from "./src/routes/userRoutes";
import productRoutes from "./src/routes/productRoutes";
import orderRoutes from "./src/routes/orderRoutes";
import { errorHandler } from "./src/middleware/errorMiddleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
