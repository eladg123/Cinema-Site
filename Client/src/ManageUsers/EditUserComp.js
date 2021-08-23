import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { UsersContext } from '../contexts/UsersContext';
import { useHistory } from 'react-router';


function EditUserComp(props) {
    const [users, setUsers] = useContext(UsersContext);
    const [fname, setFname] = useState();
    const [lname, setLname] = useState()
    const [username, setUsername] = useState();
    const [session, setSession] = useState();
    const [user, setUser] = useState();
    const [userData, setUserData] = useState();
    const [userPermissions, setUserPermissions] = useState([]);

    //set data for the form
    useEffect(async () => {
        let id = props.match.params.id
        let resp = await axios.get(`http://localhost:8001/api/users/${id}`);
        let resp2 = await axios.get(`http://localhost:8001/api/usersfile/${id}`)
        let resp3 = await axios.get(`http://localhost:8001/api/permissions/${id}`);
        setUserData(resp2.data);
        setUserPermissions(resp3.data.permissions);
        setUser(resp.data);
        setFname(resp2.data.firstName);
        setLname(resp2.data.lastName);
        setUsername(resp.data.username);
        setSession(resp2.data.sessionTimeOut);
    }, [])


    /// here i control the checkboxes every click
    const permissionsCheck = (e) => {
        if (e.target.checked) {
            let Permissions = [...userPermissions];
            Permissions.push(e.target.name);
            if ((e.target.name == "create subscriptions" || e.target.name == "delete subscriptions" || e.target.name == "update subscriptions") &&
                Permissions.includes("view subscriptions") == false) {
                Permissions.push("view subscriptions");
            }
            if ((e.target.name == "create movies" || e.target.name == "delete movies" || e.target.name == "update movies") &&
                Permissions.includes("view movies") == false) {
                Permissions.push("view movies");
            }
            setUserPermissions(userPermissions);
        }
        else {
            let updatedPermissions = [...userPermissions];
            let index = updatedPermissions.findIndex(permission => permission == e.target.name);
            updatedPermissions.splice(index, 1);
            if (e.target.name === "view subscriptions") {
                if (updatedPermissions.includes("create subscriptions")) {
                    let index2 = updatedPermissions.findIndex(permission => permission == "create subscriptions");
                    updatedPermissions.splice(index2, 1);
                }
                if (updatedPermissions.includes("delete subscriptions")) {
                    let index3 = updatedPermissions.findIndex(permission => permission == "delete subscriptions");
                    updatedPermissions.splice(index3, 1);
                }
                if (updatedPermissions.includes("update subscriptions")) {
                    let index4 = updatedPermissions.findIndex(permission => permission == "update subscriptions");
                    updatedPermissions.splice(index4, 1);
                }
            }
            if (e.target.name == "view movies") {
                if (updatedPermissions.includes("create movies")) {
                    let index5 = updatedPermissions.findIndex(permission => permission == "create movies");
                    updatedPermissions.splice(index5, 1);
                }
                if (updatedPermissions.includes("update movies")) {
                    let index6 = updatedPermissions.findIndex(permission => permission == "update movies");
                    updatedPermissions.splice(index6, 1);
                }
                if (updatedPermissions.includes("delete movies")) {
                    let index7 = updatedPermissions.findIndex(permission => permission == "delete movies");
                    updatedPermissions.splice(index7, 1);
                }
            }
            setUserPermissions(updatedPermissions);

        }

    }

    //update data in every concept (DB,jsonfiles)
    const updateUser = async () => {
        let userToDB = { _id: props.match.params.id, username: username, password: user.password };
        await axios.put(`http://localhost:8001/api/users/${props.match.params.id}`, userToDB);
        let userToJSONfile = {
            _id: props.match.params.id,
            firstName: fname,
            lastName: lname,
            createdDate: userData.createdDate,
            sessionTimeOut: session
        }
        await axios.put(`http://localhost:8001/api/usersfile/${props.match.params.id}`, userToJSONfile);
        let permissionsToJSONfile = { _id: props.match.params.id, permissions: userPermissions }
        await axios.put(`http://localhost:8001/api/permissions/${props.match.params.id}`, permissionsToJSONfile);
        alert("User updated!");
        let resp = await axios.get("http://localhost:8001/api/users");
        setUsers(resp.data);
        props.history.push('/mainPage/manageUsers');
    }
    const cancelPage = () => {
        props.history.push('/mainPage/manageUsers');
    }
    let formToRender;
    if (user != undefined && userData != undefined && userPermissions != undefined) {
        formToRender =
            <form>
                First Name: <input type="text" defaultValue={userData.firstName} onChange={e => setFname(e.target.value)} /> <br></br>
                Last Name: <input type="text" defaultValue={userData.lastName} onChange={e => setLname(e.target.value)} /> <br></br>
                Created Date: {userData.createdDate} <br></br>
                Username :<input type="text" defaultValue={user.username} onChange={e => setUsername(e.target.value)} />  <br></br>
                Session Time Out: <input type="number" defaultValue={userData.sessionTimeOut} onChange={e => setSession(e.target.value)} /> <br></br>
                Permissions:<br></br>
                <input type="checkbox" name="view subscriptions" onChange={permissionsCheck} checked={userPermissions.includes("view subscriptions")} />View subscriptions <br></br>
                <input type="checkbox" name="create subscriptions" onChange={permissionsCheck} checked={userPermissions.includes("create subscriptions")} />Create subscriptions <br></br>
                <input type="checkbox" name="delete subscriptions" onChange={permissionsCheck} checked={userPermissions.includes("delete subscriptions")} />  Delete subscriptions<br></br>
                <input type="checkbox" name="update subscriptions" onChange={permissionsCheck} checked={userPermissions.includes("update subscriptions")} />Update subscriptions <br></br>
                <input type="checkbox" name="view movies" onChange={permissionsCheck} checked={userPermissions.includes("view movies")} />View movies<br></br>
                <input type="checkbox" name="create movies" onChange={permissionsCheck} checked={userPermissions.includes("create movies")} />Create movies<br></br>
                <input type="checkbox" name="delete movies" onChange={permissionsCheck} checked={userPermissions.includes("delete movies")} />Delete movies<br></br>
                <input type="checkbox" name="update movies" onChange={permissionsCheck} checked={userPermissions.includes("update movies")} />Update movies <br></br>

                <input type="button" value="update" onClick={updateUser} /> <input type="button" value="cancel" onClick={cancelPage} />
            </form>
    }




    return (<div style={{ backgroundColor: "gainsboro" }}>
        <h3>Edit User</h3>
        {formToRender}

    </div>)
}
export default EditUserComp;