const { Pool } = require("pg");

const db = new Pool({
  user: "pg",
  password: "pg",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "budgetapp",
});

module.exports = db;