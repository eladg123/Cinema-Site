const express = require('express');
const movieBl = require('../models/movieBL');


const router = express.Router();


//getAll
router.route('/').get(async(req,resp)=>{
    let data = await movieBl.getAllMovies();
    return resp.json(data);
});

///get by id
router.route('/:id').get(async(req,resp)=>{
    let id = req.params.id;
    let data = await movieBl.getMovieById(id);
    return resp.json(data);
})

//add movie
router.route('/').post(async(req,resp)=>{
    let newMovie = req.body;
    let data = await movieBl.addMoive(newMovie);
    return resp.json(data);
})

//update movie
router.route('/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let updatedMovie = req.body;
    let status = await movieBl.updateMovie(id,updatedMovie);
    return resp.json(status);
})

///delete movie
router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    let status = await movieBl.deleteMovie(id);
    return resp.json(status);
})


module.exports = router;