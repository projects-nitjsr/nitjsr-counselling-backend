const db = require("../../helpers/dbconnect");

module.exports = async (req, res) => {
  try {
    const verifyingOfficersList = await db.queryAsync(
      `SELECT a.*,
       v.*,
       c.name as college,
        c.id as collegeId,
        c.profile_image_url as collegeProfile
      FROM admin a      
       JOIN verifying_officers v
      ON a.email = v.email
      JOIN colleges c
      ON v.college = c.id;`
    );
    if (verifyingOfficersList.length == 0) {
      throw new Error("No Verifying Officers Found");
    }
    res.status(200).json({ success: true, data: verifyingOfficersList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
