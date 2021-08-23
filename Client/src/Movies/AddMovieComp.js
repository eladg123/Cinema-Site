import React, { useContext, useState } from 'react'
import axios from 'axios'
import { MoviesContext } from '../contexts/MoviesContext'

function AddMovieComp(props) {
    const [movies, setMovies] = useContext(MoviesContext)
    const [name, setName] = useState();
    const [genres, setGenres] = useState();
    const [img, setImg] = useState();
    const [prem, setPrem] = useState();

    const cancelPage = () => {
        props.history.push("/mainPage/movies");
    }
    const createMovie = async () => {
        let newMovie = {
            name: name,
            genres: genres.split(","),
            image: img,
            premiered: prem
        }
        await axios.post(`http://localhost:8001/api/movies`, newMovie);
        alert("Movie created!")
        props.history.push("/mainPage/movies");
    }
    return (<div style={{ backgroundColor: "lemonchiffon", border: "2px solid black" }}>
        <h3>Add Movie</h3>
        Name:<input type="text" onChange={e => setName(e.target.value)} /> <br></br>
        Genres:<input type="text" onChange={e => setGenres(e.target.value)} /> <br></br>
        Image URL: <input type="text" onChange={e => setImg(e.target.value)} /> <br></br>
        Premiered: <input type="date" onChange={e => setPrem(e.target.value)} /> <br></br>
        <input type="button" value="Save" onClick={createMovie} />  <input onClick={cancelPage} type="button" value="Cancel" />
    </div>)
}

export default AddMovieComp;