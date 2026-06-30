const express = require("express");
const router = express.Router();

const superAdminController = require("../controllers/superAdminController");

// Get all users
router.get("/users", superAdminController.getAllUsers);

// Dashboard statistics
router.get("/stats", superAdminController.getDashboardStats);
router.delete(
  "/users/:id",
  superAdminController.deleteUser
);
module.exports = router;