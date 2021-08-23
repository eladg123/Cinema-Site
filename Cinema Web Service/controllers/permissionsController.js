const permissionsBL = require('../models/premissionsBL')
const express = require('express')
const router = express.Router();


///get all
router.route('/').get(async(req,resp)=>{
    let data = await permissionsBL.getAllPermissions();
    return resp.json(data);
})


///get by id 
router.route('/:id').get(async(req,resp)=>{
    let id = req.params.id;
    let data = await permissionsBL.getPremissionById(id);
    return resp.json(data);
})


/// add premission
router.route('/').post(async(req,resp)=>{
    let newPermission = req.body;
    let data = await permissionsBL.addPermission(newPermission);
    return resp.json(data);
})


/// update permission
router.route('/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let updatedPermission = req.body;
    let status = await permissionsBL.updatePermission(id,updatedPermission);
    return resp.json(status);
})

///delete permission
router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    let status = await permissionsBL.deletePermission(id);
    return resp.json(status);
})
module.exports = router;