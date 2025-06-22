const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    // Password is no longer required for Google Sign-In users
    // required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Don't send password back in responses by default
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple documents to have no googleId
  },
  profilePicture: {
    type: String,
    default: 'https://i.imgur.com/6b6psnA.png', // A default avatar
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);