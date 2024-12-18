// server/models/BlogModel.js

const mongoose = require('mongoose');

// Define the Blog schema
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the date when the blog is created
  },
  imageUrl: {
    type: String,
    required: false, // Optional field for blog image
    trim: true,
  },
});

// Create and export the Blog model
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;