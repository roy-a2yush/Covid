const mongoose = require('mongoose')

const Particulars = new mongoose.Schema({
  Particular: {
    type: String,
    required: true,
  },
  ParticularQuantity: { 
    type: Number,
  },
  ParticularCost: { 
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})
//keep a name for this operation
module.exports = mongoose.model('User', UserSchema)