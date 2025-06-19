const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const mongoose = require('mongoose');

const MAX_COMMENT_AGE_MONTHS = process.env.MAX_COMMENT_AGE_MONTHS || 6;

const createPost = async (req, res) => {
  try {
    const { description, author, images, comments, tags } = req.body;

    if (!description || !author) {
      return res.status(400).json({ message: 'Description and author are required.' });
    }

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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID.' });
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
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post.', error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID.' });
    }

    const { description, images, comments, tags } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        ...(description && { description }),
        ...(comments && { comments }),
        ...(images && { images }),
        ...(tags && { tags })
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found for update.' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post.', error: error.message });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID.' });
    }

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Post not found for deletion.' });
    }

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
