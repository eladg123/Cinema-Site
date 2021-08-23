const mongoose = require('mongoose')


///creating mongoose schema

let subscriptionSchema = new mongoose.Schema({
    memberId: mongoose.ObjectId,
    moviesWatched: [{ movieId: mongoose.ObjectId, watchDate: Date }]
});

module.exports = mongoose.model('subscriptions', subscriptionSchema);