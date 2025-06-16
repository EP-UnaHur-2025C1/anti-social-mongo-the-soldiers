// controllers/postController.js

const Post = require('../models/Post');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

// Obtenemos la cantidad de meses máximos desde el archivo .env
const MAX_COMMENT_AGE_MONTHS = process.env.MAX_COMMENT_AGE_MONTHS || 6;

// Crear un nuevo post
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

// Obtener todos los posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'nickName') // Trae solo el nick del autor
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
      .sort({ createdAt: -1 }); // Ordena del más reciente al más viejo

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los posts.', error });
  }
};

// Obtener un solo post por ID
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

// Actualizar un post
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

// Eliminar un post
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