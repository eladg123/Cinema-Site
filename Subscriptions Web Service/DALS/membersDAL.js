const axios = require('axios')


 const getMembers = async()=>{
    return await axios.get(`https://jsonplaceholder.typicode.com/users/`);
}


module.exports = {getMembers}