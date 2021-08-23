import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AllMoviesComp from './AllMoviesComp';
import { MoviesContextProvider } from '../contexts/MoviesContext'
import EditMovieComp from './EditMovieComp';
import AddMovieComp from './AddMovieComp';
import MovieCardComp from './MovieCardComp';

function MoviesPlaceHolder(props) {



    return (<div>
        <Switch>
            <MoviesContextProvider>
                <Route exact path="/mainPage/movies" component={AllMoviesComp} />
                <Route path="/mainPage/movies/editMovie/:id" component={EditMovieComp} />
                <Route path="/mainPage/movies/addMovie" component={AddMovieComp} />
                <Route path="/mainPage/movies/:id" component={MovieCardComp} />
            </MoviesContextProvider>

        </Switch>
    </div>)
}

export default MoviesPlaceHolder;