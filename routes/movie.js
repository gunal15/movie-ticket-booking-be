const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Movie = require('../models/movie');


// Add a new movie to the movie collection
router.post('/api/movies', [
    check('movieName', 'Movie name is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('trailer', 'Trailer is required').not().isEmpty(),
    check('language', 'Language is required').not().isEmpty(),
    check('releaseDate', 'Release date is required').not().isEmpty(),
    check('about', 'About is required').not().isEmpty(),
    check('cast', 'Cast is required').isArray({ min: 1 }),
    check('poster', 'Poster is required').not().isEmpty(),
    check('categori', 'Categori is required').not().isEmpty(),
    check('duration', 'Duration is required').not().isEmpty()
], async (req, res) => {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a new movie object
        const {
            movieName,
            type,
            trailer,
            language,
            releaseDate,
            about,
            cast,
            crew,
            poster,
            categori,
            duration
        } = req.body;

        const newMovie = new Movie({
            movieName,
            type,
            trailer,
            language,
            releaseDate,
            about,
            cast,
            crew,
            poster,
            categori,
            duration
        });

        // Save the new movie object to the database
        await newMovie.save();

        // Return the saved movie object
        res.json(newMovie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

