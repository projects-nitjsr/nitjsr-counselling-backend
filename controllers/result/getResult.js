const db = require("../../helpers/dbconnect");

const getResult = async (req, res) => {
  try {
    const result = await db.queryAsync("SELECT * FROM result", []);

    if (result.length == 0) {
      throw new Error("No results found!");
    }

    res.status(200).json({ success: true, result: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getResult;
