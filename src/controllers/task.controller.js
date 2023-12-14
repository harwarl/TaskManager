const httpStatus = require("http-status");
const { Task } = require("../models/task");

async function addTask(req, res, next) {
  const userId = req.userId;
  try {
    const { title, description, dueDate } = req.body;
    const newTask = new Task(title, description, Date.parse(dueDate), userId);
    const values = newTask.save();
    if (!values) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: false, message: "Creation failed" });
    }
    return res
      .status(httpStatus.OK)
      .json({ status: true, message: "Task Created" });
  } catch (error) {
    console.log("Add Task Error -", error.message);
    next(error);
  }
}

async function getTasks(req, res, next) {
  const userId = req.userId;
  const filters = req.query;
  try {
    const tasks = await Task.getUserTasks(userId, filters);
    return res.status(httpStatus.OK).json({ status: true, tasks });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateTask(req, res, next) {
  const userId = req.userId;
  const id = Number(req.params.id);
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
    const updatedTask = await Task.updateTask(id, userId, updated);
    if (!updatedTask) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: true, updated: false, message: "Could not update" });
    }
    return res.status(httpStatus.OK).json({ status: true, updated: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteTask(req, res, next) {
  const userId = req.userId;
  const id = Number(req.params.id);
  try {
    const deleted = await Task.deleteTask(id, userId);
    if (!deleted) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: true, deleted: false });
    }
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
