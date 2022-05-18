const db = require("../../helpers/dbconnect");

const updateCollegeById = async (req, res) => {
  const clgId = req.params.id;

  try {
    const college = await db.queryAsync(
      "SELECT * FROM colleges WHERE id = ?",
      [clgId]
    );

    if (college.length == 0) {
      throw new Error("No such college found!");
    }
    const {
      name,
      general_seats,
      obc_seats,
      sc_seats,
      st_seats,
      pwd_seats,
      ews_seats,
      profile_image_url
    } = req.body;


    const sqlQuery =
    "UPDATE colleges SET name = ?, general_seats = ?, obc_seats = ?, sc_seats = ?, st_seats = ?,pwd_seats = ?, ews_seats = ?, profile_image_url = ? WHERE id = ?";

  await db.queryAsync(sqlQuery, [
    name || college[0].name,
    general_seats || college[0].failureDesc,
    obc_seats || college[0].obc_seats,
    sc_seats || college[0].sc_seats,
    st_seats || college[0].st_seats,
    pwd_seats || college[0].pwd_seats,
    ews_seats || college[0].ews_seats,
    profile_image_url || college[0].profile_image_url,
    clgId,
  ]);
   

    res.status(200).json({ success: true, message: "College Update successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = updateCollegeById;
