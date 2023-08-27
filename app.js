const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const GlobalError = require("./controllers/globalErrorController");

const AuthRoutes = require("./routes/authRoutes");
const TaskRoutes = require("./routes/taskRoutes");
const CardRoutes = require("./routes/cardRoutes");

const { allowOrigins } = require("./utils/allowOrigins");

app.use(express.json());
// SET CORS
app.use(
  cors({
    origin: allowOrigins,
  })
);
// cookie
app.use(cookieParser());

app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/task", TaskRoutes);
app.use("/api/v1/card", CardRoutes);
// app.use("/api/v1/card", TaskRoutes);
// Global ERROR

app.use(GlobalError);
module.exports = app;
