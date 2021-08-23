import React, { useEffect, useState } from 'react'
import SubscribeToNewMovie from './SubscribeToNewMovie';
import axios from 'axios'
import { Link } from 'react-router-dom'


function MoviesWatchedComp(props) {
    const [sub, setSub] = useState();
    const [movies, setMovies] = useState();
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [newMovie, setNewMovie] = useState(false);

    //find the right one sub and check which movies he watched and take thier names to names arr with the movies id 
    useEffect(async () => {
        let resp2 = await axios.get(`http://localhost:8001/api/movies`);
        let resp = await axios.get(`http://localhost:8001/api/subscriptions`);
        setMovies(resp2.data);
        let allSubs = resp.data;
        let filterSubs = allSubs.filter(sub => sub.memberId == props.member._id);
        setSub(filterSubs[0]);
        if (filterSubs != []) {
            if (filterSubs[0] != null) {
                let memberMovies = [];
                filterSubs[0].moviesWatched.forEach(movie => {
                    memberMovies.push({ movieId: movie.movieId, date: movie.watchDate });
                });
                let watchedMovies = [];

                memberMovies.forEach(obj => {
                    let index = resp2.data.findIndex(movie => movie._id == obj.movieId);
                    watchedMovies = [...watchedMovies, { id: obj.movieId, name: resp2.data[index].name, date: obj.date }];

                })
                setWatchedMovies(watchedMovies);


            }
        }
    }, [])
    let subToNewMovie = <SubscribeToNewMovie key={props.member._id} member={props.member} moviesWatched={watchedMovies} newMovie={data => setNewMovie(data)} cbk={data => {
        if (watchedMovies == []) {
            setWatchedMovies([data])
        }
        else if (watchedMovies != []) {
            setWatchedMovies([data, ...watchedMovies])
        }


    }} />
    const showComp = () => {
        setNewMovie(!newMovie);
    }
    let currentWatchedMovies;




    if (newMovie == false) { subToNewMovie = null }
    if (watchedMovies) {
        currentWatchedMovies = watchedMovies.map((movie, i) => {
            return <li key={i}><Link to={`/mainPage/movies/${movie.id}`} >{movie.name}</Link>,on {movie.date.slice(0, 10)}</li>

        })
    }

    return (<div style={{ backgroundColor: "skyblue" }}>
        <h4>Movies Watched:</h4>
        <ul>
            {currentWatchedMovies}
        </ul>

        <input type="button" value="Subscribe to new movie" onClick={showComp} />
        {subToNewMovie}

    </div>)
}
export default MoviesWatchedComp;