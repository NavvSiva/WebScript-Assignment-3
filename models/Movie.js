const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Movie title
    genre: { type: String, required: true }, // Movie genre
    status: { type: String, enum: ['Watched', 'Unwatched'], default: 'Unwatched' }, // Watched/Unwatched status
    releaseDate: { type: Date, required: true } // Release date
});


module.exports = mongoose.model('Movie', movieSchema);
