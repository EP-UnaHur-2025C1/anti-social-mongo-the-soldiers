const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "The comment field is required"],
    maxlength: [200, "The comment cannot exceed 200 characters."]
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  visible: {
    type: Boolean,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true  
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true 
  }
}, { versionKey: false }); 

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment