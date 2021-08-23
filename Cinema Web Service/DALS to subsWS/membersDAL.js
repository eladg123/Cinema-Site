const axios = require('axios')
const express = require('express')
const router = express.Router();

///get all
router.route('/').get(async (req, resp) => {
    let allMembers = await axios.get("http://localhost:8000/api/members");
    return resp.json(allMembers.data)
})


///get by id
router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let member = await axios.get(`http://localhost:8000/api/members/${id}`);
    return resp.json(member.data);
})

///add movie
router.route("/").post(async (req, resp) => {
    let newMember = req.body;
    let response = await axios.post("http://localhost:8000/api/members", newMember);
    return resp.json(response.data)
})

///update movie
router.route('/:id').put(async (req, resp) => {
    let updatedMember = req.body;
    let id = req.params.id;
    let response = await axios.put(`http://localhost:8000/api/members/${id}`, updatedMember);
    return resp.json(response.data);
})

///delete movie 
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let response = await axios.delete(`http://localhost:8000/api/members/${id}`)
    return resp.json(response.data);
})



module.exports = router;

