const express = require("express");
const {
  getUserData,
  deleteUserData,
} = require("../controllers/gdprControllers.js");
const { verifyJwt } = require("../utils/jwtUtils.js");
const { verifyCsrfToken } = require("../utils/csrfUtils.js");
const router = express.Router();

router.get("/request-data", verifyCsrfToken, verifyJwt, getUserData);
router.delete("/request-delete", verifyCsrfToken, verifyJwt, deleteUserData);

module.exports = router;
