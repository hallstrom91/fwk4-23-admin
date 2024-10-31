const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/adminUtils.js");
const { verifyJwt } = require("../utils/jwtUtils.js");
const {
  viewAllUsers,
  viewAllBoards,
  viewAllTasks,
} = require("../controllers/adminControllers.js");

router.use(verifyJwt);
router.use(isAdmin);

router.get("/users", viewAllUsers);
router.get("/boards", viewAllBoards);
router.get("/tasks", viewAllTasks);

module.exports = router;
