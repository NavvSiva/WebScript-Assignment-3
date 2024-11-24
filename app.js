const express = require('express');
const mongoose = require('./config/db');
const movieRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (CSS, images, JS)
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connection.once('open', () => {
    console.log('Connected to the database');
});

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Root route to render the home page
app.get('/', (req, res) => {
    res.render('index'); // Render the home page
});

// Use movies routes for all /movies paths
app.use('/movies', movieRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

