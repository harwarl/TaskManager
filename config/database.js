const { Pool, Client } = require("pg");
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "../development.env"),
});

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

pool
  .connect()
  .then(() => {
    console.log("Connected");
    console.log("Tables Created");
  })
  .catch((error) => {
    console.log(`Error -`, error);
  });

module.exports = {
  pool,
};
