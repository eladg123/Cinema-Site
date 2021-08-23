import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

function EditMovieComp(props) {
    const history = useHistory();
    const [name, setName] = useState();
    const [genres, setGenres] = useState();
    const [img, setImg] = useState();
    const [prem, setPrem] = useState();
    let id = props.match.params.id;
    const [movie, setMovie] = useState({});
    useEffect(async () => {
        let resp = await axios.get(`http://localhost:8001/api/movies/${id}`);
        setMovie(resp.data);
        setName(resp.data.name);
        setGenres(resp.data.genres);
        setImg(resp.data.image);
        setPrem(resp.data.premiered);

    }, [])

    const cancelPage = () => {
        props.history.push("/mainPage/movies")
    }
    const updateMovie = async () => {
        let updatedMovie = {
            _id: id,
            name: name,
            genres: [],
            image: img,
            premiered: prem
        }
        if (genres == movie.genres) {
            updatedMovie.genres = genres;
        }
        else if (genres != movie.genres) {
            updatedMovie.genres = genres.split(",");
        }

        await axios.put(`http://localhost:8000/api/movies/${id}`, updatedMovie);
        alert("Movie updated!")
        props.history.push("/mainPage/movies")
    }



    return (<div style={{ backgroundColor: "darkturquoise" }}>
        <h3>Edit Movie - {movie.name}</h3>
        Name: <input type="text" defaultValue={movie.name} onChange={e => { setName(e.target.value) }} /> <br></br>
        Genres: <input type="text" defaultValue={movie.genres} onChange={e => { setGenres(e.target.value) }} /> <br></br>
        Image URL: <input type="text" defaultValue={movie.image} onChange={e => { setImg(e.target.value) }} /> <br></br>
        Premierd: <input type="text" defaultValue={movie.premiered && movie.premiered.slice(0, 10)} onChange={e => { setPrem(e.target.value) }} /><br></br>
        <input type="button" value="Update" onClick={updateMovie} /> <input type="button" value="Cancel" onClick={cancelPage} />



    </div>)
}
export default EditMovieComp;


