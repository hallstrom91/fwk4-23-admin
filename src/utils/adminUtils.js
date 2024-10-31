const pool = require("./connectDB");

const isAdmin = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const [result] = await pool.query(`SELECT role FROM users WHERE id = ?`, [
      userId,
    ]);

    if (!result.length === 0 || result[0].role !== "sysadmin") {
      return res.status(403).json({ error: "Access Denied" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Failed to verify admin status" });
  }
};

module.exports = { isAdmin };
