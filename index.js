const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// All the base routes here
 app.use('/provider', require('./routes/provider'))

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

module.exports = index