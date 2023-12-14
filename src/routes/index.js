const authRouter = require("./auth.route");
const taskRouter = require("./task.route");

module.exports = (app) => {
  app.use("/api/auth/v1/", authRouter);
  app.use("/api/task/v1/", taskRouter);
};
