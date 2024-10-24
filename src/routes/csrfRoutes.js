const express = require("express");
const router = express.Router();
const { generateCsrfToken } = require("../utils/csrfUtils.js");
const { verifyJwt } = require("../utils/jwtUtils.js");

router.get("/token", verifyJwt, generateCsrfToken);

module.exports = router;
