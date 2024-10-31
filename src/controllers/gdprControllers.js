const pool = require("../utils/connectDB.js");
const generatePdfDocument = require("../utils/pdfUtils.js");

const getUserData = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const [userData] = await pool.query(
      `SELECT id, email, fullname FROM users WHERE id = ?`,
      [userId],
    );
    if (!userData || userData.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const [tasks] = await pool.query(
      `SELECT * FROM tasks WHERE created_by = ?`,
      [userId],
    );

    const [task_comments] = await pool.query(
      `SELECT * from task_comments WHERE user_id = ?`,
      [userId],
    );
    const [boards] = await pool.query(
      `SELECT * FROM board_members WHERE user_id = ?`,
      [userId],
    );

    await generatePdfDocument(userData[0], tasks, task_comments, boards, res);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

const deleteUserData = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await pool.query(`START TRANSACTION`);

    const [authorizedCheck] = await pool.query(
      `SELECT id FROM users WHERE id = ?`,
      [userId],
    );

    if (!authorizedCheck || authorizedCheck.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await pool.query(`DELETE FROM tasks WHERE created_by = ?`, [userId]);
    await pool.query(`DELETE FROM board_members WHERE user_id = ?`, [userId]);
    await pool.query(`DELETE FROM task_comments WHERE user_id = ?`, [userId]);
    await pool.query(`DELETE FROM users WHERE id = ?`, [userId]);
    await pool.query(`DELETE from invites WHERE invited_user_id = ?`, [userId]);
    await pool.query(`COMMIT`);
    res
      .status(200)
      .json({ message: "User and related user data has been deleted." });
  } catch (error) {
    await pool.query(`ROLLBACK`);
    res.status(500).json({ error: "Failed to delete user data" });
  }
};

module.exports = { getUserData, deleteUserData };
