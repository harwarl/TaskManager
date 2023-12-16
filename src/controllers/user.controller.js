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
    if (typeof firstname !== "undefined") {
      updated.firstname = firstname;
    }
    if (typeof lastname === "undefined") {
      updated.lastname = lastname;
    }
    if (typeof username === "undefined") {
      updated.username = username;
    }
    if (typeof email !== "undefined") {
      updated.email = email;
    }
    const updatedUser = await User.updateUser(updated, userId);
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
  updateUser,
};
