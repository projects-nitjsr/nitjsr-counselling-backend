const db = require("../helpers/dbconnect");

const log = async (ip, logMessage, user) => {
  await db.queryAsync(
    "INSERT INTO logger(timestamp,ip,log,user) VALUES(current_timestamp(),?,?,?)",
    [ip, logMessage, user]
  );
};

const adminLog = async (ip, logMessage, email) => {
  await db.queryAsync(
    "INSERT INTO admin_session(timestamp,ip,log,email) VALUES(current_timestamp(),?,?,?)",
    [ip, logMessage, email]
  );
};

const getLog = async (noOfLogs) => {
  const logs = await db.queryAsync(
    `SELECT * FROM (SELECT * FROM logger ORDER BY id DESC LIMIT ? )Var1 ORDER BY id ASC;`,
    [noOfLogs]
  );
  return logs;
};

const getAdminLog = async (noOfLogs) => {
  const logs = await db.queryAsync(
    `SELECT * FROM (SELECT * FROM admin_session ORDER BY id DESC LIMIT ? )Var1 ORDER BY id ASC;`,
    [noOfLogs]
  );
  return logs;
};

module.exports = { log, adminLog, getLog, getAdminLog };
