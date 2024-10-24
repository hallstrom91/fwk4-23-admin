const pool = require("../utils/connectDB.js");

const getUserData = async (req, res) => {
  const userId = req.user.userId;
  console.log("userId", userId);
  try {
    const [userData] = await pool.query(
      `SELECT id, email, fullname FROM users WHERE id = ?`,
      [userId],
    );
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
    res.status(200).json({
      account: userData[0],
      boards: boards,
      tasks: tasks,
      comments: task_comments,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

const deleteUserData = async (req, res) => {
  const userId = req.user.userId;
  try {
    await pool.query(`START TRANSACTION`);
    await pool.query(`DELETE FROM tasks WHERE created_by = ?`, [userId]);

    await pool.query(`DELETE FROM board_members WHERE user_id = ?`, [userId]);
    await pool.query(`DELETE FROM task_comments WHERE user_id = ?`, [userId]);
    await pool.query(`DELETE FROM users WHERE id = ?`, [userId]);
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
