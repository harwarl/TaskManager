const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
require("dotenv").config();

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["PUT", "OPTIONS", "PATCH", "GET", "POST"],
    credentials: true,
    origin: "*",
  })
);

require("./routes/index")(app);

// ROOT ROUTE
app.get("/", (req, res, next) => {
  return res.status(httpStatus.OK).json({
    status: true,
    message: "Task Manager Rest API",
    repo: "https://github.com/harwarl/TaskManager.git",
  });
});

// NOT FOUND
app.use("*", (req, res, next) => {
  return res
    .status(httpStatus.NOT_FOUND)
    .json({ status: false, message: "LOST YOUR WAY???" });
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message;
  return res.status(statusCode).json({ success: false, message });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
