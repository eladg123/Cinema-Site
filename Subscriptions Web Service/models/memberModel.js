const mongoose = require('mongoose')



 /// creating mongoose schema
let memberSchema = new mongoose.Schema({
    name:String,
    email:String,
    city:String
})

// connecting the schema i created (member) to specific collection ('members') in my DB

module.exports = mongoose.model('members',memberSchema);
