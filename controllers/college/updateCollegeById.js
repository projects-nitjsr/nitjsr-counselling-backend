const db = require("../../helpers/dbconnect");

const updateCollegeById = async (req, res) => {
  const clgId = req.params.id;

  try {
    const college = await db.queryAsync(
      "SELECT * FROM colleges WHERE id = ?",
      [clgId]
    );

    if (college.length == 0) {
      throw new Error("No such college found!");
    }

    if (req.params.name) {
      await db.queryAsync(
        "UPDATE colleges SET name = ? WHERE id = ?",
        [req.params.name, clgId ]
      );
    }

    if (req.params.general_seats) {
        await db.queryAsync(
          "UPDATE colleges SET general_seats = ? WHERE id = ?",
          [req.params.general_seats, clgId ]
        );
      }
      
      if (req.params.obc_seats) {
        await db.queryAsync(
          "UPDATE colleges SET obc_seats = ? WHERE id = ?",
          [req.params.obc_seats, clgId ]
        );
      }
    
      if (req.params.sc_seats) {
        await db.queryAsync(
          "UPDATE colleges SET sc_seats = ? WHERE id = ?",
          [req.params.sc_seats, clgId ]
        );
      }

      if (req.params.st_seats) {
        await db.queryAsync(
          "UPDATE colleges SET st_seats = ? WHERE id = ?",
          [req.params.st_seats, clgId ]
        );
      }

      if (req.params.pwd_seats) {
        await db.queryAsync(
          "UPDATE colleges SET pwd_seats = ? WHERE id = ?",
          [req.params.pwd_seats, clgId ]
        );
      }

      if (req.params.ews_seats) {
        await db.queryAsync(
          "UPDATE colleges SET ews_seats = ? WHERE id = ?",
          [req.params.ews_seats, clgId ]
        );
      }

      if (req.params.profile_image_url) {
        await db.queryAsync(
          "UPDATE colleges SET profile_image_url = ? WHERE id = ?",
          [req.params.profile_image_url, clgId ]
        );
      }

    res.status(200).json({ success: true, message: "College Update successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = updateCollegeById;
