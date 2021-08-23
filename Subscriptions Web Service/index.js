const express = require('express')
const cors = require('cors')

/// מביא את כל הקונטרוללרים שלי
const memberController = require('./controllers/memberController');
const moviesController = require('./controllers/movieController');
const subscriptionsController = require('./controllers/subscritptionController');
/// מחבר אל הדאטה בייס שלי
require('./configs/subscriptionsDB');
const memberBL = require('./models/memberBL');
const movieBL = require('./models/movieBL')

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/members', memberController)
app.use('/api/movies', moviesController)
app.use('/api/subscriptions', subscriptionsController);
app.listen(8000, async () => {
    // memberBL.addMembersToDB();
    //movieBL.addMoviesToDB();
    console.log("the server is running")
});

