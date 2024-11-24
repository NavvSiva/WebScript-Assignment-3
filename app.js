const express = require('express');
const mongoose = require('./config/db');
const movieRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


mongoose.connection.once('open', () => {
    console.log('Connected to the database');
});


app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('index'); 
});


app.use('/movies', movieRoutes);

// Start 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

