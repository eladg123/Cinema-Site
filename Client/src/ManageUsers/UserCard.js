import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';
import { UsersContext } from '../contexts/UsersContext'



function UserCard(props) {
    const history = useHistory();
    const [users, setUsers] = useContext(UsersContext);
    const [userData, setUserData] = useState();
    const [permissions, setPermissions] = useState();
    useEffect(async () => {
        let resp = await axios.get(`http://localhost:8001/api/usersfile/${props.user._id}`);
        let resp2 = await axios.get(`http://localhost:8001/api/permissions/${props.user._id}`)
        setUserData(resp.data);
        setPermissions(resp2.data.permissions);
    }, [])
    //renderin card only if you have data
    let cardToRender;
    if (userData && permissions) {
        cardToRender =
            <div> Name: {userData.firstName} {userData.lastName} <br></br>
                Username: {props.user.username}  <br></br>
                Session Time Out(minutes): {userData.sessionTimeOut}  <br></br>
                Created Date: {userData.createdDate} <br></br>
                Permissions:{permissions.join(",")}  <br></br>
            </div>

    }
    const deleteUser = async () => {
        await axios.delete(`http://localhost:8001/api/usersfile/${props.user._id}`);
        await axios.delete(`http://localhost:8001/api/permissions/${props.user._id}`);
        await axios.delete(`http://localhost:8001/api/users/${props.user._id}`)
        let resp = await axios.get("http://localhost:8001/api/users");
        setUsers(resp.data);
        alert("User Deleted!");

    }
    const editUser = async () => {
        history.push(`/mainPage/manageUsers/editUser/${props.user._id}`);
    }




    return (<div style={{ border: "2px solid black", backgroundColor: "lime" }}>

        {cardToRender}
        <input type="button" value="Edit" onClick={editUser} />
        <input type="button" value="Delete" onClick={deleteUser} />


    </div>)
}

export default UserCard;