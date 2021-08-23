const axios = require('axios')



const getMovies = async () => {
    return await axios.get("http://api.tvmaze.com/shows")
}


module.exports = { getMovies };
