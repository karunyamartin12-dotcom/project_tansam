const db = require("../config/db");

// Get all users
exports.getAllUsers = (req, res) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      age,
      role
    FROM users
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(200).json(result);
  });
};

// Dashboard statistics
exports.getDashboardStats = (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS totalUsers,
      SUM(CASE WHEN role='admin' THEN 1 ELSE 0 END) AS totalAdmins,
      SUM(CASE WHEN role='user' THEN 1 ELSE 0 END) AS totalNormalUsers,
      SUM(CASE WHEN role='superadmin' THEN 1 ELSE 0 END) AS totalSuperAdmins
    FROM users
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(200).json(result[0]);
  });
};
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "User deleted successfully",
      });
    }
  );
};

