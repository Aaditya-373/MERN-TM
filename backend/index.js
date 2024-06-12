const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express();

const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URI);

app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/tasks')

app.use('/api', authRoutes)
app.use('/api', taskRoutes)

app.listen(5000, () => {
    console.log(process.env.PORT, 'Server running on port 5000')
})
