const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express();

mongoose.connect('mongodb://localhost:27017/taskmanager');

app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/tasks')

app.use('/api', authRoutes)
app.use('/api', taskRoutes)

app.listen(5000, () => {
    console.log('Server running on port 5000')
})
