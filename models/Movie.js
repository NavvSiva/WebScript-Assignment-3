const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    status: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    source: { type: String, required: true } // Ensure the "source" field is included
});

module.exports = mongoose.model('Movie', movieSchema);
