// routes/movieRouter.js
const express = require('express');
const Movie = require('../models/movie'); // Adjust the path as needed
const reviewRouter = require('./reviewRouter'); // Import the reviewRouter

const router = express.Router();

// Route to create a new movie
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    const movie = new Movie({
      title,
      reviews: [], // Initialize with an empty array for reviews
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the movie' });
  }
});

// Route to retrieve all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching movies' });
  }
});

// Route to retrieve a single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the movie' });
  }
});

// Use the reviewRouter for review-related routes
router.use('/:id/reviews', reviewRouter);

module.exports = router;
