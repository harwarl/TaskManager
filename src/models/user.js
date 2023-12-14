const { pool } = require("../../config/database");

class User {
  constructor(firstname, lastname, username, email, password) {
    this.userId = null;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdat = new Date();
  }

  static async findUserByEmail(email) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (rows.length > 0) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error querying database:", error);
      throw error;
    }
  }

  static async findUserById(id) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      if (rows.length > 0) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error querying database:", error);
      throw error;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        "INSERT INTO users (firstname, lastname, username, email, password, createdat) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          this.firstname,
          this.lastname,
          this.username,
          this.email,
          this.password,
          this.createdat,
        ]
      );
      return rows;
    } catch (error) {
      console.log(`Error saving to DB -`, error.message);
      throw error;
    }
  }
}

module.exports = {
  User,
};
