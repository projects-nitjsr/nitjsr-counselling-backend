const db = require("../../helpers/dbconnect");

module.exports = async (req, res) => {
  const email = req.body.email;

  const name = req.body.name;
  const phone = req.body.phone;

  const collegeEmail = req.body.collegeEmail;

  const profile_image_url = req.body.profile_image_url;

  try {
    const centerInchargeExist = await db.queryAsync(
      "SELECT * FROM admin WHERE email = ?)",
      [email]
    );
    if (centerInchargeExist.length > 0) {
      const query =
        "UPDATE center_incharge SET email= ? , name = ?, phone = ?, phone =? ,college=?. college_email = ?  ";
      await db.queryAsync(query, [
        email || centerInchargeExist[0].email,
        name || centerInchargeExist[0].name,
        phone || centerInchargeExist[0].phone,
        collegeEmail || centerInchargeExist[0].college_email,
      ]);

      res.status(200).json({
        success: true,
        message: "Details for Center Incharge Updated!! ",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Center Incharge doesnot exist! ",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
