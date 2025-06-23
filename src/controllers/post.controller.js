const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

const MAX_COMMENT_AGE_MONTHS = process.env.MAX_COMMENT_AGE_MONTHS || 6;

const createPost = async (req, res) => {
  try {
    const { description, author, images, comments, tags } = req.body;
    const newPost = await Post.create({
      description,
      author,
      comments: comments || [],
      images: images || [],
      tags: tags || []
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post.', error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'nickname')
      .populate('images')
      .populate('tags')
      .populate({
        path: 'comments',
        select: 'comment creationDate',
        match: {
          creationDate: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - MAX_COMMENT_AGE_MONTHS))
          }
        }
      })
      .sort({ creationDate: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts.', error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'nickname')
      .populate('images')
      .populate('tags')
      .populate({
        path: 'comments',
        match: {
          creationDate: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - MAX_COMMENT_AGE_MONTHS))
          }
        }
      });
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post.', error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { description, images, comments, tags } = req.body;

    // Armar objeto con solo campos no vacíos
    const updateData = {};

    if (typeof description === 'string' && description.trim() !== '') {
      updateData.description = description.trim();
    }
    if (Array.isArray(comments) && comments.length > 0) {
      updateData.comments = comments;
    }
    if (Array.isArray(images) && images.length > 0) {
      updateData.images = images;
    }
    if (Array.isArray(tags) && tags.length > 0) {
      updateData.tags = tags;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update.' });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found for update.' });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post.', error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found for deletion.' });
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post.', error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
