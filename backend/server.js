const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')

const app = express()
const PORT = process.env.PORT || 5001

// Specific CORS configuration for development
// Replace 'http://localhost:3000' with your frontend's production URL when deploying
const allowedOrigins = ['http://localhost:3000']

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  })
)

app.use(express.json())

// Enable pre-flight for all routes
app.options('*', cors())

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Routes
app.use('/api', authRoutes)

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ message: 'Something broke!', error: err.stack })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
