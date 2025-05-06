const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userTaskRoutes = require("./routes/userTaskRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Register routes with prefixes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/user-tasks", userTaskRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
