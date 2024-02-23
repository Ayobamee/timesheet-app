const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// Sign-up Route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })
    await user.save()
    res.status(201).send('User created successfully')
  } catch (error) {
    res.status(500).send('Error creating the user')
  }
})

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).send('User not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).send('Invalid credentials')
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id }, // This is the payload, which includes the user ID
      process.env.JWT_SECRET, // The secret key for signing the token
      { expiresIn: '1h' } // Optional expiration time for the token
    )

    // Send the JWT to the client
    res.status(200).json({ token })
  } catch (error) {
    console.error('Login error:', error.stack) // Log the full error stack
    res.status(500).json({ message: 'Error logging in', error: error.message })
  }
})

module.exports = router
