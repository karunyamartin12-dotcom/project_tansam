const express = require("express");

const router = express.Router();

const {
    register,
    login,
    dashboard,
    getDashboardCounts,
    getUsers,
    getAdmins,
    getDashboard,
    getRoles,
    addRole
} = require("../controllers/userController");

const authMiddleware =
require("../middleware/authmiddleware");

router.post("/register", register);

router.post("/login", login);

router.get(
    "/dashboard",
    authMiddleware,
    dashboard
);

router.get(
    "/dashboard-count",
    authMiddleware,
    getDashboardCounts
);

module.exports = router;