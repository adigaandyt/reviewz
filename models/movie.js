// models/movie.js
const mongoose = require('mongoose');
const reviewSchema = require('./review');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  reviews: {
    type: Array,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
