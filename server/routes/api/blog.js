const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Blog = require('../../models/Blog');  // Adjusted the path

// @route   POST /api/blog
// @desc    Create a blog post
// @access  Private/Admin

// Middleware for token authentication
const auth = require('../../middleware/auth');

// Create a new blog post
router.post(
  '/',
  auth,
  admin,
  async
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('date').isISO8601().toDate().withMessage('Date is required and should be a valid date')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { title, content, author, date } = req.body;
    const newBlog = new Blog({ title, content, author, date });

    newBlog.save()
      .then(blog => res.json(blog))
      .catch(err => res.status(500).json({ error: err.message }));
  }
);

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single blog post by ID
router.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json(blog);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a blog post by ID
router.put(
  '/:id',
  auth,
  admin,
  async
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('date').isISO8601().toDate().withMessage('Date is required and should be a valid date')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Blog.findById(req.params.id)
      .then(blog => {
        if (!blog) {
          return res.status(404).json({ error: 'Blog post not found' });
        }

        const { title, content, author, date } = req.body;
        blog.title = title;
        blog.content = content;
        blog.author = author;
        blog.date = date;

        blog.save()
          .then(updatedBlog => res.json(updatedBlog))
          .catch(err => res.status(500).json({ error: err.message }));
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }
);

// Delete a blog post by ID
router.delete('/:id', auth, admin, async (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(blog => {
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json({ message: 'Blog post deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
