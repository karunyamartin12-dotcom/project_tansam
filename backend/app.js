require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const foodRoutes = require("./routes/foodRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

/*
  Middleware
*/
app.use(cors());
app.use(express.json());

/*
  Routes
*/
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/dashboard", dashboardRoutes);

/*
  Test Route
*/
app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

module.exports = app;