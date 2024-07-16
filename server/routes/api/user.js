const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');  // Adjusted the path
const { auth } = require('../../middleware/auth');

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('User route');
// });

// POST /api/users/register
router.post('/register', [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, password });
        await user.save();

        const payload = { id: user.id };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST /api/users/login
router.post('/login', [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { id: user.id };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
