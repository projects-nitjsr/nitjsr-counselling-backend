const db = require("../../helpers/dbconnect");
const generator = require("generate-password");
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
        password,
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
