const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Blog = require('../../models/Blog');  // Adjust the path as per your project structure

// Middleware for token authentication
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

// @route   POST /api/blog
// @desc    Create a blog post
// @access  Private/Admin
router.post(
  '/', 
  [auth, admin, [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('date').isISO8601().toDate().withMessage('Date is required and should be a valid date')
  ]], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { title, content, author, date } = req.body;
    const newBlog = new Blog({ title, content, author, date });

    try {
      const savedBlog = await newBlog.save();
      res.json(savedBlog);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// @route   PUT /api/blog/:id
// @desc    Update a blog post by ID
// @access  Private/Admin
router.put(
  '/:id',
  [auth, admin, [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('date').isISO8601().toDate().withMessage('Date is required and should be a valid date')
  ]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      const { title, content, author, date } = req.body;
      blog.title = title;
      blog.content = content;
      blog.author = author;
      blog.date = date;

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// @route   GET /api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/blog/:id
// @desc    Get a single blog post by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete a blog post by ID
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
