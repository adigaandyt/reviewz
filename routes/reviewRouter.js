// routes/reviewRouter.js
const express = require('express');
const Movie = require('../models/movie'); // Adjust the path as needed

const router = express.Router();

// Route to add a review to a movie
router.post('/', async (req, res) => {
  try {
    const { movieId, username, content } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const review = { username, content };

    movie.reviews.push(review);
    await movie.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the review' });
  }
});

// Route to retrieve reviews for a specific movie
router.get('/', async (req, res) => {
  try {
    const { movieId } = req.query;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const reviews = movie.reviews;
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching reviews' });
  }
});

module.exports = router;
