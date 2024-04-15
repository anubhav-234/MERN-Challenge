// user.js

const mongoose = require('mongoose');

// Define the user schema
const memberSchema = new mongoose.Schema({
  MemberName: {
    type: String,
    required: true
  },
  MemberID: {
    type: Number,
    required: true
  }
}, {
  strict: 'throw' // Enforce strict checking, throw error if fields not in schema
});

// Create the Users model
const Members = mongoose.model('members', memberSchema);

module.exports = Members;
