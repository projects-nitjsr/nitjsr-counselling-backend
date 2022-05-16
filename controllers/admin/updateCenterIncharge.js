const db = require("../../helpers/dbconnect");

module.exports = async (req, res) => {
  const email = req.body.email;

  const name = req.body.name;
  const phone = req.body.phone;

  const collegeEmail = req.body.collegeEmail;

  const profile_image_url = req.body.profile_image_url;

  try {
    if (name) {
      await db.queryAsync(
        "UPDATE center_incharge SET name = ? WHERE email = ?",
        [name, email]
      );
    }
    if (phone) {
      await db.queryAsync(
        "UPDATE center_incharge SET phone = ? WHERE email = ?",
        [phone, email]
      );
    }
    if (collegeEmail) {
      await db.queryAsync(
        "UPDATE center_incharge SET college_email = ? WHERE email = ?",
        [collegeEmail, email]
      );
    }
    if (profile_image_url) {
      await db.queryAsync(
        "UPDATE admin SET profile_image_url = ? WHERE email = ?",
        [profile_image_url, email]
      );
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
