const mongoose = require('mongoose')


///connection to DB

mongoose.connect('mongodb://localhost:27017/subscriptionsDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})