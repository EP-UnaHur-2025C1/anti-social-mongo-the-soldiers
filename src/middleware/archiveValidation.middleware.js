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
  const { imagenes } = req.body;
  const { error } = archiveSchema.validate({ imagenes });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


module.exports = {
  validateArchiveId,
  validateCreateArchive
};
