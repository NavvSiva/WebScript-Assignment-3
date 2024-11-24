const express = require('express'); // Import Express
const mongoose = require('./config/db'); // Import your database connection

const app = express(); // Initialize the Express app
const PORT = process.env.PORT || 3000; // Set the port for your application

// Log when the database connection is established
mongoose.connection.once('open', () => {
    console.log('Connected to the database');
});

// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Watchlist Application!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
