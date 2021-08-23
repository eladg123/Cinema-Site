const express = require('express')
const memberBL = require('../models/memberBL')

const router = express.Router();


///getAll

router.route('/').get(async(req,resp)=>{
    let data = await memberBL.getAllMembers();
    return resp.json(data);
})

/// getby id
router.route('/:id').get(async(req,resp)=>{
    let id = req.params.id;
    let data = await memberBL.getMemberById(id);
    return resp.json(data);
})

///add member
router.route('/').post(async(req,resp)=>{
    let newMember = req.body;
    let data = await memberBL.addMember(newMember);
    return resp.json(data);
});

///update member
router.route('/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let updatedMember = req.body;
    let status = await memberBL.updateMember(id,updatedMember);
    return resp.json(status);
})

///delete member
router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    let status = await memberBL.deleteMember(id);
    return resp.json(status);
    
})




module.exports = router;