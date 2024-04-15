// user.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  strict: 'throw' // Enforce strict checking, throw error if fields not in schema
});

// Create the Users model
const Users = mongoose.model('users', userSchema);

module.exports = Users;
