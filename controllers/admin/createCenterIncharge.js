const db = require("../../helpers/dbconnect");
const bcrypt = require("bcryptjs");
const imageUploader = require("../../helpers/imageHandler");

module.exports = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const college = req.body.college;
  const image = req.file;
  const password = req.body.password;
  const collegeEmail = req.body.collegeEmail;

  try {
    const imageUrl = await imageUploader.uploadImage(image);

    //check if the college has a center incharge
    const centerInchargeNum = await db.queryAsync(
      `SELECT email FROM center_incharge WHERE college = ?`,
      [college]
    );
    if (centerInchargeNum.length > 0)
      throw new Error("Center Incharge Exists For this College");

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    await db.queryAsync(
      ` SET autocommit =0 ;
START TRANSACTION;
INSERT INTO admin ( email , designation , profile_image_url) values (? ,? ,?);
INSERT INTO center_incharge (email , name , phone , college , college_email) values (? ,? ,?,?,?);
INSERT INTO admin_credentials (email ,password, token) VALUES (?,?,NULL);
COMMIT;
SET autocommit =1
`,
      [
        email,
        "ci",
        imageUrl,
        email,
        name,
        phone,
        college,
        collegeEmail,
        email,
        hashedPassword,
      ]
    );

    // send the password to the center incharge email

    res.status(200).json({
      success: true,
      message: "Center Incharge Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
