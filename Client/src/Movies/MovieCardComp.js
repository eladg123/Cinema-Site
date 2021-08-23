import React, { useContext, useEffect, useState } from 'react'
import SubsWatchedComp from './SubsWatchedComp';
import { useHistory } from 'react-router';
import axios from 'axios'
import { MoviesContext } from '../contexts/MoviesContext'


function MovieCardComp(props) {
    let editBTN, deleteBTN, movieCard;
    let bool = null;
    const [watchers, setWatchers] = useState();
    const [movie, setMovie] = useState();
    const [id, setId] = useState();
    let userJSON = sessionStorage.getItem("user");
    let user = JSON.parse(userJSON);
    const history = useHistory();
    const [movies, setMovies] = useContext(MoviesContext);
    const [subs, setSubs] = useState();
    useEffect(async () => {
        let resp = await axios.get(`http://localhost:8001/api/subscriptions`);
        setSubs(resp.data);
        //check here if i came from link or came from renderin all the movies
        if (props.movie != undefined) {
            setId(props.movie._id)
        }
        else if (props.match.params.id) {
            let resp = await axios.get(`http://localhost:8001/api/movies/${props.match.params.id}`);
            bool = resp.data;
            setId(props.match.params.id);
            setMovie(resp.data)

        }
    }, [])
    const toEditPage = () => {
        history.push(`/mainPage/movies/editMovie/${id}`);
    }
    const deleteMovie = async () => {
        await axios.delete(`http://localhost:8001/api/movies/${id}`);
        let resp = await axios.get(`http://localhost:8001/api/movies`);
        props.cbk(resp.data)
        setMovies(resp.data)
        if (watchers != undefined) {
            watchers.forEach(async (watcher) => {
                let index = subs.findIndex(sub => sub.memberId == watcher.id);
                let updatedSub = subs[index];
                let updatedMovies = updatedSub.moviesWatched;
                let index2 = updatedMovies.findIndex(movie => movie.movieId == id);
                updatedMovies.splice(index2, 1);
                updatedSub.moviesWatched = updatedMovies;
                await axios.put(`http://localhost:8001/api/subscriptions/${updatedSub._id}`, updatedSub);
            });
        }
        alert("Movie deleted!")
    }
    if (user.permissions.includes("update movies")) {
        editBTN = <input type="button" value="Edit" onClick={toEditPage} />;
    }
    if (user.permissions.includes("delete movies")) {
        deleteBTN = <input type="button" value="Delete" onClick={deleteMovie} />;
    }
    if (props.movie != undefined) {
        movieCard = <div> Name:{props.movie.name},{props.movie.premiered && props.movie.premiered.slice(0, 4)} <br></br>
            Genres:{props.movie.genres.join(",")} <br></br>
            Image: <img src={props.movie.image} width="100" height="100" /> <br></br>
            <SubsWatchedComp key={props.movie._id} movie={props.movie} cbk={data => setWatchers(data)} />
            {editBTN}
            {deleteBTN} </div>
    }
    if (movie) {
        movieCard = <div> Name:{movie.name},{movie.premiered && movie.premiered.slice(0, 4)} <br></br>
            Genres:{movie.genres.join(",")} <br></br>
            Image: <img src={movie.image} width="100" height="100" /> <br></br>
            <SubsWatchedComp key={movie._id} movie={movie} cbk={data => setWatchers(data)} />
            {editBTN}
            {deleteBTN} </div>

    }
    return (<div style={{ backgroundColor: "lightcyan", border: "2px solid black" }}>
        {movieCard}
    </div>)
}
export default MovieCardComp;