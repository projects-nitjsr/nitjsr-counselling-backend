const db = require("../../helpers/dbconnect");
const imageUploader = require("../../helpers/imageHandler");

module.exports = async (req, res) => {
  const regno = req.body.regno;
  const name = req.body.name;
  const email = req.body.email;
  const category = req.body.category;
  const image = req.file;

  try {
    console.log(name);
    if (!name && !email && !category && !image) {
      throw new Error("Nothing to update!!");
    }

    const student = await db.queryAsync(
      "SELECT * FROM student WHERE regno = ?",
      [regno]
    );
    let newImageUrl = "";
    if (image) {
      await imageUploader.deleteImage(student[0].profile_image_url);

      newImageUrl = await imageUploader.uploadImage(image);
    }

    await db.queryAsync(
      "UPDATE student SET name = ?,email = ?,category = ?,profile_image_url = ? WHERE regno = ?",
      [
        name || student[0].name,
        email || student[0].email,
        category || student[0].category,
        newImageUrl || student[0].profile_image_url,
        regno,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Student Data Updated!! ",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
