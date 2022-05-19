const db = require("../../helpers/dbconnect");
const bcrypt = require("bcryptjs");
const imageUploader = require("../../helpers/imageHandler");

module.exports = async (req, res) => {
  const centerInchargeEmail = "centerincharge.nitwara@nimcet.in";
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const image = req.file;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  try {
    const imageUrl = await imageUploader.uploadImage(image);

    const centerIncharge = await db.queryAsync(
      `
      SELECT a.email,
      a.college,
      a.college_email
      FROM center_incharge a 
      WHERE a.email = ?;    
      `,
      [centerInchargeEmail]
    );

    if (centerIncharge.length == 0) throw new Error("No Auth");
    if (centerIncharge[0].college_email.split("@")[1] !== email.split("@")[1])
      throw new Error(
        `Verifying Officer's email must match Center Incharge's college email format @${
          centerIncharge[0].college_email.split("@")[1]
        }`
      );

    const verifyingOfficer = await db.queryAsync(
      `SELECT email FROM verifying_officers WHERE college = ?`,
      [centerIncharge[0].college]
    );
    if (verifyingOfficer.length >= 10)
      throw new Error("Maximum number of verifying officer reached...");

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    await db.queryAsync(
      `
    SET autocommit=0;
    START TRANSACTION;
    INSERT INTO admin ( email, designation, profile_image_url) VALUES (? ,? ,?);
    INSERT INTO verifying_officers (email, name, college) VALUES (?,?,?);
    INSERT INTO admin_credentials (email, password, token) VALUES (?,?,NULL);
    COMMIT;
    SET autocommit=1;
      `,
      [
        email,
        "vo",
        imageUrl,
        email,
        name,
        centerIncharge[0].college,
        email,
        hashedPassword,
      ]
    );

    // send the password to the center incharge email

    res.status(200).json({
      success: true,
      message: "Verifying Officer Created Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
