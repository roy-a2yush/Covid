const mongoose = require('mongoose')

const PlasmaSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: true,
  },
  Pincode: {
    type: String,
    required: true,
  },
  Contact: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
  },
  PerWeek: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})


module.exports = mongoose.model('Plasma', PlasmaSchema)