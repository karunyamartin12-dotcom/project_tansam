const db = require("../config/db");

exports.getDashboardCounts = (req, res) => {

    const dashboardData = {};

    db.query("SELECT COUNT(*) AS totalFoods FROM food_items", (err, foodResult) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        dashboardData.totalFoods = foodResult[0].totalFoods;

        db.query("SELECT COUNT(*) AS totalCategories FROM categories", (err, categoryResult) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            dashboardData.totalCategories = categoryResult[0].totalCategories;

            db.query(
                "SELECT COUNT(*) AS expiredFoods FROM food_items WHERE expiry_date < CURDATE()",
                (err, expiredResult) => {
                    if (err) {
                        return res.status(500).json({ message: err.message });
                    }

                    dashboardData.expiredFoods = expiredResult[0].expiredFoods;

                    db.query(
                        "SELECT COUNT(*) AS expiringSoon FROM food_items WHERE expiry_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)",
                        (err, soonResult) => {
                            if (err) {
                                return res.status(500).json({ message: err.message });
                            }

                            dashboardData.expiringSoon = soonResult[0].expiringSoon;

                            res.status(200).json(dashboardData);
                        }
                    );
                }
            );
        });
    });
};