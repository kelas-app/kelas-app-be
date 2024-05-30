import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import config from "./config/config";
import authRoutes from "./src/routes/authRoutes";
import userRoutes from "./src/routes/userRoutes";
import productRoutes from "./src/routes/productRoutes";
import orderRoutes from "./src/routes/orderRoutes";
import cartRoutes from "./src/routes/cartRoutes";
import conversationRoutes from './src/routes/conversationRoutes';
import messageRoutes from './src/routes/messageRoutes';  
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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
