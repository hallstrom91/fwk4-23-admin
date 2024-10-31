const pool = require("../utils/connectDB.js");

const viewAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT id, fullname, email, role, avatar FROM users`,
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

const viewAllBoards = async (req, res) => {
  try {
    const [boards] = await pool.query(`SELECT * FROM boards`);
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "" });
  }
};

const viewAllTasks = async (req, res) => {
  try {
    const [tasks] = await pool.query(`SELECT * FROM tasks`);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "" });
  }
};

module.exports = { viewAllUsers, viewAllBoards, viewAllTasks };
