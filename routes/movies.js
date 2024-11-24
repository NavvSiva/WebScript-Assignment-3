const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({ source: "user" }); // Adjust query as needed
        console.log("Fetched movies:", movies); // Debug log to confirm data
        res.render('movies', { movies }); // Pass movies to the template
    } catch (error) {
        console.error('Error retrieving movies:', error);
        res.status(500).send('Error retrieving movies');
    }
});

// Add Movie form
router.get('/add', (req, res) => {
    res.render('addMovie'); 
});

// Route to add
router.post('/add', async (req, res) => {
    try {
        const { title, genre, status, releaseDate } = req.body;

        
        console.log("Form Data Received:", req.body);

        // Create a new movie with the form data
        const newMovie = new Movie({
            title,
            genre,
            status,
            releaseDate,
            source: "user" // Ensure the source field is included
        });

        // Save the movie to the database
        await newMovie.save();

        console.log("Movie successfully saved:", newMovie); 
        res.redirect('/movies'); 
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).send('Error adding movie');
    }
});







// Edit a movie
router.get('/edit/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render('editMovie', { movie }); // Render the edit form with movie data
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving movie');
    }
});

// Update a movie
router.post('/edit/:id', async (req, res) => {
    try {
        const { title, genre, status, releaseDate } = req.body;
        await Movie.findByIdAndUpdate(req.params.id, { title, genre, status, releaseDate });
        res.redirect('/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating movie');
    }
});

// Delete a movie
router.post('/delete/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect('/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting movie');
    }
});


// Public Movies Page
router.get('/public-movies', async (req, res) => {
    try {
        const movies = await Movie.find({ source: "default" }); // Fetch default movies
        res.render('publicMovies', { movies }); // Render publicMovies.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving public movies');
    }
});




module.exports = router;
