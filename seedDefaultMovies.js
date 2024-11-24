const mongoose = require('./config/db'); // Adjust path to your DB config
const Movie = require('./models/Movie'); // Adjust path to your Movie model

const seedDefaultMovies = async () => {
    try {
        const defaultMovies = [
            { title: "Iron Man", genre: "Superhero", releaseDate: "2008-05-02", source: "default" },
            { title: "The Avengers", genre: "Superhero", releaseDate: "2012-05-04", source: "default" },
            { title: "Guardians of the Galaxy", genre: "Superhero", releaseDate: "2014-08-01", source: "default" },
            { title: "Black Panther", genre: "Superhero", releaseDate: "2018-02-16", source: "default" },
            { title: "Avengers: Endgame", genre: "Superhero", releaseDate: "2019-04-26", source: "default" },
            { title: "Spider-Man: No Way Home", genre: "Superhero", releaseDate: "2021-12-17", source: "default" },
            { title: "Doctor Strange", genre: "Superhero", releaseDate: "2016-11-04", source: "default" },
            { title: "Captain Marvel", genre: "Superhero", releaseDate: "2019-03-08", source: "default" },
            { title: "Thor: Ragnarok", genre: "Superhero", releaseDate: "2017-11-03", source: "default" },
            { title: "Ant-Man", genre: "Superhero", releaseDate: "2015-07-17", source: "default" }
        ];


        await Movie.deleteMany({ source: "default" });


        await Movie.insertMany(defaultMovies);

        console.log("Default movies added successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding default movies:", error);
        process.exit(1);
    }
};

seedDefaultMovies();

