import React from 'react'
import MoviesPlaceHolder from './MoviesPlaceHolder'




function MoviesComp(props) {
    let userJSON = sessionStorage.getItem("user");
    let user = JSON.parse(userJSON);
    const toAllMoviesPage = () => {
        props.history.push("/mainPage/movies");
    }
    const toAddMovie = () => {
        props.history.push("/mainPage/movies/addMovie");
    }
    let addBTN;
    if (user.permissions.includes("create movies")) {
        addBTN = <input type="button" value="Add movie" onClick={toAddMovie} />;
    }
    return (<div style={{ backgroundColor: "aqua" }}>
        <h1>Movies</h1>
        <input type="button" value="All movies" onClick={toAllMoviesPage} />
        {addBTN} <br></br>

        <MoviesPlaceHolder />

    </div>)
}


export default MoviesComp;