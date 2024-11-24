const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({ source: "user" });
        res.render('movies', { movies }); // Render the watchlist page
    } catch (error) {
        console.error(error);
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
        const newMovie = new Movie({
            title,
            genre,
            status,
            releaseDate,
            source: "user" // Mark as user-added
        });
        await newMovie.save();
        res.redirect('/movies'); // Redirect back to the watchlist page
    } catch (error) {
        console.error(error);
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
