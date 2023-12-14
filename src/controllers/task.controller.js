const httpStatus = require("http-status");
const { Task } = require("../models/task");

async function addTask(req, res, next) {
  const userId = req.userId;
  try {
    const { title, description, dueDate } = req.body;
    const newTask = new Task(title, description, Date.parse(dueDate), userId);
    const values = newTask.save();
    if (values) {
      return res
        .status(httpStatus.OK)
        .json({ status: true, message: "Task Created" });
    }
  } catch (error) {
    console.log("Add Task Error -", error.message);
    next(error);
  }
}
async function getTasks(req, res, next) {
  const userId = req.userId;
  try {
    const tasks = await Task.getTasks(userId);
    return res.status(httpStatus.OK).json({ status: true, tasks });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function updateTask(req, res, next) {
  const userId = req.userId;
  const id = req.params;
  try {
    const { title, description, dueDate, status } = req.body;
    const updateData = {
      title,
      description,
      dueDate: new Date(dueDate),
      status,
    };
    const updatedTask = await Task.updateTask(id, userId, updateData);
    return res.status(httpStatus.OK).json({ status: true, updated: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function deleteTask(req, res, next) {
  const userId = req.userId;
  const id = req.params;
  try {
    const deletedTask = await Task.deleteTask(id);
    return res.status(httpStatus.OK).json({ status: true, deleted: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
};
