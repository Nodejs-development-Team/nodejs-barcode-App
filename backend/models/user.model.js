const mongoose = require('mongoose')

const Schema = mongoose.Schema

// username
// password
// email
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    lowercase: true, 
    unique: true, 
    required: [true, "can't be blank"], 
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true
  }
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User