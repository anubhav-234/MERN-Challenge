// user.js

const mongoose = require('mongoose');

// Define the user schema
const circulationSchema = new mongoose.Schema({
  MemberID: {
    type: String,
    required: true
  },
  BookID: {
    type: String,
    required: true
  },
  issueDate: {
    type: String,
    required: true
  },
  fine: {
    type: Number,
    required: true
  }

}, {
  strict: 'throw' // Enforce strict checking, throw error if fields not in schema
});

// Create the Users model
const Circulations = mongoose.model('circulations', circulationSchema);

module.exports = Circulations;
