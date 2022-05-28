const db = require("../../helpers/dbconnect");

module.exports = async (req, res) => {
  const verifyingOfficerEmail = req.body.email;
  try {
    const verifyingOfficer = await db.queryAsync(
      `SELECT a.*,
       v.*,
       c.name as college,
        c.id as collegeId,
        c.profile_image_url as collegeProfile 
      FROM admin a      
       JOIN verifying_officers v
      ON a.email = v.email
      JOIN colleges c
      ON v.college = c.id
      WHERE v.email = ?
      `,
      [verifyingOfficerEmail]
    );
    if (verifyingOfficer.length == 0) {
      throw new Error("No Verifying Officer Found");
    }
    res.status(200).json({ success: true, data: verifyingOfficer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
