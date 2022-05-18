const mysql = require("mysql");
const util = require("util");

let pool = mysql.createPool({
  host: process.env.MYSQL_DB_ENDPOINT,
  ssl: true,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

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

// node native promisify
pool.queryAsync = util.promisify(pool.query).bind(pool);

//transaction in sql
// SET autocommit=0;
// START TRANSACTION;
// ...query
// COMMIT;
// SET autocommit=1;

module.exports = pool;
