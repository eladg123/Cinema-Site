import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';



function SubscribeToNewMovie(props) {
    const history = useHistory();
    const [member, setMember] = useState(props.member);
    const [sub, setSub] = useState();
    const [movies, setMovies] = useState();
    const [date, setDate] = useState();
    const [choice, setChoice] = useState();
    useEffect(async () => {
        let resp = await axios.get(`http://localhost:8001/api/subscriptions`);
        let resp2 = await axios.get('http://localhost:8001/api/movies');
        let allSubs = resp.data;
        let filterSubs = allSubs.filter(sub => sub.memberId == props.member._id);
        setSub(filterSubs[0]);
        setMovies(resp2.data);
    }, [])
    const subscribeToMovie = async () => {
        if (sub == null && date != null && choice != null) {
            let filterMovies = movies.filter(movie => movie.name == choice);
            let newSub = {
                memberId: props.member._id,
                moviesWatched: [{ movieId: filterMovies[0]._id, watchDate: date }]
            }
            setSub(newSub);
            await axios.post(`http://localhost:8001/api/subscriptions`, newSub);
            props.cbk({ name: choice, id: filterMovies[0]._id, date: date });
            props.newMovie(false);
            alert("Subscribe Success!")
            history.push("/mainPage/subscriptions")
        }
        else if (sub != null && date != null && choice != null) {

            let filterMovies = movies.filter(movie => movie.name == choice);
            let updatedSub = {
                _id: sub._id,
                memberId: member._id,
                moviesWatched: [...sub.moviesWatched, { movieId: filterMovies[0]._id, watchDate: date }]
            }

            setSub(updatedSub);
            props.cbk({ name: choice, id: filterMovies[0]._id, date: date });
            await axios.put(`http://localhost:8001/api/subscriptions/${sub._id}`, updatedSub);
            props.newMovie(false);
            alert("Subscribe Success!")
            history.push("/mainPage/subscriptions")
        }
        else {
            alert("Fill the details");
        }

    }
    let optionsToRender;

    let moviesNames;
    if (movies) {
        moviesNames = movies.map(movie => movie.name)
        props.moviesWatched.forEach(watched => {
            let index = moviesNames.findIndex(movie => movie == watched.name);
            moviesNames.splice(index, 1);
        })
        optionsToRender = moviesNames.map((movie, i) => {
            return <option key={i} value={movie}>{movie}</option>
        })
    }
    return (<div style={{ backgroundColor: "crimson" }}>
        <h4>Add a new movie</h4>
        <select value={choice} onChange={e => setChoice(e.target.value)} >
            <option>Choose movie</option>
            {optionsToRender}
        </select>
        <input type="date" onChange={e => setDate(e.target.value)} /> <br></br>
        <input type="button" value="Subscribe" onClick={subscribeToMovie} />




    </div>)
}
export default SubscribeToNewMovie;