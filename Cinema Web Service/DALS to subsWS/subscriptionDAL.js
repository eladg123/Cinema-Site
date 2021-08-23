const axios = require('axios')
const express = require('express')
const router = express.Router();

///get all
router.route('/').get(async (req, resp) => {
    let allSubscriptions = await axios.get("http://localhost:8000/api/subscriptions");
    return resp.json(allSubscriptions.data)
})

///get by id 
router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let Subscription = await axios.get(`http://localhost:8000/api/subscriptions/${id}`);
    return resp.json(Subscription.data);
})
///update subscription
router.route('/:id').put(async (req, resp) => {
    let updatedSubscription = req.body;
    let id = req.params.id;
    let response = await axios.put(`http://localhost:8000/api/subscriptions/${id}`, updatedSubscription);
    return resp.json(response.data);
})

/// add subscription
router.route("/").post(async (req, resp) => {
    let newSubscription = req.body;
    let response = await axios.post("http://localhost:8000/api/subscriptions", newSubscription);
    return resp.json(response.data)
})
///delete subscription
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let response = await axios.delete(`http://localhost:8000/api/subscriptions/${id}`)
    return resp.json(response.data);
})


module.exports = router;