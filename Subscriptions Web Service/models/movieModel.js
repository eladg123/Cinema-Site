const mongoose = require('mongoose');



///creating mongoose schema 

let movieSchema = new mongoose.Schema({
    name: String,
    genres: [String],
    image: String,
    premiered: Date
});

module.exports = mongoose.model('movies', movieSchema);