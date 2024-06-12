const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/User.js')

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ message: 'Username and password are required!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });

        await user.save()
        res.status(201).send({ message: 'User registered' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalud username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
})

module.exports = router;