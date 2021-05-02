const { json } = require('express');
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const connectDB = require('./config/db')

const app = express()

app.use(express.json());

const PORT = process.env.PORT || 6000

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))

// All the base routes here
app.use('/provider', require('./routes/provider'))

app.use('/plasma', require('./routes/plasma'))

//email route
app.use('/email', require('./routes/email'))

//request status route
app.use('/status', require('./routes/status'))

connectDB()

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

// module.exports = index