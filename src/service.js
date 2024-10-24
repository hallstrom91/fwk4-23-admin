const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const gdprRoutes = require("./routes/gdprRoutes.js");

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/gdpr", gdprRoutes);

module.exports = app;
