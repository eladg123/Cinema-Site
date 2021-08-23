import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UsersContext } from '../contexts/UsersContext'

export function LoginComp(props) {
    const [users, setUsers] = useContext(UsersContext);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    useEffect(async () => {
        let resp = await axios.get("http://localhost:8001/api/users");
        setUsers(resp.data);
    }, [])
    let loginBool;
    // check if the username exist and if the username&password correct
    const loginFunc = async () => {
        users.forEach(async (user) => {
            if (user.username === username && user.password === password) {
                loginBool = true;
                let resp = await axios.get(`http://localhost:8001/api/usersfile/${user._id}`);
                let resp2 = await axios.get(`http://localhost:8001/api/permissions/${user._id}`)
                let adminCheck = false;
                if (resp2.data.permissions.length === 8 && user.username == "admin") { adminCheck = true };
                let userData = {
                    permissions: resp2.data.permissions,
                    firstName: resp.data.firstName,
                    _id: user._id,
                    lastName: resp.data.lastName,
                    isAdmin: adminCheck,
                    sessionTimeOut: resp.data.sessionTimeOut
                };
                let userJSON = JSON.stringify(userData)
                sessionStorage.setItem("user", userJSON);
                props.history.push("/mainPage");
            }

        })
        if (loginBool !== true) {
            alert("username or password incorrect!")
        }

    }

    const createPage = () => {
        props.history.push("/createAccount")
    }

    return (<div>

        <h3>Login Page</h3>
        Username: <input type="text" onChange={e => setUsername(e.target.value)} /> <br></br>
        password: <input type="text" onChange={e => setPassword(e.target.value)} /> <br></br>
        <input type="button" onClick={loginFunc} value="Login" />  <br />

        New User? <span onClick={createPage} ><Link to="/createAccount">Create Account</Link></span>

    </div>)
}