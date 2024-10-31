const express = require("express");
const app = express();

const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const gdprRoutes = require("./routes/gdprRoutes.js");
const csrfRoutes = require("./routes/csrfRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());

const requestLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "To many requests, madman!",
});

app.use(requestLimit);

app.use("/gdpr", gdprRoutes);
app.use("/csrf", csrfRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
