const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {

    const {
        name,
        email,
        password,
        age,
        role
    } = req.body;

    const checkUser =
        "SELECT * FROM users WHERE email=?";

    db.query(
        checkUser,
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length > 0) {

                return res.status(400).json({
                    message: "Email Already Exists"
                });

            }

            const hashedPassword =
                await bcrypt.hash(password, 10);

            const insertQuery =
                `INSERT INTO users
                (name,email,password,age,role)
                VALUES(?,?,?,?,?)`;

            db.query(
                insertQuery,
                [
                    name,
                    email,
                    hashedPassword,
                    age,
                    role
                ],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message:
                        "User Registered Successfully"
                    });

                }
            );

        }
    );

};

exports.login = (req, res) => {

    const {
        email,
        password
    } = req.body;

    const sql =
        "SELECT * FROM users WHERE email=?";

    db.query(
        sql,
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.status(401).json({
                    message: "Invalid Credentials"
                });

            }

            const user = result[0];

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(401).json({
                    message: "Invalid Credentials"
                });

            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                message: "Login Successful",
                token,
                user
            });

        }
    );

};

exports.dashboard = (req, res) => {

    res.status(200).json({
        message: "Dashboard Access Success",
        user: req.user
    });

};// ==========================================
// ADD THIS TO THE BOTTOM OF USERCONTROLLER.JS
// ==========================================
exports.getDashboardCounts = (req, res) => {
    // Queries to calculate statistics from your users table
    const totalUsersQuery = "SELECT COUNT(*) as count FROM users";
    const totalAdminsQuery = "SELECT COUNT(*) as count FROM users WHERE role = 'admin'";
    const activeUsersQuery = "SELECT COUNT(*) as count FROM users WHERE status = 'active'";
    const inactiveUsersQuery = "SELECT COUNT(*) as count FROM users WHERE status = 'inactive'";

    db.query(totalUsersQuery, (err, totalUsersRes) => {
        if (err) return res.status(500).json(err);

        db.query(totalAdminsQuery, (err, totalAdminsRes) => {
            if (err) return res.status(500).json(err);

            db.query(activeUsersQuery, (err, activeUsersRes) => {
                if (err) return res.status(500).json(err);

                db.query(inactiveUsersQuery, (err, inactiveUsersRes) => {
                    if (err) return res.status(500).json(err);

                    // Send structure back matching your frontend card assignments
                    res.status(200).json({
                        message: "Success",
                        data: {
                            totalusers: totalUsersRes[0].count,
                            totaladmins: totalAdminsRes[0].count,
                            activeusers: activeUsersRes[0].count,
                            inactiveusers: inactiveUsersRes[0].count
                        }
                    });
                });
            });
        });
    });
};