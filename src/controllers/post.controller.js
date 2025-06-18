const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const mongoose = require('mongoose');

const MAX_COMMENT_AGE_MONTHS = process.env.MAX_COMMENT_AGE_MONTHS || 6;


const createPost = async (req, res) => {
  try {
    const { description, author, images, tags } = req.body;

    if (!description || !author) {
      return res.status(400).json({ message: 'La descripción y el autor son obligatorios.' });
    }

    const newPost = await Post.create({
      description,
      author,
      images: images || [],
      tags: tags || []
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el post.', error });
  }
};


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'nickName')
      .populate('images')
      .populate('tags')
      .populate({
        path: 'comments',
        match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - MAX_COMMENT_AGE_MONTHS))
          }
        }
      })
      .sort({ createdAt: -1 }); 

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los posts.', error });
  }
};


const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    const post = await Post.findById(id)
      .populate('author', 'nickName')
      .populate('images')
      .populate('tags')
      .populate({
        path: 'comments',
        match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - MAX_COMMENT_AGE_MONTHS))
          }
        }
      });

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado.' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el post.', error });
  }
};


const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, images, tags } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        ...(description && { description }),
        ...(images && { images }),
        ...(tags && { tags })
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post no encontrado para actualizar.' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el post.', error });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Post no encontrado para eliminar.' });
    }

    res.status(200).json({ message: 'Post eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el post.', error });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};