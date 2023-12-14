const authRouter = require("./auth.route");
const taskRouter = require("./task.route");

module.exports = (app) => {
  app.use("/api/v1/auth/", authRouter);
  app.use("/api/v1/tasks/", taskRouter);
};


