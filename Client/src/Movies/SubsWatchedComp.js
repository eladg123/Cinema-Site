import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


function SubsWatchedComp(props) {
    const [movie, setMovie] = useState(props.movie);
    const [watchedMovies, setWatched] = useState([]);
    let whoWatch = [];
    /// for each sub i check if he saw this movie and create an array of who saw this movie
    useEffect(async () => {
        let resp = await axios.get("http://localhost:8001/api/subscriptions");
        resp.data.forEach(sub => {
            if (sub.moviesWatched) {
                sub.moviesWatched.forEach(async (movieObj) => {
                    if (movieObj.movieId === props.movie._id) {
                        let resp2 = await axios.get(`http://localhost:8001/api/members/${sub.memberId}`)
                        if (resp2.data) {
                            whoWatch.push({ id: sub.memberId, date: movieObj.watchDate, name: resp2.data.name })
                            setWatched([...whoWatch])
                            props.cbk(whoWatch);
                        }
                    }
                })
            }
        });
    }, [])
    let watchersToRender;
    if (watchedMovies) {
        watchersToRender = watchedMovies.map((member, i) => {
            return (<li key={i}><Link to={`/mainPage/subscriptions/${member.id}`}>{member.name}</Link> ,on {member.date.slice(0, 10)}</li>)
        })
    }
    return (<div style={{ backgroundColor: "lightskyblue" }}>
        <h4>Subscriptions Watched:</h4>
        <ul>
            {watchersToRender}
        </ul>
    </div>)

}
export default SubsWatchedComp;