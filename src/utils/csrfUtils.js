const crypto = require("crypto");

const generateCsrfToken = (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  res.app.locals.csrfToken = csrfToken;
  res.cookie("csrfToken", csrfToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: false, // true in https mode
    sameSite: "lax",
  });
  return res.json({ message: "CSRF token set in cookies" });
};

const verifyCsrfToken = (req, res, next) => {
  const csrfToken = req.cookies.csrfToken;
  if (csrfToken === req.app.locals.csrfToken) {
    delete req.app.locals.csrfToken;
    return next();
  }

  return res.status(403).json({ error: "Invalid or missing CSRF token" });
};

module.exports = { generateCsrfToken, verifyCsrfToken };
