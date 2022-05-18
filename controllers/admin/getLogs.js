const logger = require("../../helpers/logger");

const getLogs = async (req, res) => {
  const noOfLogs = parseInt(req.query.n) || 10;

  try {
    if (noOfLogs > 200) {
      return res
        .status(400)
        .json({ Success: false, message: "number of logs exceeded the limit" });
    }

    const logs = await logger.getLog(noOfLogs);

    if (logs.length == 0) {
      throw new Error("No logs found!");
    }

    res.status(200).json({ success: true, result: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getLogs;
