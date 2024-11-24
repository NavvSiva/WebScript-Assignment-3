const express = require('express');
const mongoose = require('./config/db');
const movieRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (CSS, images, JS)
app.use(express.static('public'));

mongoose.connection.once('open', () => {
    console.log('Connected to the database');
});

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Root route to redirect to movies list
app.get('/', (req, res) => {
    res.redirect('/movies'); // Redirect to /movies
});

// Use movies routes
app.use('/movies', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
