const express = require("express");

const router = express.Router();

const {
    register,
    login,
    dashboard,
    getUsers,
    getAdmins,
    getDashboard,
    getRoles,
    addRole
} = require("../controller/userController");

const authMiddleware =
require("../middleware/authmiddleware");

router.post("/register", register);

router.post("/login", login);

router.get(
    "/dashboard",
    authMiddleware,
    dashboard
);
module.exports = router;