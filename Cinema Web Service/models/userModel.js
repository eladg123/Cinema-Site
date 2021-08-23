const mongoose = require('mongoose')


///creating mongoose schema
let userSchema = new mongoose.Schema({
    username:String,
    password:String
})

/// connecting the schema to specific collection (users) in my DB
module.exports = mongoose.model('users',userSchema);