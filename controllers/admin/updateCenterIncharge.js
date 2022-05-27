const db = require("../../helpers/dbconnect");
const imageUploader = require("../../helpers/imageHandler");
module.exports = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const collegeEmail = req.body.collegeEmail;
  const image = req.file;

  try {
    if (!name && !phone && !collegeEmail && !image) {
      throw new Error("Nothing to update!!");
    }

    const centerInchargeExist = await db.queryAsync(
      "SELECT * FROM admin WHERE email = ?)",
      [email]
    );
    if (centerInchargeExist.length > 0) {
      let newImageUrl = "";
      if (image) {
        await imageUploader.deleteImage(
          centerInchargeExist[0].profile_image_url
        );

        newImageUrl = await imageUploader.uploadImage(image);
      }

      const query =
        "UPDATE center_incharge SET name = ?, phone = ?, phone =? ,college=?. college_email = ? ,profile_image_url = ? WHERE email = ?";
      await db.queryAsync(query, [
        name || centerInchargeExist[0].name,
        phone || centerInchargeExist[0].phone,
        collegeEmail || centerInchargeExist[0].college_email,
        newImageUrl || student[0].profile_image_url,
        email,
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
