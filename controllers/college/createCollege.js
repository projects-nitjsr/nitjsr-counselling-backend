const db = require("../../helpers/dbconnect");
const imageUploader = require("../../helpers/imageHandler");
const createCollege = async (req, res) => {
  
  try {
    const {
      name,
      general_seats,
      obc_seats,
      sc_seats,
      st_seats,
      pwd_seats,
      ews_seats
    } = req.body;
    const image = req.file;
    // if (!(name&&general_seats&&obc_seats&&sc_seats&&st_seats&&pwd_seats&&ews_seats&&profile_image_url)) {
    //     throw new Error("Required Information is Missing");
    //   }

    const imageUrl = await imageUploader.uploadImage(image);
    const sqlQuery =
    "INSERT INTO colleges(name,general_seats,obc_seats,sc_seats,st_seats,pwd_seats,ews_seats,profile_image_url) VALUES (?,?,?,?,?,?,?,?)";

  await db.queryAsync(sqlQuery, [
    name,
    general_seats,
    obc_seats,
    sc_seats,
    st_seats,
    pwd_seats,
    ews_seats,
    imageUrl,
  ]);
   

    res.status(200).json({ success: true, message: "College Added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = createCollege;
