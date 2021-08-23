import React, { useEffect, useState } from 'react'
import MoviesWatchedComp from './MoviesWatchedComp';
import { useHistory } from 'react-router';
import axios from 'axios'

function MemberCardComp(props) {
    let data = null;
    let editBTN, deleteBTN, memberCard;
    const [id, setId] = useState();
    const [member, setMember] = useState();
    let userJSON = sessionStorage.getItem("user");
    let user = JSON.parse(userJSON);
    const history = useHistory();

    //check here if i came from link or came from renderin the members
    useEffect(async () => {
        if (props.member != undefined) {
            setId(props.member._id)
        }
        else if (props.match.params.id) {
            let resp = await axios.get(`http://localhost:8001/api/members/${props.match.params.id}`);
            data = resp.data
            setId(props.match.params.id);
            setMember(resp.data);

        }
    }, [])
    const toEditPage = () => {
        history.push(`/mainPage/subscriptions/editMember/${id}`)
    }
    const deleteMember = async () => {
        await axios.delete(`http://localhost:8001/api/members/${id}`);
        let resp = await axios.get("http://localhost:8001/api/members");
        props.cbk(resp.data);
        alert("Member Deleted!")
    }

    if (user.permissions.includes("update subscriptions")) {
        editBTN = <input type="button" value="Edit" onClick={toEditPage} />;
    }
    if (user.permissions.includes("delete subscriptions")) {
        deleteBTN = <input type="button" value="Delete" onClick={deleteMember} />;
    }
    if (props.member != undefined) {
        memberCard = <div>
            {props.member.name} <br></br>
            Email: {props.member.email}<br></br>
            City: {props.member.city} <br></br>
            {editBTN}
            {deleteBTN}
            <MoviesWatchedComp key={props.member._id} member={props.member} />
        </div>
    }
    if (member) {
        memberCard = <div>
            {member.name} <br></br>
            Email: {member.email}<br></br>
            City: {member.city} <br></br>
            {editBTN}
            {deleteBTN}
            <MoviesWatchedComp key={member._id} member={member} />
        </div>
    }
    return (<div style={{ border: "4px solid black", backgroundColor: "mediumturquoise" }}>

        {memberCard}
    </div>)
}
export default MemberCardComp;