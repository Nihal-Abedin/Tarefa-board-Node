const express = require("express");
const morgan = require("morgan");
const app = express();
const GlobalError = require("./controllers/globalErrorController");

const AuthRoutes = require("./routes/authRoutes");
const TaskRoutes = require("./routes/taskRoutes");

app.use(express.json());
// app.use(morgan())

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/task", TaskRoutes);
// app.use("/api/v1/card", TaskRoutes);
// Global ERROR

app.use(GlobalError);
module.exports = app;
