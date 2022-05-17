const db = require("../../helpers/dbconnect");

const getResult = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  page--;
  const limit = parseInt(req.query.limit) || 20;
  const offset = page * limit;
  try {
    const result = await db.queryAsync(
      "SELECT * FROM result ORDER BY regno LIMIT = ? OFFSET = ?",
      [limit, offset]
    );

    if (result.length == 0) {
      throw new Error("No results found!");
    }

    res.status(200).json({ success: true, result: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getResult;
