const mongoose = require('mongoose')

///connect to the DB

mongoose.connect('mongodb://localhost:27017/usersDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})