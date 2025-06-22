const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, "The tag field is required"],
    unique: true,
    trim: true
  },
}, {
  versionKey: false
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
