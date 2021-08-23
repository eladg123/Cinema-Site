const express = require('express')
const router = express.Router();
const usersBL = require('../models/usersBL')


///get all
router.route('/').get(async(req,resp)=>{
    let data = await usersBL.getAllUsers();
    return resp.json(data);
})

//get by id
router.route('/:id').get(async(req,resp)=>{
    let id = req.params.id;
    let data = await usersBL.getUserById(id);
    return resp.json(data);
})

/// add user
router.route('/').post(async(req,resp)=>{
    let newUser = req.body;
    let data = await usersBL.addUser(newUser);
    return resp.json(data);
})


//update user
router.route('/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let updatedUser = req.body;
    let status = await usersBL.updateUser(id,updatedUser);
    return resp.json(status);
})

/// delete user
router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    let status = await usersBL.deleteUser(id);
    return resp.json(status);
})


module.exports =router;