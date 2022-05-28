const { uploadImage } = require("../../helpers/imageHandler");
const { uploadPdf } = require("../../helpers/pdfHandler");

module.exports = async (req, res) => {
  const attachments = req.files;
  const regno = req.user.regno;
  try {
    attachments.foreach(saver);
    const saver = async (attachment) => {
      const attachmentName = attachment.fileName;
      if (
        attachment.mimetype === "image/jpeg" ||
        attachment.mimetype === "image/png" ||
        attachment.mimetype === "image/jpg"
      ) {
        const imageUrl = await uploadImage(attachment);
        await db.queryAsync(
          "INSERT INTO student_attachment (regno,?) VALUES(?,?) ON DUPLICATE KEY UPDATE ",
          [attachmentName,regno,imageUrl]
        );
      } else if (
        data.mimetype !== "application/pdf" ||
        data.mimetype !== "application/x-pdf"
      ) {
        const pdfUrl = await uploadPdf(attachment);
        await db.queryAsync(
            "INSERT INTO student_attachment (regno,?) VALUES(?,?) ON DUPLICATE KEY UPDATE ",
            [attachmentName,regno,imageUrl]
          );
      } else {
        res.status(300).json({ success: false, message: "Invalid file type" });
      }
      res.status(200).json({ success: true, message: "Your file is uploaded" });
    };
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
