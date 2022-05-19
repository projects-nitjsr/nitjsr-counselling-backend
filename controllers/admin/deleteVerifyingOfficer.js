const db = require("../../helpers/dbconnect");
const imageUploader = require("../../helpers/imageHandler");

module.exports = async (req, res) => {
  const centerInchargeEmail =
    req.body.email || "centerincharge.nitwara@nimcet.in";
  const VerifyingOfficerEmail = req.params.email;

  try {
    if (!centerInchargeEmail) throw new Error("No Auth");

    const verifyingOfficer = await db.queryAsync(
      "SELECT * FROM verifying_officers WHERE email = ?",
      [VerifyingOfficerEmail]
    );

    if (verifyingOfficer.length == 0)
      throw new Error("veryfying officer doesn't exist");

    const centerIncharge = await db.queryAsync(
      "SELECT * FROM center_incharge WHERE email = ?",
      [centerInchargeEmail]
    );

    if (verifyingOfficer[0].college !== centerIncharge[0].college)
      throw new Error("No Auth");

    await imageUploader.deleteImage(verifyingOfficer[0].profile_image_url);

    await db.queryAsync("DELETE FROM admin WHERE email = ? ", [
      VerifyingOfficerEmail,
    ]);

    res.status(200).json({
      success: true,
      message: "Verifying Officer Deleted Successfully",
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};
