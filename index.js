const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const connectDB = require('./config/db')

const app = express()

const PORT = process.env.PORT || 3000

// All the base routes here
app.use('/provider', require('./routes/provider'))

connectDB()

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

// module.exports = index