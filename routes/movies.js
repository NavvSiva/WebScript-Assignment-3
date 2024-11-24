const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Get all movies (Read)
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('movies', { movies }); // Render the EJS template with movie data
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving movies');
    }
});

// Render the Add Movie form
router.get('/add', (req, res) => {
    res.render('addMovie'); // Ensure there is an addMovie.ejs template in the /views folder
});

// Add a new movie (Create)
router.post('/add', async (req, res) => {
    try {
        const { title, genre, status, releaseDate } = req.body;
        const newMovie = new Movie({ title, genre, status, releaseDate });
        await newMovie.save();
        res.redirect('/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding movie');
    }
});

// Edit a movie (Update - Show Edit Form)
router.get('/edit/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render('editMovie', { movie }); // Render the edit form with movie data
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving movie');
    }
});

// Update a movie (Update - Submit Edit Form)
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


// Route to display all movies on the public page
router.get('/public-movies', async (req, res) => {
    try {
        // Fetch all movies from the database
        const movies = await Movie.find(); // Retrieves all documents in the movies collection
        // Render the publicMovies.ejs template, passing the movies data
        res.render('publicMovies', { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving public movies');
    }
});


module.exports = router;
