const mysql = require("mysql");

let pool = mysql.createPool({
  host: process.env.MYSQL_DB_ENDPOINT,
  ssl: true,
  user: process.env.USER,
  password: process.env.PASSWORD,

  database: process.env.DATABASE,
  multipleStatements: true,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else console.log("Connected to the Database");

  if (connection) connection.release();
  return;
});

module.exports = pool;
