const db = require("../../helpers/dbconnect");

const createCollege = async (req, res) => {
  
  try {
    const {
      name,
      general_seats,
      obc_seats,
      sc_seats,
      st_seats,
      pwd_seats,
      ews_seats,
      profile_image_url
    } = req.body;

    if (!(name&&general_seats&&obc_seats&&sc_seats&&st_seats&&pwd_seats&&ews_seats&&profile_image_url)) {
        throw new Error("Required Information is Missing");
      }
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
    profile_image_url ,
  ]);
   

    res.status(200).json({ success: true, message: "College Added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = updateCollegeById;
