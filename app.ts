import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import moment from "moment";
import config from "./config/config";
import authRoutes from "./src/routes/authRoutes";
import userRoutes from "./src/routes/userRoutes";
import productRoutes from "./src/routes/productRoutes";
import orderRoutes from "./src/routes/orderRoutes";
import cartRoutes from "./src/routes/cartRoutes";
import conversationRoutes from "./src/routes/conversationRoutes";
import messageRoutes from "./src/routes/messageRoutes";
import { errorHandler } from "./src/middleware/errorMiddleware";
import path from "path"; // Import path module

const app = express();

// Custom morgan format with timestamp and success/error message
morgan.token('date', (req, res) => moment().format());
morgan.token('message', (req, res) => res.statusCode < 400 ? 'success' : 'error');

const customMorganFormat = '[:date[iso]] :method :url :status :response-time ms - :res[content-length] :message';

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan(customMorganFormat));

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
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Fallback to index.html for client-side routing (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling middleware
app.use(errorHandler);

export default app;
