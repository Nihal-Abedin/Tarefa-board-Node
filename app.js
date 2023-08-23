const express = require("express");
const morgan = require("morgan");
const app = express();
const GlobalError = require("./controllers/globalErrorController");

const AuthRoutes = require("./routes/authRoutes");

app.use(express.json());
// app.use(morgan())

app.use("/api/v1/auth", AuthRoutes);

// Global ERROR

app.use(GlobalError);
module.exports = app;
