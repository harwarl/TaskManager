const httpStatus = require("http-status");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

async function getUser(req, res, next) {
  const userId = req.userId;
  try {
    const user = await User.findUserById(userId);
    const tasks = await Task.getUserTasks(userId);
    return res.status(httpStatus.OK).json({ status: true, user, tasks });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

async function updateUser(req, res, next) {
  const userId = req.userId;
  try {
    const { title, description, dueDate } = req.body;
    const updated = {};
    if (typeof title === "string") {
      updated.title = title;
    }
    if (typeof description === "string") {
      updated.description = description;
    }
    if (typeof dueDate !== "undefined") {
      updated.due_date = new Date(Date.parse(dueDate));
    }
    if (isObjectEmpty(updated)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: false, updated: false });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

module.exports = {
  getUser,
};
