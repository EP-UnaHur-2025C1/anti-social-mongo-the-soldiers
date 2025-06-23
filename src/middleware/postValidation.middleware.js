const mongoose = require("mongoose");
const { postSchema, updatePostSchema } = require("./schema/post.schema");

// Valida que el ID sea válido en rutas con :id
const validatePostId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  next();
};

// Valida el body al crear un post
const validateCreatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  next();
};

// Valida el body al actualizar un post
const validateUpdatePost = (req, res, next) => {
  const { error } = updatePostSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  next();
};

module.exports = {
  validatePostId,
  validateCreatePost,
  validateUpdatePost
};
