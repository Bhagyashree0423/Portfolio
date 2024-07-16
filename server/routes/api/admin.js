const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

// Example admin route
router.get('/dashboard', auth, admin, (req, res) => {
  res.json({ msg: 'Welcome to the admin dashboard' });
});

module.exports = router;
