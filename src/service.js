const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const gdprRoutes = require("./routes/gdprRoutes.js");
const csrfRoutes = require("./routes/csrfRoutes.js");
const PDFDocument = require("pdfkit");

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use("/gdpr", gdprRoutes);
app.use("/csrf", csrfRoutes);

module.exports = app;
