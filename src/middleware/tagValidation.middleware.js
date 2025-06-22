const mongoose = require("mongoose");
const { tagSchema, updateTagSchema } = require("./schema/tag.schema");


const validateTagId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid tag ID" });
  }
  next();
};

const validateCreateTag = (req, res, next) => {
  const { error } = tagSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateUpdateTag = (req, res, next) => {
  const { error } = updateTagSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateTagId,
  validateCreateTag,
  validateUpdateTag
};
