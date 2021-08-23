import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';

function EditMember(props) {
    let id = props.match.params.id;
    const [member, setMember] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [city, setCity] = useState();
    const history = useHistory();
    useEffect(async () => {
        let resp = await axios.get(`http://localhost:8001/api/members/${id}`);
        if (resp.data != undefined) {
            setMember(resp.data);
            setName(resp.data.name);
            setEmail(resp.data.email);
            setCity(resp.data.city);
        }

    }, [])

    const cancelPage = () => {
        history.push("/mainPage/subscriptions")
    }
    let memberName, memberEmail, memberCity;
    if (name != undefined) {
        memberName = name
        memberEmail = email;
        memberCity = city;
    }
    const updateMember = async () => {
        let updatedMember = {
            _id: id,
            name: name,
            email: email,
            city: city
        }
        await axios.put(`http://localhost:8001/api/members/${id}`, updatedMember);
        alert("Member Updated!")
        history.push("/mainPage/subscriptions")
    }

    return (<div style={{ backgroundColor: "goldenrod" }}>
        <h3>Edit Member</h3>
        {memberName} <br></br>
        Name: <input type="text" value={memberName} onChange={e => setName(e.target.value)} /> <br></br>
        Email: <input type="text" value={memberEmail} onChange={e => setEmail(e.target.value)} /> <br></br>
        City: <input type="text" value={memberCity} onChange={e => setCity(e.target.value)} /> <br></br>
        <input type="button" value="Update" onClick={updateMember} /> <input type="button" value="Cancel" onClick={cancelPage} />




    </div>)

}
export default EditMember