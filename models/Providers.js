const mongoose = require('mongoose')

const ProviderSchema = new mongoose.Schema({
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
  Particulars: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ParticularsQuantity',
  },
  Contact: {
    type: String
    //required: true,
  },
  email: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})
//keep a name for this operation
module.exports = mongoose.model('User', UserSchema)