const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Course+Thumbnail'
  },
  videoUrls: [{
    title: String,
    url: String,
    duration: String
  }],
  duration: {
    type: String,
    default: 'N/A'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);

