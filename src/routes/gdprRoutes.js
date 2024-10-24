const express = require("express");
const {
  getUserData,
  deleteUserData,
} = require("../controllers/gdprControllers.js");
const { verifyJwt } = require("../utils/jwtUtils.js");
const router = express.Router();

router.get("/request-data", verifyJwt, getUserData);
router.delete("/request-delete", verifyJwt, deleteUserData);

module.exports = router;
