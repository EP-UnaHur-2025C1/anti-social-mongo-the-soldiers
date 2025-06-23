const mongoose = require("mongoose");
const { archiveSchema, updateArchiveSchema } = require("./schema/archive.schema");

const validateArchiveId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid archive ID" });
  }
  next();
};
const validateCreateArchive = (req, res, next) => {
  console.log(req.file);
   if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  next();
};


module.exports = {
  validateArchiveId,
  validateCreateArchive
};
