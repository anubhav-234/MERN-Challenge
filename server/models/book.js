// user.js

const mongoose = require('mongoose');

// Define the user schema
const bookSchema = new mongoose.Schema({
  BookID: {
    type: Number,
    required: true
  },
  BookName: {
    type: String,
    required: true
  },
  NumberOfCopies: {
    type: Number,
    required: true
  }
}, {
  strict: 'throw' // Enforce strict checking, throw error if fields not in schema
});

// Create the Users model
const Books = mongoose.model('books', bookSchema);

module.exports = Books;
