const crypto = require("crypto");

const generateCsrfToken = (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  res.app.locals.csrfToken = csrfToken;
  return res.json({ csrfToken });
};

const verifyCsrfToken = (req, res, next) => {
  const csrfToken = req.headers["x-csrf-token"];
  console.log("csrfToken", csrfToken);
  if (csrfToken && csrfToken === req.app.locals.csrfToken) {
    delete req.app.locals.csrfToken;
    return next();
  }

  return res.status(403).json({ message: "Invalid or missing CSRF token" });
};

module.exports = { generateCsrfToken, verifyCsrfToken };
