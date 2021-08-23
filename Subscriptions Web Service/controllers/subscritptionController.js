const express = require('express');
const subscriptionsBl = require('../models/subscriptionBL');

const router = express.Router();


///get all subscriptions
router.route('/').get(async(req,resp)=>{
    let data = await subscriptionsBl.getAllSubscriptions();
    return resp.json(data);
})

//get by id
router.route('/:id').get(async(req,resp)=>{
    let id = req.params.id;
    let data = await subscriptionsBl.getSubscriptionById(id);
    return resp.json(data);
})

//add subscription
router.route('/').post(async(req,resp)=>{
    let newSubscription = req.body;
    let data = await subscriptionsBl.addSubscription(newSubscription);
    return resp.json(data);
})

/// update subscription
router.route('/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let updatedSubscription = req.body;
    let status = await subscriptionsBl.updateSubscription(id,updatedSubscription);
    return resp.json(status);
})


//delete subscription
router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    let status= await subscriptionsBl.deleteSubscription(id);
    return resp.json(status);
})

module.exports = router;