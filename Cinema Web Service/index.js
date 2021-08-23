const express = require('express')
const cors = require('cors')


/// bring here controllers
const usersController = require('./controllers/usersController');
const usersFileController = require('./controllers/usersFileController');
const permissionController = require('./controllers/permissionsController');


///connect to subscription ws
const membersDAL= require('./DALS to subsWS/membersDAL');
const subscriptionDAL = require('./DALS to subsWS/subscriptionDAL');
const moviesDAL = require('./DALS to subsWS/moviesDAL');



/// connect to the DB
require('./configs/usersDB');



const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api/users',usersController);
app.use('/api/usersFile',usersFileController);
app.use('/api/permissions',permissionController);
app.use('/api/subscriptions',subscriptionDAL);
app.use('/api/members',membersDAL);
app.use('/api/movies',moviesDAL)
app.listen(8001,async()=>{
    console.log("the server is running");
})