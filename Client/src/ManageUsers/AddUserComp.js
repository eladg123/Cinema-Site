import React, { useState, useContext } from 'react';
import axios from 'axios'
import { UsersContext } from '../contexts/UsersContext'

function AddUserComp(props) {
    const [users, setUsers] = useContext(UsersContext);
    const [firstName, setFname] = useState("");
    const [lastName, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [sessionTimeOut, setSession] = useState(0);
    const [viewSubs, setViewSubs] = useState(false);
    const [createSubs, setCreateSubs] = useState(false);
    const [deleteSubs, setDeleteSubs] = useState(false);
    const [updateSubs, setUpdateSubs] = useState(false);
    const [viewMovies, setViewMovies] = useState(false);
    const [createMovies, setCreateMovies] = useState(false);
    const [deleteMovies, setDeleteMovies] = useState(false);
    const [updateMovies, setUpdateMovies] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const backPage = () => {
        props.history.push("/mainPage/manageUsers")
    }

    const addUser = async () => {
        let bool = false;
        users.forEach(user => {
            if (username === user.username) {
                bool = true
            }
        });
        if (bool === false) {
            let userToDB = {
                username: username,
                password: ""
            }
            let userCreated = await axios.post("http://localhost:8001/api/users", userToDB);
            let date = new Date();
            let exacDate = date.toLocaleDateString();
            let userToJSONfile = {
                _id: userCreated.data._id,
                firstName: firstName,
                lastName: lastName,
                createdDate: exacDate,
                sessionTimeOut: sessionTimeOut,
            }
            await axios.post("http://localhost:8001/api/usersFile", userToJSONfile);
            let userPermissions = [];
            if (viewMovies != false) { userPermissions.push(viewMovies) };
            if (createMovies != false) { userPermissions.push(createMovies) };
            if (updateMovies != false) { userPermissions.push(updateMovies) };
            if (deleteMovies != false) { userPermissions.push(deleteMovies) };
            if (viewSubs != false) { userPermissions.push(viewSubs) };
            if (createSubs != false) { userPermissions.push(createSubs) };
            if (updateSubs != false) { userPermissions.push(updateSubs) };
            if (deleteSubs != false) { userPermissions.push(deleteSubs) };
            let permissionsToJSONfile = {
                _id: userCreated.data._id,
                permissions: permissions
            }
            await axios.post("http://localhost:8001/api/permissions", permissionsToJSONfile);
            let users = await axios.get("http://localhost:8001/api/users");
            setUsers(users.data);
            alert("User Created, the user can create his password himself in 'Create Account'")
            props.history.push("/mainPage/manageUsers")

        }
        else if (bool) {
            alert("This username is in use, choose another one :)");
            bool = false
        }


    }
    /// here i control the checkboxes clicks every click 
    const permissionsCheck = (e) => {
        if (e.target.checked) {
            let userPermissions = [...permissions];
            userPermissions.push(e.target.name);
            if ((e.target.name == "create subscriptions" || e.target.name == "delete subscriptions" || e.target.name == "update subscriptions") &&
                userPermissions.includes("view subscriptions") == false) {
                userPermissions.push("view subscriptions");
            }
            if ((e.target.name == "create movies" || e.target.name == "delete movies" || e.target.name == "update movies") &&
                userPermissions.includes("view movies") == false) {
                userPermissions.push("view movies");
            }
            setPermissions(userPermissions);
        }
        else {
            let updatedPermissions = [...permissions];
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
            setPermissions(updatedPermissions);
        }

    }

    return (<div style={{ backgroundColor: "turquoise" }}>
        <h2>Add User</h2>
        <form>
            First name: <input type="text" onChange={e => setFname(e.target.value)} /> <br></br>
            Last name:<input type="text" onChange={e => setLname(e.target.value)} /> <br></br>
            Username: <input type="text" onChange={e => setUsername(e.target.value)} /> <br></br>
            Session time out(minutes): <input type="number" onChange={e => setSession(e.target.value)} /> <br></br>
            Permissions: <br></br>
            <input type="checkbox" name="view subscriptions" onChange={permissionsCheck} checked={permissions.includes("view subscriptions")} />View subscriptions <br></br>
            <input type="checkbox" name="create subscriptions" onChange={permissionsCheck} checked={permissions.includes("create subscriptions")} />Create subscriptions <br></br>
            <input type="checkbox" name="delete subscriptions" onChange={permissionsCheck} checked={permissions.includes("delete subscriptions")} />  Delete subscriptions<br></br>
            <input type="checkbox" name="update subscriptions" onChange={permissionsCheck} checked={permissions.includes("update subscriptions")} />Update subscriptions <br></br>
            <input type="checkbox" name="view movies" onChange={permissionsCheck} checked={permissions.includes("view movies")} />View movies<br></br>
            <input type="checkbox" name="create movies" onChange={permissionsCheck} checked={permissions.includes("create movies")} />Create movies<br></br>
            <input type="checkbox" name="delete movies" onChange={permissionsCheck} checked={permissions.includes("delete movies")} />Delete movies<br></br>
            <input type="checkbox" name="update movies" onChange={permissionsCheck} checked={permissions.includes("update movies")} />Update movies <br></br>

            <br></br>
            <input type="button" value="Save" onClick={addUser} /> <input type="button" value="Cancel" onClick={backPage} />
        </form>

    </div>)
}

export default AddUserComp;