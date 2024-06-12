const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router()

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer', '')
    if (!token) {
        return res.status(401).send({ message: 'Access denied.No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token' });
    }
};

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId });
        res.send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});

router.post('/tasks', authenticate, async (req, res) => {
    try {
        const { name, deadline } = req.body;
        if (!name || !deadline) {
            return res.status(400).send({ message: 'Task name and deadline are required' });
        }

        const task = new Task({
            name,
            deadline,
            userId: req.userId,
            completed: false,
        });

        await task.save();
        res.status(201).send(task);

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

router.put('/tasks/:id', authenticate, async (req, res) => {
    try {
        const task = Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true })
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task)
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});

module.exports = router;