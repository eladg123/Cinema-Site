const Movie = require('./movieModel')
const moviesDAL = require('../DALS/moviesDAL');
const axios = require('axios')


///getAll 
const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        Movie.find({}, (err, data) => {
            if (err) { reject(err); }
            else { resolve(data); }
        })
    })
}

///get by id 
const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
        Movie.findById(id, (err, data) => {
            if (err) { reject(err); }
            else { resolve(data); }
        })
    })
}

///add movie
const addMoive = (newMovie) => {
    return new Promise((resolve, reject) => {
        let movieToCreate = new Movie({
            name: newMovie.name,
            genres: newMovie.genres,
            image: newMovie.image,
            premiered: newMovie.premiered
        });
        movieToCreate.save((err) => {
            if (err) { reject(err); }
            else { resolve(movieToCreate); }
        })
    })
}

///add movies to DB
const addMoviesToDB = async () => {
    let movies = await axios.get("http://api.tvmaze.com/shows");
    movies = movies.data;
    movies.map(movie => {
        let movieToCreate = new Movie({
            name: movie.name,
            genres: movie.genres,
            image: movie.image.medium,
            premiered: movie.premiered
        });
        movieToCreate.save((err) => {
            if (err) { console.log(err) }
        })
    })

}

///update movie
const updateMovie = (movieId, movieToUpdate) => {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(movieId, {
            name: movieToUpdate.name,
            genres: movieToUpdate.genres,
            image: movieToUpdate.image,
            premiered: movieToUpdate.premiered
        }, err => {
            if (err) { reject(err); }
            else { resolve("Movie Updated") }
        })
    })
}

//delete Movie
const deleteMovie = (movieId) => {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndDelete(movieId, err => {
            if (err) { reject(err); }
            else { resolve("Movie deleted") }
        })
    })
}

module.exports = { getAllMovies, getMovieById, addMoive, updateMovie, deleteMovie, addMoviesToDB }