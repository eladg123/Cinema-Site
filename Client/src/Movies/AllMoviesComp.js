import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MoviesContext } from '../contexts/MoviesContext'
import MovieCardComp from './MovieCardComp';



function AllMoviesComp(props) {
    const [movies, setMovies] = useContext(MoviesContext);
    const [search, setSearch] = useState("");
    const [currentSearch, setCurrentSearch] = useState([]);
    const [link, setLink] = useState(false);
    useEffect(async () => {
        let resp = await axios.get(`http://localhost:8001/api/movies`);
        setMovies(resp.data);
        if (search == "") {
            setCurrentSearch(resp.data)
        }
    }, []);

    let filterMovies;

    //search function with lowerCase
    const searchMovie = () => {
        if (link != true) {
            filterMovies = movies.filter(movie => movie.name.toLowerCase().includes(search.toLowerCase()));
            if (search != "") {
                setCurrentSearch(filterMovies);
            }
            else if (search == "") {
                setCurrentSearch(movies)
            }
        }
    }

    let moviesCardsToRender = currentSearch.map(movie => {
        return (<MovieCardComp key={movie._id} movie={movie} cbk={data => {
            setCurrentSearch(data)
        }} />)
    })

    return (<div style={{ backgroundColor: "gold" }}>
        <h3>All Movies</h3>
        <input type="text" onChange={e => { setSearch(e.target.value) }} />
        <input type="button" value="Find" onClick={searchMovie} />
        {moviesCardsToRender}



    </div>)
}
export default AllMoviesComp;