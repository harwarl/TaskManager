const { pool } = require("../../config/database");
const { buildQuery } = require("../../utils/buildQuery");
const { getLimit } = require("../../utils/getLimit");

class Task {
  constructor(title, description, dueDate, userId) {
    this.taskId = null;
    this.title = title;
    this.description = description;
    this.due_date = dueDate;
    this.user_id = userId;
    this.status = false;
    this.createdat = new Date();
  }

  async save() {
    try {
      const { rows } = await pool.query(
        "INSERT INTO tasks ( title, description, due_date, status, user_id, createdat) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          this.title,
          this.description,
          new Date(this.due_date),
          this.status,
          this.user_id,
          this.createdat,
        ]
      );
      if (Array.isArray(rows)) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("Task Save Failed -", error.message);
      throw error;
    }
  }

  static async getUserTasks(userId, filters = {}) {
    try {
      const isPage = filters.hasOwnProperty("page");
      const { offset, limit } = getLimit(filters, 10, isPage);
      if (isPage) delete filters["page"];
      const { queryClause, queryArray, objLen } = buildQuery(filters, "filter");

      console.log({ offset, limit });

      const { rows, rowCount } = await pool.query(
        `SELECT * FROM tasks WHERE ${queryClause} user_id = $${objLen + 1} ${
          offset ? `OFFSET ${offset}` : ""
        } ${limit ? `LIMIT ${limit}` : ""} `,
        [...queryArray, userId]
      );
      if (rowCount > 0) {
        return rows;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Update Task Error- ", error.message);
      throw error;
    }
  }

  static async updateTask(task_id, user_id, updateData) {
    try {
      //check is task exists
      const { rowCount } = await pool.query(
        "SELECT * FROM tasks WHERE task_id = $1 AND user_id = $2",
        [task_id, user_id]
      );
      if (rowCount > 0) {
        const { queryClause, queryArray, objLen } = buildQuery(updateData);
        const query = `UPDATE tasks SET ${queryClause} WHERE task_id = $${
          objLen + 1
        } AND user_id = $${objLen + 2}`;

        const values = [...queryArray, task_id, user_id];
        const { rowCount } = await pool.query(query, values);
        if (rowCount === 0) {
          return false;
        }
      } else {
        return true;
      }
    } catch (error) {
      console.log("Update Task Error- ", error.message);
      throw error;
    }
  }

  static async deleteTask(task_id, user_id) {
    try {
      const { rowCount } = await pool.query(
        "DELETE FROM tasks WHERE task_id = $1 AND user_id = $2",
        [task_id, user_id]
      );
      if (rowCount === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log("Update Task Error- ", error.message);
      throw error;
    }
  }
}

module.exports = {
  Task,
};
