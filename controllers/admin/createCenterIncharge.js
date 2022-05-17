const db = require("../../helpers/dbconnect");
const generator = require("generate-password");
module.exports = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const college = req.body.college;
  const collegeEmail = req.body.collegeEmail;

  try {
    await db.queryAsync(
      "INSERT INTO admin ( email , designation , profile_image_url) values (? ,? ,?)",
      [email, "Center Incharge", ""]
    );
    await db.queryAsync(
      "INSERT INTO center_incharge (email , name , phone , college , college_email) values (? ,? ,?,?,?)",
      [email, name, phone, college, collegeEmail]
    );
    // create a random password

    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      strict: true,
    });
    // assign the password to the center incharge
    await db.queryAsync(
      "INSERT INTO admin_credentials (password) VALUES (?) WHERE email = ? ",
      [password, email]
    );
    // send the password to the center incharge email

    res
      .status(200)
      .json({ success: true, message: "Center Incharge Created Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
