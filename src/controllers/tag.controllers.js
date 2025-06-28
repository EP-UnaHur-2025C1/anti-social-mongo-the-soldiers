const Tag = require("../models/tag.model");
const Post = require('../models/post.model');

// Obtener todos los tags
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tags', details: error.message });
  }
};

// Obtener tag por ID (el ID ya validado por middleware)
const getTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tag', details: error.message });
  }
};

// Crear tag (validación de body en middleware)
const createTag = async (req, res) => {
  try {
    const { tag, postId } = req.body;

    const postExists = await Post.exists({ _id: postId });
    if (!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    let existingTag = await Tag.findOne({ tag });

    if (!existingTag) {
      existingTag = await Tag.create({ tag });
    }

    await Post.findByIdAndUpdate(postId, {
      $addToSet: { tags: existingTag._id } 
    });

    res.status(201).json(existingTag);
  } catch (error) {
    console.error('Error creando tag:', error);
    res.status(500).json({ error: 'Error creating tag', details: error.message });
  }
};

// Editar tag (ID y body validados en middleware)
const editTag = async (req, res) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(400).json({ error: 'Error updating tag', details: error.message });
  }
};

// Eliminar tag (ID validado en middleware)
const deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json({ message: 'Tag successfully removed', tag: deletedTag });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting tag', details: error.message });
  }
};

module.exports = {
  getTags,
  getTag,
  createTag,
  editTag,
  deleteTag
};