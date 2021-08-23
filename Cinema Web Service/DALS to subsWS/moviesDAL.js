const axios = require('axios')
const express = require('express')
const router = express.Router();

///get all
router.route('/').get(async(req,resp)=>{
    let allMovies = await axios.get("http://localhost:8000/api/movies");
    return resp.json(allMovies.data)
})


///get by id
router.route('/:id').get(async(req,resp)=>{
    let id = req.params.id;
    let movie = await axios.get(`http://localhost:8000/api/movies/${id}`);
    return resp.json(movie.data);
})

///add movie
router.route("/").post(async(req,resp)=>{
    let newMovie = req.body;
    let response = await axios.post("http://localhost:8000/api/movies",newMovie);
    return resp.json(response.data)
})

///update movie
router.route('/:id').put(async(req,resp)=>{
    let updatedMovie = req.body;
    let id= req.params.id;
    let response = await axios.get(`http://localhost:8000/api/movies/${id}`,updatedMovie);
    return resp.json(response.data);
})

///delete movie 
router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    let response = await axios.delete(`http://localhost:8000/api/movies/${id}`)
    return resp.json(response.data);
})



module.exports= router;