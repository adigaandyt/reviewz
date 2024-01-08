// models/movie.js
const mongoose = require('mongoose');
const reviewSchema = require('./review');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  picture: String,
  reviews: [reviewSchema], // Embed the Review schema here
});

module.exports = mongoose.model('Movie', movieSchema);
