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
const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:5173",
      ],
      frameSrc: ["'self'"],
      "img-src": ["'self'", "data:"],
    },
  }),
);

app.use(cors(corsOptions));

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
