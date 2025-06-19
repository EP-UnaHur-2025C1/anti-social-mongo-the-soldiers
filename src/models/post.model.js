const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Archive'
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' 
      }
    ]
  },
  {
    timestamps: true 
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;