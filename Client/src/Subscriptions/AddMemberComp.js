import React, { useState } from 'react'
import axios from 'axios'


function AddMemberComp(props) {
    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [email, setEmail] = useState();

    const cancelPage = () => {
        props.history.push("/mainPage/subscriptions");
    }
    const createMember = async () => {
        let newMember = { name: name, city: city, email: email };
        await axios.post("http://localhost:8001/api/members", newMember);
        alert("Member Created!")
        props.history.push("/mainPage/subscriptions");
    }


    return (<div style={{ backgroundColor: "lightcyan", border: "2px solid black" }}>
        <h3>Add New Member</h3>
        Name: <input type="text" onChange={e => setName(e.target.value)} /> <br></br>
        Email: <input type="text" onChange={e => setEmail(e.target.value)} /> <br></br>
        City: <input type="text" onChange={e => setCity(e.target.value)} /> <br></br>
        <input type="button" value="Save" onClick={createMember} /> <input type="button" value="Cancel" onClick={cancelPage} />



    </div>)
}
export default AddMemberComp;