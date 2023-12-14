const { pool } = require("../../config/database");
const { STATUS } = require("../../utils/data");

class Task {
  constructor(title, description, dueDate, userId) {
    this.taskId = null;
    this.title = title;
    this.description = description;
    this.due_date = dueDate;
    this.user_id = userId;
    this.status = STATUS[0];
    this.createdat = new Date();
  }

  async save() {
    console.log(this.user_id);
    try {
      const { rows } = await pool.query(
        "INSERT INTO tasks ( title, description, due_date, status, user_id) VALUES ($1, $2, $3, $4, $5)",
        [
          this.title,
          this.description,
          new Date(this.due_date),
          this.status,
          this.user_id,
        ]
      );
      if (Array.isArray(rows)) {
        return rows;
      }
    } catch (error) {
      console.log("Task Save Failed -", error.message);
      throw error;
    }
  }

  static async getUserTasks(userId) {
    try {
      const { rows, rowCount } = await pool.query(
        "SELECT * FROM tasks WHERE user_id = $1",
        [userId]
      );
      if (rowCount > 0) {
        return rows;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Update Task Error- ", error.message);
      throw error;
    }
  }

  static async updateTask(task_id, user_id, updateData) {
    // const columnsUpdate = Object.keys(updateData);
    // const valuesUpdate = Object.values(updateData);
    // const setClause = columnsUpdate.map((columns, index) => {});
    try {
      if (updateData.title) {
        const { rows } = await pool.query(
          "UPDATE tasks SET title = $1 WHERE task_id = $2",
          [updateData.title, task_id]
        );
      }
      if (updateData.description) {
        const { rows } = await pool.query(
          "UPDATE tasks SET description = $1 WHERE task_id = $2",
          [updateData.description, task_id]
        );
      }
      if (updateData.dueDate) {
        const { rows } = await pool.query(
          "UPDATE tasks SET due_date = $1 WHERE task_id = $2",
          [updateData.dueDate, task_id]
        );
      }
      if (updateData.status) {
        const { rows } = await pool.query(
          "UPDATE tasks SET description = $1 WHERE task_id = $2 AND user_id = $3",
          [updateData.description, task_id, user_id]
        );
      }
      return rows[0];
    } catch (error) {
      console.log("Update Task Error- ", error.message);
      throw error;
    }
  }

  static async deleteTask(task_id) {
    try {
      const { rows } = await pool.query();
    } catch (error) {
      console.log("Update Task Error- ", error.message);
      throw error;
    }
  }
}

module.exports = {
  Task,
};
